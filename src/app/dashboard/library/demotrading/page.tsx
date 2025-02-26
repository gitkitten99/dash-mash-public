'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCcw, Maximize2 } from 'lucide-react';
import Link from 'next/link';
import { TradingForm } from '@/features/trading/components/TradingForm';
import { OpenPositions } from '@/features/trading/components/OpenPositions';
import { TradeHistory } from '@/features/trading/components/TradeHistory';
import { TradingTutorial } from '@/features/trading/components/TradingTutorial';
import { useTradingState } from '@/features/trading/hooks/useTradingState';
import { formatCurrency } from '@/lib/utils';
import { Toaster } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress";
import { TableRow } from '@/components/ui/table';
import { TradingAsset } from '@/features/trading/types/trading';
import { CryptoChart } from '@/features/trading/components';

interface TradingViewWidget {
  widget: {
    new (configuration: any): any;
  };
}

declare global {
  interface Window {
    tvWidget?: any;
    TradingView?: TradingViewWidget;
  }
}

interface LibraryCallback {
  (configuration: {
    supported_resolutions: string[];
    supports_marks: boolean;
    supports_timescale_marks: boolean;
    supports_time: boolean;
  }): void;
}

function BalanceSkeleton() {
  return (
    <div className="h-8 w-32">
      <Skeleton className="h-full w-full" />
    </div>
  );
}

function StatSkeleton() {
  return (
    <div className="space-y-1">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-32" />
    </div>
  );
}

export default function DemoTradingPage() {
  const {
    balance,
    openPositions,
    tradeHistory,
    currentPrices,
    openPosition,
    closePosition,
    isLoading,
    resetAccount,
    updatePrice,
  } = useTradingState();

  const [selectedAsset, setSelectedAsset] = useState<TradingAsset>('BTC');
  const [showTutorial, setShowTutorial] = useState(true);
  const [chartReady, setChartReady] = useState(false);
  const [priceAvailable, setPriceAvailable] = useState(false);

  // Load tutorial state from localStorage
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTradingTutorial');
    if (hasSeenTutorial) {
      setShowTutorial(false);
    }
  }, []);

  // Update price availability when price changes
  useEffect(() => {
    setPriceAvailable(currentPrices[selectedAsset] > 0);
  }, [currentPrices, selectedAsset]);

  const handleTutorialComplete = () => {
    localStorage.setItem('hasSeenTradingTutorial', 'true');
    setShowTutorial(false);
  };

  const handleResetAccount = () => {
    resetAccount();
    localStorage.removeItem('hasSeenTradingTutorial');
    setShowTutorial(true);
  };

  const handleAssetChange = (asset: TradingAsset) => {
    setSelectedAsset(asset);
  };

  // Calculate total PnL and ROI
  const totalPnL = openPositions.reduce((sum, pos) => sum + pos.currentPnL, 0);
  const totalInvested = openPositions.reduce((sum, pos) => sum + pos.size, 0);
  const totalROI = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

  return (
    <TooltipProvider>
      {showTutorial && <TradingTutorial onComplete={handleTutorialComplete} />}
      <Toaster 
        position="bottom-right"
        expand={false}
        richColors
        closeButton
        duration={4000}
        theme="dark"
        style={{
          '--normal-bg': 'hsl(var(--card))',
          '--normal-border': 'hsl(var(--border))',
          '--normal-text': 'hsl(var(--foreground))',
          '--success-bg': 'hsl(var(--success))',
          '--error-bg': 'hsl(var(--destructive))',
        } as React.CSSProperties}
      />
      <div className="flex min-h-screen flex-col bg-background">
        <div className="[--header-height:80px] md:[--header-height:64px]">
          <ScrollArea className="h-[calc(100dvh-var(--header-height))]">
            <div className="flex-1 space-y-6 p-4 md:p-8">
              {/* Header */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <Link href="/dashboard/library/trading">
                    <Button variant="ghost" className="gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      Back to Trading
                    </Button>
                  </Link>
                  <Badge variant="outline" className="hidden md:inline-flex">
                    Demo Mode
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={handleResetAccount}
                      >
                        <RefreshCcw className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Reset Demo Account</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="text-2xl font-semibold">
                    {isLoading ? (
                      <BalanceSkeleton />
                    ) : (
                      <>Balance: {formatCurrency(balance)}</>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-[1fr,400px] gap-6">
                {/* Left Column: Chart and Trading Info */}
                <div className="space-y-6">
                  {/* TradingView Chart */}
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-semibold">Price Chart</h2>
                      <div className="text-lg font-mono">
                        {formatCurrency(currentPrices[selectedAsset])}
                      </div>
                    </div>
                    <div className="h-[600px] relative">
                      <CryptoChart
                        symbol={`BINANCE:${selectedAsset}USDT`}
                        height="100%"
                        onReady={() => {
                          setChartReady(true);
                          setPriceAvailable(true);
                        }}
                        onPriceUpdate={(price) => {
                          if (price > 0) {
                            updatePrice(selectedAsset, price);
                          }
                        }}
                      />
                    </div>
                  </Card>

                  {/* Positions & History */}
                  <Card className="p-6">
                    <Tabs defaultValue="positions" className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">Positions & History</h2>
                        <TabsList className="bg-background">
                          <TabsTrigger value="positions" className="relative data-[state=active]:bg-muted">
                            <Badge variant="secondary" className="absolute -right-3 -top-3 size-6">
                              {openPositions.length}
                            </Badge>
                            Open Positions
                          </TabsTrigger>
                          <TabsTrigger value="history">
                            Trade History
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      <TabsContent value="positions" className="mt-0 space-y-4">
                        {isLoading ? (
                          <div className="space-y-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                          </div>
                        ) : (
                          <OpenPositions
                            positions={openPositions}
                            onClosePosition={closePosition}
                          />
                        )}
                      </TabsContent>

                      <TabsContent value="history" className="mt-0 space-y-4">
                        {isLoading ? (
                          <div className="space-y-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                          </div>
                        ) : (
                          <TradeHistory trades={tradeHistory} />
                        )}
                      </TabsContent>
                    </Tabs>
                  </Card>

                  {/* Portfolio Overview */}
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Portfolio Overview</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {isLoading ? (
                        <>
                          <StatSkeleton />
                          <StatSkeleton />
                          <StatSkeleton />
                          <StatSkeleton />
                        </>
                      ) : (
                        <>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="space-y-1 cursor-help">
                                <div className="text-sm text-muted-foreground">Total Invested</div>
                                <div className="text-lg font-semibold">{formatCurrency(totalInvested)}</div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Total amount invested in open positions</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="space-y-1 cursor-help">
                                <div className="text-sm text-muted-foreground">Unrealized P&L</div>
                                <div className={`text-lg font-semibold ${totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                  {formatCurrency(totalPnL)}
                                </div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Current profit/loss from open positions</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="space-y-1 cursor-help">
                                <div className="text-sm text-muted-foreground">Total ROI</div>
                                <div className={`text-lg font-semibold ${totalROI >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                  {totalROI.toFixed(2)}%
                                </div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Return on Investment percentage</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="space-y-1 cursor-help">
                                <div className="text-sm text-muted-foreground">Open Positions</div>
                                <div className="text-lg font-semibold">{openPositions.length}</div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Number of active trading positions</p>
                            </TooltipContent>
                          </Tooltip>
                        </>
                      )}
                    </div>
                  </Card>
                </div>

                {/* Right Column: Trading Form only */}
                <div>
                  <Card className="p-6">
                    <h2 className="text-2xl font-semibold mb-6">Demo Trading</h2>
                    <TradingForm 
                      onSubmit={openPosition}
                      currentPrice={currentPrices[selectedAsset]}
                      balance={balance}
                      isLoading={isLoading || !priceAvailable}
                      onAssetChange={handleAssetChange}
                    />
                  </Card>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </TooltipProvider>
  );
} 