'use client';

import { useState, useEffect } from 'react';
import { Position, Trade, TradeFormData, TradingState, TradingAsset } from '../types/trading';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/utils';

const INITIAL_BALANCE = 10000;
const MIN_TRADE_SIZE = 10;

const INITIAL_STATE: TradingState = {
  balance: INITIAL_BALANCE,
  openPositions: [],
  tradeHistory: [],
};

function calculatePnL(
  position: Position,
  currentPrice: number
): { pnl: number; roi: number } {
  const priceChange = position.direction === 'LONG'
    ? currentPrice - position.entryPrice
    : position.entryPrice - currentPrice;
  
  const pnl = priceChange * position.size * position.leverage / position.entryPrice;
  const roi = (pnl / position.size) * 100;

  return { pnl, roi };
}

function calculateLiquidationPrice(
  entryPrice: number,
  direction: 'LONG' | 'SHORT',
  leverage: number
): number {
  return direction === 'LONG'
    ? entryPrice * (1 - 1 / leverage)
    : entryPrice * (1 + 1 / leverage);
}

export function useTradingState() {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState<TradingState>(INITIAL_STATE);
  const [currentPrices, setCurrentPrices] = useState({
    BTC: 0,
    ETH: 0,
  });

  // Load state from localStorage on mount only
  useEffect(() => {
    const savedState = localStorage.getItem('tradingState');
    if (savedState) {
      setState(JSON.parse(savedState));
    }
    setIsLoading(false);
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('tradingState', JSON.stringify(state));
    }
  }, [state, isLoading]);

  // Update PnL and check positions when prices change
  useEffect(() => {
    if (!currentPrices.BTC && !currentPrices.ETH) return;

    setState((prev) => {
      let updatedPositions = prev.openPositions;
      const closedPositions: Trade[] = [];

      // Update each position and check for triggers
      updatedPositions = updatedPositions.filter((position) => {
        const currentPrice = currentPrices[position.asset];
        if (!currentPrice) return true; // Keep position if no price update

        // Calculate new PnL
        const { pnl, roi } = calculatePnL(position, currentPrice);
        position.currentPnL = pnl;
        position.roi = roi;

        // Check stop loss
        if (position.stopLoss !== null) {
          if (
            (position.direction === 'LONG' && currentPrice <= position.stopLoss) ||
            (position.direction === 'SHORT' && currentPrice >= position.stopLoss)
          ) {
            closedPositions.push(createClosedTrade(position, currentPrice, 'Stop Loss triggered'));
            return false;
          }
        }

        // Check take profit
        if (position.takeProfit !== null) {
          if (
            (position.direction === 'LONG' && currentPrice >= position.takeProfit) ||
            (position.direction === 'SHORT' && currentPrice <= position.takeProfit)
          ) {
            closedPositions.push(createClosedTrade(position, currentPrice, 'Take Profit triggered'));
            return false;
          }
        }

        // Check liquidation
        const liquidationPrice = calculateLiquidationPrice(
          position.entryPrice,
          position.direction,
          position.leverage
        );

        if (
          (position.direction === 'LONG' && currentPrice <= liquidationPrice) ||
          (position.direction === 'SHORT' && currentPrice >= liquidationPrice)
        ) {
          closedPositions.push(createClosedTrade(position, currentPrice, 'Position Liquidated'));
          return false;
        }

        return true;
      });

      // If any positions were closed, update state
      if (closedPositions.length > 0) {
        const newBalance = closedPositions.reduce(
          (bal, trade) => bal + trade.size + trade.realizedPnL,
          prev.balance
        );

        // Show notifications for closed positions
        closedPositions.forEach(trade => {
          const message = `${trade.asset} position ${trade.direction.toLowerCase()}: ${formatCurrency(trade.realizedPnL)} (${trade.finalRoi.toFixed(2)}%)`;
          toast[trade.realizedPnL >= 0 ? 'success' : 'error'](message);
        });

        return {
          ...prev,
          balance: newBalance,
          openPositions: updatedPositions,
          tradeHistory: [...closedPositions, ...prev.tradeHistory],
        };
      }

      return {
        ...prev,
        openPositions: updatedPositions,
      };
    });
  }, [currentPrices]);

  const createClosedTrade = (position: Position, exitPrice: number, reason?: string): Trade => {
    const { pnl: realizedPnL, roi: finalRoi } = calculatePnL(position, exitPrice);
    return {
      ...position,
      exitPrice,
      realizedPnL,
      finalRoi,
      closedAt: Date.now(),
    };
  };

  const updatePrice = (asset: TradingAsset, price: number) => {
    if (price <= 0) return;
    setCurrentPrices(prev => {
      // Only update if price has changed
      if (prev[asset] === price) return prev;
      return {
        ...prev,
        [asset]: price
      };
    });
  };

  const openPosition = (formData: TradeFormData) => {
    const currentPrice = currentPrices[formData.asset];
    
    // Check price availability first
    if (!currentPrice || currentPrice <= 0) {
      toast.error('Please wait for price data to load');
      return;
    }

    if (formData.size < MIN_TRADE_SIZE) {
      toast.error(`Minimum trade size is ${formatCurrency(MIN_TRADE_SIZE)}`);
      return;
    }

    if (formData.size > state.balance) {
      toast.error(`Insufficient balance. Available: ${formatCurrency(state.balance)}`);
      return;
    }

    const position: Position = {
      id: Math.random().toString(36).substring(7),
      ...formData,
      entryPrice: currentPrice,
      timestamp: Date.now(),
      currentPnL: 0,
      roi: 0,
      stopLoss: formData.stopLoss || null,
      takeProfit: formData.takeProfit || null,
      liquidationPrice: calculateLiquidationPrice(
        currentPrice,
        formData.direction,
        formData.leverage
      ),
    };

    setState((prev) => ({
      ...prev,
      balance: prev.balance - formData.size,
      openPositions: [...prev.openPositions, position],
    }));

    toast.success(`${formData.direction} position opened: ${formData.asset} × ${formData.leverage}x`);
  };

  const closePosition = (positionId: string, reason?: string) => {
    setState((prev) => {
      const position = prev.openPositions.find((p) => p.id === positionId);
      if (!position) return prev;

      const currentPrice = currentPrices[position.asset];
      if (!currentPrice) {
        toast.error('Cannot close position: Price not available');
        return prev;
      }

      const trade = createClosedTrade(position, currentPrice, reason);
      const message = reason || 'Position closed';
      const isProfit = trade.realizedPnL > 0;
      
      toast[isProfit ? 'success' : 'error'](
        `${message}: ${isProfit ? 'Profit' : 'Loss'} ${formatCurrency(Math.abs(trade.realizedPnL))} (${trade.finalRoi.toFixed(2)}%)`
      );

      return {
        balance: prev.balance + position.size + trade.realizedPnL,
        openPositions: prev.openPositions.filter((p) => p.id !== positionId),
        tradeHistory: [trade, ...prev.tradeHistory],
      };
    });
  };

  const resetAccount = () => {
    setState(INITIAL_STATE);
    localStorage.removeItem('tradingState');
    toast.success('Demo account has been reset');
  };

  return {
    ...state,
    currentPrices,
    openPosition,
    closePosition,
    isLoading,
    resetAccount,
    updatePrice,
  };
} 