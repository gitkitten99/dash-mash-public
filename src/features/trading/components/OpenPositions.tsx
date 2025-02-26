'use client';

import { Position } from '../types/trading';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Info } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface OpenPositionsProps {
  positions: Position[];
  onClosePosition: (positionId: string) => void;
  isClosing?: boolean;
}

export function OpenPositions({
  positions,
  onClosePosition,
  isClosing,
}: OpenPositionsProps) {
  if (!positions.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No open positions
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
            <TableHead className="hidden md:table-cell">Leverage</TableHead>
            <TableHead className="hidden lg:table-cell">Entry</TableHead>
            <TableHead>PnL</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {positions.map((position) => (
            <TableRow key={position.id}>
              <TableCell className="font-medium">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="flex items-center gap-1 cursor-help">
                      {position.asset}
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Position Details</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-muted-foreground">Entry Price</div>
                        <div>{formatCurrency(position.entryPrice)}</div>
                        <div className="text-muted-foreground">Stop Loss</div>
                        <div>{position.stopLoss ? formatCurrency(position.stopLoss) : 'None'}</div>
                        <div className="text-muted-foreground">Take Profit</div>
                        <div>{position.takeProfit ? formatCurrency(position.takeProfit) : 'None'}</div>
                        <div className="text-muted-foreground">Liquidation</div>
                        <div>{formatCurrency(position.liquidationPrice)}</div>
                        <div className="text-muted-foreground">ROI</div>
                        <div className={position.roi >= 0 ? 'text-green-500' : 'text-red-500'}>
                          {position.roi.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-md text-xs font-medium ${
                    position.direction === 'LONG'
                      ? 'bg-green-500/10 text-green-500'
                      : 'bg-red-500/10 text-red-500'
                  }`}
                >
                  {position.direction}
                </span>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {formatCurrency(position.size)}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {position.leverage}x
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {formatCurrency(position.entryPrice)}
              </TableCell>
              <TableCell
                className={
                  position.currentPnL >= 0 ? 'text-green-500' : 'text-red-500'
                }
              >
                {formatCurrency(position.currentPnL)}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onClosePosition(position.id)}
                  disabled={isClosing}
                >
                  Close
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
} 