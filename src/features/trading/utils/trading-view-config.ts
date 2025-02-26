import { type ThemeProviderProps } from 'next-themes';

type Theme = string | undefined;

export interface BaseWidgetConfig {
  colorTheme: 'light' | 'dark';
  isTransparent: boolean;
  locale: string;
  width?: string | number;
  height?: string | number;
}

export interface ChartWidgetConfig extends BaseWidgetConfig {
  symbol: string;
  interval: string;
  timezone: string;
  style: string;
  studies: string[];
  toolbar_bg: string;
  hide_side_toolbar: boolean;
  hide_top_toolbar: boolean;
  theme: string;
  allow_symbol_change: boolean;
  details: boolean;
  hotlist: boolean;
  calendar: boolean;
  enable_publishing: boolean;
  withdateranges: boolean;
  container_id: string;
  library_path: string;
  width: string;
}

export interface TechnicalAnalysisConfig extends BaseWidgetConfig {
  symbol: string;
  showIntervalTabs: boolean;
  interval: string;
  backgroundColor: string;
  studies: string[];
  showSummary: boolean;
  showTALegend: boolean;
}

export interface MarketOverviewConfig extends BaseWidgetConfig {
  tabs: Array<{
    title: string;
    symbols: Array<{
      s: string;
      d: string;
    }>;
    originalTitle: string;
  }>;
  showFloatingTooltip: boolean;
  showVolume: boolean;
  showSymbolLogo: boolean;
  dateRange?: string;
  plotLineColorGrowing?: string;
  plotLineColorFalling?: string;
  gridLineColor?: string;
  scaleFontColor?: string;
  belowLineFillColorGrowing?: string;
  belowLineFillColorFalling?: string;
  symbolActiveColor?: string;
  tabs_layout?: string;
  backgroundColor: string;
}

export interface TickerConfig extends BaseWidgetConfig {
  symbols: Array<{
    description: string;
    proName: string;
  }>;
  displayMode: string;
  showSymbolLogo: boolean;
}

// Trading pairs for different markets
export const CRYPTO_PAIRS = [
  { label: 'BTC/USDT', value: 'BINANCE:BTCUSDT', description: 'Bitcoin' },
  { label: 'ETH/USDT', value: 'BINANCE:ETHUSDT', description: 'Ethereum' },
  { label: 'SOL/USDT', value: 'BINANCE:SOLUSDT', description: 'Solana' },
  { label: 'BNB/USDT', value: 'BINANCE:BNBUSDT', description: 'BNB' },
  { label: 'XRP/USDT', value: 'BINANCE:XRPUSDT', description: 'XRP' },
  { label: 'ADA/USDT', value: 'BINANCE:ADAUSDT', description: 'Cardano' }
] as const;

export const ECONOMY_PAIRS = [
  { label: 'S&P 500', value: 'FOREXCOM:SPXUSD', description: 'S&P 500 Index' },
  { label: 'Nasdaq', value: 'FOREXCOM:NSXUSD', description: 'Nasdaq 100' },
  { label: 'Dow Jones', value: 'FOREXCOM:DJI', description: 'Dow Jones Industrial Average' },
  { label: 'EUR/USD', value: 'FX:EURUSD', description: 'Euro/US Dollar' },
  { label: 'Gold', value: 'COMEX:GC1!', description: 'Gold Futures' },
  { label: 'Crude Oil', value: 'NYMEX:CL1!', description: 'Crude Oil Futures' }
] as const;

export function getBaseConfig(theme: Theme | undefined): BaseWidgetConfig {
  return {
    colorTheme: 'dark',
    isTransparent: false,
    locale: 'en',
  };
}

export function getChartConfig(theme: Theme | undefined, symbol: string): ChartWidgetConfig {
  const baseConfig = getBaseConfig(theme);
  return {
    ...baseConfig,
    symbol,
    interval: 'D',
    timezone: 'Etc/UTC',
    style: '1',
    studies: [
      'MASimple@tv-basicstudies',
      'RSI@tv-basicstudies',
      'VWAP@tv-basicstudies'
    ],
    toolbar_bg: '#1a1b1e',
    hide_side_toolbar: false,
    hide_top_toolbar: false,
    theme: 'dark',
    allow_symbol_change: true,
    details: true,
    hotlist: true,
    calendar: true,
    enable_publishing: false,
    withdateranges: true,
    container_id: 'tradingview_chart',
    library_path: '/charting_library/',
    width: '100%',
  };
}

export function getTechnicalAnalysisConfig(
  theme: Theme | undefined,
  symbol: string,
  showIndicators: boolean
): TechnicalAnalysisConfig {
  const baseConfig = getBaseConfig(theme);
  return {
    ...baseConfig,
    symbol,
    showIntervalTabs: true,
    interval: '1D',
    backgroundColor: 'transparent',
    studies: showIndicators
      ? [
          'RSI@tv-basicstudies',
          'StochasticRSI@tv-basicstudies',
          'MACD@tv-basicstudies',
          'MASimple@tv-basicstudies',
          'MAExp@tv-basicstudies',
          'BB@tv-basicstudies',
        ]
      : [],
    showSummary: true,
    showTALegend: true,
  };
}

export function getCryptoMarketConfig(theme: Theme | undefined): MarketOverviewConfig {
  const baseConfig = getBaseConfig(theme);
  return {
    ...baseConfig,
    showFloatingTooltip: true,
    showVolume: true,
    showSymbolLogo: true,
    dateRange: "12M",
    plotLineColorGrowing: "#22AB94",
    plotLineColorFalling: "#F7525F",
    gridLineColor: "#363843",
    scaleFontColor: "#787B86",
    belowLineFillColorGrowing: "rgba(34, 171, 148, 0.12)",
    belowLineFillColorFalling: "rgba(247, 82, 95, 0.12)",
    symbolActiveColor: "rgba(34, 171, 148, 0.12)",
    tabs_layout: "horizontal",
    backgroundColor: "#1a1b1e",
    tabs: [
      {
        title: 'Major Crypto',
        symbols: CRYPTO_PAIRS.map(pair => ({
          s: pair.value,
          d: pair.description
        })),
        originalTitle: 'Cryptocurrencies'
      },
      {
        title: 'DeFi',
        symbols: [
          { s: 'BINANCE:UNIUSDT', d: 'Uniswap' },
          { s: 'BINANCE:AAVEUSDT', d: 'Aave' },
          { s: 'BINANCE:MKRUSDT', d: 'Maker' },
          { s: 'BINANCE:SNXUSDT', d: 'Synthetix' }
        ],
        originalTitle: 'DeFi'
      },
      {
        title: 'Layer 1',
        symbols: [
          { s: 'BINANCE:AVAXUSDT', d: 'Avalanche' },
          { s: 'BINANCE:MATICUSDT', d: 'Polygon' },
          { s: 'BINANCE:DOTUSDT', d: 'Polkadot' },
          { s: 'BINANCE:NEARUSDT', d: 'NEAR' }
        ],
        originalTitle: 'Layer 1 Blockchains'
      }
    ]
  };
}

export function getEconomyMarketConfig(theme: Theme | undefined): MarketOverviewConfig {
  const baseConfig = getBaseConfig(theme);
  return {
    ...baseConfig,
    showFloatingTooltip: true,
    showVolume: true,
    showSymbolLogo: true,
    dateRange: "12M",
    plotLineColorGrowing: "#22AB94",
    plotLineColorFalling: "#F7525F",
    gridLineColor: "#363843",
    scaleFontColor: "#787B86",
    belowLineFillColorGrowing: "rgba(34, 171, 148, 0.12)",
    belowLineFillColorFalling: "rgba(247, 82, 95, 0.12)",
    symbolActiveColor: "rgba(34, 171, 148, 0.12)",
    tabs_layout: "horizontal",
    backgroundColor: "#1a1b1e",
    tabs: [
      {
        title: 'Global Indices',
        symbols: [
          { s: 'FOREXCOM:SPXUSD', d: 'S&P 500' },
          { s: 'FOREXCOM:NSXUSD', d: 'Nasdaq 100' },
          { s: 'FOREXCOM:DJI', d: 'Dow Jones' },
          { s: 'FRED:GDP', d: 'US GDP' },
          { s: 'FRED:UNRATE', d: 'US Unemployment Rate' }
        ],
        originalTitle: 'Global Markets'
      },
      {
        title: 'Forex',
        symbols: [
          { s: 'FX:EURUSD', d: 'EUR/USD' },
          { s: 'FX:GBPUSD', d: 'GBP/USD' },
          { s: 'FX:USDJPY', d: 'USD/JPY' },
          { s: 'FX:AUDUSD', d: 'AUD/USD' }
        ],
        originalTitle: 'Forex'
      },
      {
        title: 'Commodities',
        symbols: [
          { s: 'COMEX:GC1!', d: 'Gold' },
          { s: 'NYMEX:CL1!', d: 'Crude Oil' },
          { s: 'COMEX:SI1!', d: 'Silver' },
          { s: 'NYMEX:NG1!', d: 'Natural Gas' }
        ],
        originalTitle: 'Commodities'
      }
    ]
  };
}

export function getTickerConfig(theme: Theme | undefined, selectedPair?: string): TickerConfig {
  const baseConfig = getBaseConfig(theme);
  const selectedPairInfo = CRYPTO_PAIRS.find(pair => pair.value === selectedPair);
  const otherPairs = CRYPTO_PAIRS.filter(pair => pair.value !== selectedPair);
  const orderedPairs = selectedPairInfo 
    ? [selectedPairInfo, ...otherPairs]
    : CRYPTO_PAIRS;

  return {
    ...baseConfig,
    symbols: orderedPairs.map(pair => ({
      description: pair.description,
      proName: pair.value
    })),
    displayMode: 'adaptive',
    showSymbolLogo: true,
  };
} 