export type TradingAsset = 'BTC' | 'ETH';
export type TradeDirection = 'LONG' | 'SHORT';

export interface Position {
  id: string;
  asset: TradingAsset;
  direction: TradeDirection;
  leverage: number;
  size: number;
  entryPrice: number;
  timestamp: number;
  currentPnL: number;
  stopLoss: number | null;
  takeProfit: number | null;
  roi: number; // Return on Investment in percentage
  liquidationPrice: number;
}

export interface Trade extends Position {
  exitPrice: number;
  realizedPnL: number;
  closedAt: number;
  finalRoi: number;
}

export interface TradingState {
  balance: number;
  openPositions: Position[];
  tradeHistory: Trade[];
}

export interface TradeFormData {
  asset: TradingAsset;
  direction: TradeDirection;
  leverage: number;
  size: number;
  stopLoss?: number;
  takeProfit?: number;
}

export interface PositionSizing {
  positionSize: number;
  leverage: number;
  riskAmount: number;
  riskPercentage: number;
  possibleLoss: number;
  possibleProfit: number;
  liquidationPrice: number;
} 