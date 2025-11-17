// Web Vitals performance monitoring
interface WebVitalsMetric {
  name: string;
  value: number;
  id: string;
  rating?: string;
}

export const reportWebVitals = (metric: WebVitalsMetric) => {
  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Save to localStorage for Analytics Dashboard
  if (typeof window !== 'undefined') {
    try {
      const rating = getRating(metric.name, metric.value);
      const metricData = {
        name: metric.name,
        value: Math.round(metric.value),
        rating,
        timestamp: Date.now(),
      };

      // Get existing metrics
      const existingMetrics = localStorage.getItem('web-vitals-metrics');
      const metrics = existingMetrics ? JSON.parse(existingMetrics) : [];

      // Add new metric (keep last 50 metrics to avoid storage bloat)
      metrics.push(metricData);
      if (metrics.length > 50) {
        metrics.shift(); // Remove oldest
      }

      localStorage.setItem('web-vitals-metrics', JSON.stringify(metrics));
    } catch (error) {
      // Storage quota exceeded or disabled - not critical
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to save Web Vitals to localStorage:', error);
      }
    }
  }

  // Log in development for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', {
      name: metric.name,
      value: Math.round(metric.value),
      id: metric.id,
      rating: getRating(metric.name, metric.value),
    });
  }
};

// Helper function to get performance rating
const getRating = (name: string, value: number): string => {
  const thresholds = {
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
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
