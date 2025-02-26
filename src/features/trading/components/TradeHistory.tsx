'use client';

import { Trade } from '../types/trading';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Info, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface TradeHistoryProps {
  trades: Trade[];
}

export function TradeHistory({ trades }: TradeHistoryProps) {
  if (!trades.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-3 mb-4">
          <Info className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No Trade History</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Your completed trades will appear here. Start trading to build your history.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] pr-4">
      <Table>
        <TableHeader className="sticky top-0 bg-background">
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>Direction</TableHead>
            <TableHead className="hidden md:table-cell">Size</TableHead>
            <TableHead className="hidden lg:table-cell">Leverage</TableHead>
            <TableHead className="hidden xl:table-cell">Entry/Exit</TableHead>
            <TableHead>Result</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trades.map((trade) => (
            <TableRow key={trade.id} className="group">
              <TableCell className="font-medium">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="flex items-center gap-1 cursor-help group-hover:text-primary transition-colors">
                      {trade.asset}
                      <Info className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant={trade.direction === 'LONG' ? 'success' : 'destructive'} className="uppercase">
                          {trade.direction}
                        </Badge>
                        <span className="text-sm font-medium">{trade.asset} Trade</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="space-y-1">
                          <div className="text-muted-foreground">Entry Price</div>
                          <div className="font-medium">{formatCurrency(trade.entryPrice)}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-muted-foreground">Exit Price</div>
                          <div className="font-medium">{formatCurrency(trade.exitPrice)}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-muted-foreground">Stop Loss</div>
                          <div className="font-medium">{trade.stopLoss ? formatCurrency(trade.stopLoss) : 'None'}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-muted-foreground">Take Profit</div>
                          <div className="font-medium">{trade.takeProfit ? formatCurrency(trade.takeProfit) : 'None'}</div>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="text-muted-foreground mb-1">Final Result</div>
                        <div className={`text-lg font-semibold ${trade.finalRoi >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {trade.finalRoi >= 0 ? '+' : ''}{trade.finalRoi.toFixed(2)}% ROI
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </TableCell>
              <TableCell>
                <Badge
                  variant={trade.direction === 'LONG' ? 'success' : 'destructive'}
                  className="font-medium"
                >
                  {trade.direction === 'LONG' ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {trade.direction}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell font-medium">
                {formatCurrency(trade.size)}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <Badge variant="outline" className="font-mono">
                  {trade.leverage}x
                </Badge>
              </TableCell>
              <TableCell className="hidden xl:table-cell">
                <div className="flex flex-col gap-1">
                  <div className="text-xs">
                    <span className="text-muted-foreground">Entry:</span>{' '}
                    <span className="font-medium">{formatCurrency(trade.entryPrice)}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-muted-foreground">Exit:</span>{' '}
                    <span className="font-medium">{formatCurrency(trade.exitPrice)}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className={`font-medium ${trade.realizedPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {trade.realizedPnL >= 0 ? '+' : ''}{formatCurrency(trade.realizedPnL)}
                  </span>
                  <span className={`text-xs ${trade.finalRoi >= 0 ? 'text-green-500/70' : 'text-red-500/70'}`}>
                    {trade.finalRoi >= 0 ? '+' : ''}{trade.finalRoi.toFixed(1)}%
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex flex-col items-end">
                  <span className="font-medium">
                    {new Date(trade.closedAt).toLocaleDateString()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(trade.closedAt).toLocaleTimeString()}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
} 