'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TradeFormData, TradingAsset, TradeDirection } from '../types/trading';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, TrendingUp, TrendingDown, Bitcoin, Coins } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const LEVERAGE_PRESETS = [2, 5, 10, 20];
const POSITION_SIZE_PRESETS = [25, 50, 75, 100];
const MAX_LEVERAGE = 100;

interface TradingFormProps {
  onSubmit: (data: TradeFormData) => void;
  isLoading?: boolean;
  currentPrice: number;
  balance: number;
  onAssetChange?: (asset: TradingAsset) => void;
}

export function TradingForm({ onSubmit, isLoading, currentPrice, balance, onAssetChange }: TradingFormProps) {
  const [formData, setFormData] = useState<TradeFormData>({
    asset: 'BTC',
    direction: 'LONG',
    leverage: 1,
    size: 0,
  });

  const [showStopLoss, setShowStopLoss] = useState(false);
  const [showTakeProfit, setShowTakeProfit] = useState(false);

  // Calculate potential profit/loss
  const calculations = useMemo(() => {
    const positionValue = formData.size * formData.leverage;
    const priceChangeForProfit = formData.direction === 'LONG' 
      ? (formData.takeProfit || currentPrice * 1.15) - currentPrice
      : currentPrice - (formData.takeProfit || currentPrice * 0.85);
    const priceChangeForLoss = formData.direction === 'LONG'
      ? currentPrice - (formData.stopLoss || currentPrice * 0.95)
      : (formData.stopLoss || currentPrice * 1.05) - currentPrice;

    const potentialProfit = (priceChangeForProfit / currentPrice) * positionValue;
    const potentialLoss = (priceChangeForLoss / currentPrice) * positionValue;
    const riskRewardRatio = Math.abs(potentialProfit / potentialLoss);

    return {
      potentialProfit,
      potentialLoss,
      riskRewardRatio: isFinite(riskRewardRatio) ? riskRewardRatio : 0,
    };
  }, [formData, currentPrice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleLeveragePreset = (leverage: number) => {
    setFormData((prev) => ({ ...prev, leverage }));
  };

  const handleSizePreset = (percentage: number) => {
    const newSize = (balance * percentage) / 100;
    setFormData((prev) => ({ ...prev, size: newSize }));
  };

  const positionSizePercentage = Math.min((formData.size / balance) * 100, 100);

  return (
    <TooltipProvider>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Asset Selection Tabs */}
        <Tabs
          value={formData.asset}
          onValueChange={(value) => {
            const asset = value as TradingAsset;
            setFormData({ ...formData, asset });
            onAssetChange?.(asset);
          }}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="BTC" className="flex items-center gap-2">
              <Bitcoin className="h-4 w-4" />
              Bitcoin
            </TabsTrigger>
            <TabsTrigger value="ETH" className="flex items-center gap-2">
              <Coins className="h-4 w-4" />
              Ethereum
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Leverage and Position Size */}
        <div className="space-y-4">
          {/* Leverage */}
          <div className="space-y-2 rounded-lg border bg-card p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <Label className="text-sm font-medium">Leverage</Label>
                <span className="text-lg font-bold tracking-tight">{formData.leverage}x</span>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Higher leverage means higher risk and potential returns</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex gap-1">
              {LEVERAGE_PRESETS.map((preset) => (
                <Button
                  key={preset}
                  type="button"
                  variant={formData.leverage === preset ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleLeveragePreset(preset)}
                  className="flex-1 font-mono text-xs h-7"
                >
                  {preset}x
                </Button>
              ))}
            </div>
            <Slider
              value={[formData.leverage]}
              onValueChange={(value) => setFormData({ ...formData, leverage: value[0] })}
              max={MAX_LEVERAGE}
              min={1}
              step={1}
              className="py-1"
            />
          </div>

          {/* Position Size */}
          <div className="space-y-2 rounded-lg border bg-card p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <Label className="text-sm font-medium">Size</Label>
                <span className="text-lg font-bold tracking-tight">{formatCurrency(formData.size)}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                Max: {formatCurrency(balance)}
              </span>
            </div>
            <div className="flex gap-1">
              {POSITION_SIZE_PRESETS.map((preset) => (
                <Button
                  key={preset}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleSizePreset(preset)}
                  className="flex-1 font-mono text-xs h-7 hover:bg-muted"
                >
                  {preset}%
                </Button>
              ))}
            </div>
            <Input
              type="number"
              min="0"
              max={balance}
              step="0.01"
              value={formData.size || ''}
              onChange={(e) =>
                setFormData({ ...formData, size: parseFloat(e.target.value) || 0 })
              }
              placeholder="Enter position size"
              className="font-mono h-10 text-base"
            />
          </div>
        </div>

        {/* Stop Loss and Take Profit */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Stop Loss</Label>
                <Switch
                  checked={showStopLoss}
                  onCheckedChange={(checked) => {
                    setShowStopLoss(checked);
                    if (!checked) {
                      setFormData(prev => ({ ...prev, stopLoss: undefined }));
                    }
                  }}
                />
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Price at which the position will be automatically closed to limit losses</p>
                </TooltipContent>
              </Tooltip>
            </div>
            {showStopLoss && (
              <Input
                type="number"
                min="0"
                step="0.01"
                value={formData.stopLoss || ''}
                onChange={(e) =>
                  setFormData({ ...formData, stopLoss: parseFloat(e.target.value) || undefined })
                }
                placeholder={`Suggested: ${formData.direction === 'LONG' 
                  ? formatCurrency(currentPrice * 0.95)
                  : formatCurrency(currentPrice * 1.05)
                }`}
                className="font-mono h-9 text-sm"
              />
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Take Profit</Label>
                <Switch
                  checked={showTakeProfit}
                  onCheckedChange={(checked) => {
                    setShowTakeProfit(checked);
                    if (!checked) {
                      setFormData(prev => ({ ...prev, takeProfit: undefined }));
                    }
                  }}
                />
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Price at which the position will be automatically closed to secure profits</p>
                </TooltipContent>
              </Tooltip>
            </div>
            {showTakeProfit && (
              <Input
                type="number"
                min="0"
                step="0.01"
                value={formData.takeProfit || ''}
                onChange={(e) =>
                  setFormData({ ...formData, takeProfit: parseFloat(e.target.value) || undefined })
                }
                placeholder={`Suggested: ${formData.direction === 'LONG'
                  ? formatCurrency(currentPrice * 1.15)
                  : formatCurrency(currentPrice * 0.85)
                }`}
                className="font-mono h-9 text-sm"
              />
            )}
          </div>
        </div>

        {/* Profit/Loss Calculator */}
        <Card className="p-3 bg-muted/50">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-0.5">
              <div className="text-sm text-muted-foreground">Potential Profit</div>
              <div className="text-lg font-bold tracking-tight text-green-500">
                {formatCurrency(calculations.potentialProfit)}
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-sm text-muted-foreground">Potential Loss</div>
              <div className="text-lg font-bold tracking-tight text-red-500">
                {formatCurrency(calculations.potentialLoss)}
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Risk/Reward</span>
            <Badge variant="outline" className="font-mono text-xs">
              {calculations.riskRewardRatio.toFixed(2)}
            </Badge>
          </div>
        </Card>

        {/* Direction Selection */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="submit"
            className="w-full h-12 text-sm font-medium"
            disabled={isLoading || formData.size <= 0}
            variant="default"
            onClick={() => setFormData({ ...formData, direction: 'LONG' })}
            data-state={formData.direction === 'LONG' ? 'active' : ''}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Long
          </Button>
          <Button
            type="submit"
            className="w-full h-12 text-sm font-medium"
            disabled={isLoading || formData.size <= 0}
            variant="destructive"
            onClick={() => setFormData({ ...formData, direction: 'SHORT' })}
            data-state={formData.direction === 'SHORT' ? 'active' : ''}
          >
            <TrendingDown className="w-4 h-4 mr-2" />
            Short
          </Button>
        </div>
      </form>
    </TooltipProvider>
  );
} 