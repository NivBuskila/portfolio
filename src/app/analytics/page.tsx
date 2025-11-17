import type { Metadata } from 'next';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';

export const metadata: Metadata = {
  title: 'Analytics Dashboard | Niv Buskila',
  description: 'Private analytics dashboard for portfolio performance metrics',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AnalyticsPage() {
  return <AnalyticsDashboard />;
}
