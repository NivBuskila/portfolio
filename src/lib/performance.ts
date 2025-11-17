// Web Vitals performance monitoring
interface WebVitalsMetric {
  name: string;
  value: number;
  id: string;
  rating?: string;
}

// Performance budget thresholds (in milliseconds)
const PERFORMANCE_BUDGETS = {
  FCP: 1800, // First Contentful Paint
  LCP: 2500, // Largest Contentful Paint
  FID: 100,  // First Input Delay
  INP: 200,  // Interaction to Next Paint
  CLS: 0.1,  // Cumulative Layout Shift
  TTFB: 800, // Time to First Byte
};

export const reportWebVitals = (metric: WebVitalsMetric) => {
  const rating = metric.rating || getRating(metric.name, metric.value);
  const roundedValue = Math.round(metric.value);

  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: roundedValue,
      metric_rating: rating,
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Send to custom analytics endpoint (if configured)
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    sendToAnalytics({
      metric: metric.name,
      value: roundedValue,
      rating,
      id: metric.id,
      timestamp: Date.now(),
      url: window.location.pathname,
      userAgent: navigator.userAgent,
    }).catch((error) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to send analytics:', error);
      }
    });
  }

  // Performance budget warnings in development
  if (process.env.NODE_ENV === 'development') {
    const budget = PERFORMANCE_BUDGETS[metric.name as keyof typeof PERFORMANCE_BUDGETS];
    const exceedsBudget = budget && metric.value > budget;

    console.log(`%c[Performance] ${metric.name}`,
      `color: ${rating === 'good' ? '#22c55e' : rating === 'needs-improvement' ? '#f59e0b' : '#ef4444'}; font-weight: bold`,
      {
        value: `${roundedValue}ms`,
        rating,
        budget: budget ? `${budget}ms` : 'N/A',
        exceedsBudget,
      }
    );

    if (exceedsBudget) {
      console.warn(`⚠️ Performance budget exceeded for ${metric.name}:`, {
        actual: roundedValue,
        budget,
        difference: roundedValue - budget,
      });
    }
  }
};

// Send metrics to custom analytics endpoint
async function sendToAnalytics(data: Record<string, unknown>) {
  const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;
  if (!endpoint) return;

  try {
    // Use sendBeacon if available (doesn't block page unload)
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      navigator.sendBeacon(endpoint, blob);
    } else {
      // Fallback to fetch
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        keepalive: true,
      });
    }
  } catch (error) {
    // Silently fail in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Analytics error:', error);
    }
  }
}

// Helper function to get performance rating
const getRating = (name: string, value: number): string => {
  const thresholds = {
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    INP: { good: 200, poor: 500 }, // Interaction to Next Paint
    CLS: { good: 0.1, poor: 0.25 },
    TTFB: { good: 800, poor: 1800 },
  };

  const threshold = thresholds[name as keyof typeof thresholds];
  if (!threshold) return 'unknown';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};

// Performance observer for additional metrics
export const initPerformanceObserver = () => {
  if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') {
    return () => undefined;
  }

  const supportedEntryTypes = PerformanceObserver.supportedEntryTypes ?? [];
  const observers: PerformanceObserver[] = [];

  const registerObserver = (
    entryType: PerformanceEntry['entryType'],
    callback: PerformanceObserverCallback,
  ) => {
    if (!supportedEntryTypes.includes(entryType)) {
      return;
    }

    try {
      const observer = new PerformanceObserver(callback);
      observer.observe({ entryTypes: [entryType] });
      observers.push(observer);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Performance Observer setup failed for ${entryType}:`, error);
      }
    }
  };

  registerObserver('largest-contentful-paint', (list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];

    if (lastEntry) {
      reportWebVitals({
        name: 'LCP',
        value: lastEntry.startTime,
        id: 'v3-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      });
    }
  });

  // Track First Input Delay (FID)
  registerObserver('first-input', (list) => {
    for (const entry of list.getEntries()) {
      const fidEntry = entry as PerformanceEventTiming;
      reportWebVitals({
        name: 'FID',
        value: fidEntry.processingStart - entry.startTime,
        id: 'v3-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      });
    }
  });

  // Track Interaction to Next Paint (INP) - New Core Web Vital
  // INP measures overall responsiveness by observing all interactions
  let maxINP = 0;
  registerObserver('event', (list) => {
    for (const entry of list.getEntries()) {
      const eventEntry = entry as PerformanceEventTiming;
      // Calculate interaction latency
      if (eventEntry.duration) {
        maxINP = Math.max(maxINP, eventEntry.duration);
      }
    }
  });

  // Report INP on page visibility change or unload
  if (typeof document !== 'undefined') {
    const reportINP = () => {
      if (maxINP > 0) {
        reportWebVitals({
          name: 'INP',
          value: maxINP,
          id: 'v3-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        });
      }
    };

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        reportINP();
      }
    });

    // Also report on page unload
    window.addEventListener('pagehide', reportINP);
  }

  registerObserver('layout-shift', (list) => {
    let clsValue = 0;
    for (const entry of list.getEntries()) {
      const layoutShiftEntry = entry as PerformanceEntry & {
        value?: number;
        hadRecentInput?: boolean;
      };
      if (!layoutShiftEntry.hadRecentInput && typeof layoutShiftEntry.value === 'number') {
        clsValue += layoutShiftEntry.value;
      }
    }

    reportWebVitals({
      name: 'CLS',
      value: clsValue,
      id: 'v3-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    });
  });

  return () => {
    observers.forEach((observer) => {
      try {
        observer.disconnect();
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('Failed to disconnect PerformanceObserver:', error);
        }
      }
    });
  };
};
