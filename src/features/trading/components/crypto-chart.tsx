'use client';

import { memo, useEffect, useRef } from 'react';

export interface CryptoChartProps {
  symbol?: string;
  height?: number | string;
  onReady?: () => void;
  onPriceUpdate?: (price: number) => void;
}

function TradingViewWidget({ 
  symbol = "BINANCE:BTCUSDT",
  height = 500,
  onReady,
  onPriceUpdate 
}: CryptoChartProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;

    const config = {
      "autosize": true,
      "symbol": symbol,
      "interval": "1",
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "hide_top_toolbar": false,
      "allow_symbol_change": false,
      "save_image": false,
      "calendar": false,
      "hide_volume": false,
      "support_host": "https://www.tradingview.com",
      "width": "100%",
      "height": "100%",
      "show_popup_button": true,
      "popup_width": "1000",
      "popup_height": "650",
      "backgroundColor": "rgba(19, 23, 34, 1)",
      "gridColor": "rgba(54, 60, 78, 0.1)",
      "container_id": container.current.id,
    };

    script.innerHTML = JSON.stringify(config);
    container.current.appendChild(script);

    // Notify when chart is ready
    script.onload = () => {
      onReady?.();
      // Set up price update interval
      const updateInterval = setInterval(() => {
        const priceEl = container.current?.querySelector('.tv-symbol-price-quote__value');
        if (priceEl) {
          const price = parseFloat(priceEl.textContent?.replace(/[^0-9.]/g, '') || '0');
          if (price > 0 && onPriceUpdate) {
            onPriceUpdate(price);
          }
        }
      }, 1000);

      return () => clearInterval(updateInterval);
    };

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [symbol, onReady, onPriceUpdate]);

  return (
    <div style={{ height }}>
      <div 
        ref={container}
        className="tradingview-widget-container"
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}

export const CryptoChart = memo(TradingViewWidget);
CryptoChart.displayName = 'CryptoChart'; 