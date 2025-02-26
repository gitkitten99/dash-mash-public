'use client';

interface ScriptLoadOptions {
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

type WidgetType = 'AdvancedChart' | 'TechnicalAnalysis' | 'Ticker' | 'MarketOverview';

const WIDGET_SCRIPTS: Record<WidgetType, string> = {
  AdvancedChart: 'https://s3.tradingview.com/tv.js',
  TechnicalAnalysis: 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js',
  Ticker: 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js',
  MarketOverview: 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js'
};

export function loadTradingViewScript(type: WidgetType, { onLoad, onError }: ScriptLoadOptions = {}): void {
  if (typeof window === 'undefined') return;

  const scriptId = `tradingview-${type.toLowerCase()}-script`;
  const existingScript = document.getElementById(scriptId);

  // If script exists and is loaded
  if (existingScript && (window as any).TradingView) {
    onLoad?.();
    return;
  }

  // If script exists but not loaded yet, wait for it
  if (existingScript) {
    existingScript.addEventListener('load', () => onLoad?.());
    existingScript.addEventListener('error', () => 
      onError?.(new Error(`Failed to load TradingView ${type} widget script`))
    );
    return;
  }

  // Create new script
  const script = document.createElement('script');
  script.id = scriptId;
  script.type = 'text/javascript';
  script.async = true;
  script.src = WIDGET_SCRIPTS[type];

  script.onload = () => onLoad?.();
  script.onerror = () => onError?.(new Error(`Failed to load TradingView ${type} widget script`));

  document.head.appendChild(script);
}

export function generateWidgetContainerId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}`;
}

export function cleanupTradingViewWidget(container: HTMLElement | null): void {
  if (!container) return;
  
  // Remove TradingView widget instance if it exists
  const widgetInstance = (window as any).TradingView?.widget?.[container.id];
  if (widgetInstance?.remove) {
    try {
      widgetInstance.remove();
    } catch (e) {
      console.warn('Failed to remove TradingView widget instance:', e);
    }
  }

  // Remove all child elements
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  // Remove any TradingView-specific attributes
  const attributes = Array.from(container.attributes);
  attributes.forEach(attr => {
    if (attr.name.startsWith('tv-')) {
      container.removeAttribute(attr.name);
    }
  });
}

export function ensureContainer(container: HTMLElement | null, id: string): HTMLDivElement | null {
  if (!container) return null;

  // Clean up existing content
  cleanupTradingViewWidget(container);

  // Create widget container
  const widgetContainer = document.createElement('div');
  widgetContainer.id = id;
  widgetContainer.className = 'h-full w-full';
  container.appendChild(widgetContainer);

  return widgetContainer;
} 