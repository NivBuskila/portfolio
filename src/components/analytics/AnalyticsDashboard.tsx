'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/common/AnimatedBackground';

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

interface AnalyticsData {
  webVitals: WebVitalsMetric[];
  pageViews: number;
  uniqueVisitors: number;
  topPages: { page: string; views: number }[];
  lastUpdated: string;
}

export default function AnalyticsDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    webVitals: [],
    pageViews: 0,
    uniqueVisitors: 0,
    topPages: [],
    lastUpdated: new Date().toISOString(),
  });

  // Load Web Vitals from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && isAuthenticated) {
      const storedMetrics = localStorage.getItem('web-vitals-metrics');
      if (storedMetrics) {
        try {
          const metrics = JSON.parse(storedMetrics);
          setAnalytics((prev) => ({ ...prev, webVitals: metrics }));
        } catch (e) {
          console.error('Failed to parse metrics', e);
        }
      }
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password protection - in production, use proper authentication
    if (password === process.env.NEXT_PUBLIC_ANALYTICS_PASSWORD || password === 'demo123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const getMetricColor = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'needs-improvement':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      case 'poor':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-purple-900 flex items-center justify-center px-4 transition-colors duration-500">
        <AnimatedBackground colorScheme="purple" intensity="low" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white/98 dark:bg-gray-800/98 rounded-2xl shadow-xl max-w-md w-full p-8"
        >
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">📊</div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Enter password to view analytics
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter dashboard password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
              {error && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-2">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Access Dashboard
            </button>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
              Demo password: demo123
            </p>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-purple-900 py-16 px-4 transition-colors duration-500">
      <AnimatedBackground colorScheme="purple" intensity="low" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white mb-4">
            Analytics <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Dashboard</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Portfolio performance metrics and insights
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Last updated: {new Date(analytics.lastUpdated).toLocaleString()}
          </p>
        </motion.div>

        {/* Web Vitals Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">⚡</span>
            Web Vitals Performance
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {analytics.webVitals.length > 0 ? (
              analytics.webVitals.map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/95 dark:bg-gray-800/95 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {metric.name}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getMetricColor(metric.rating)}`}
                    >
                      {metric.rating}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {metric.value.toFixed(2)}
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                      {metric.name === 'CLS' ? '' : 'ms'}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Recorded: {new Date(metric.timestamp).toLocaleTimeString()}
                  </p>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">📈</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  No Web Vitals Data Yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Metrics will appear as users interact with the site
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">📊</span>
            Traffic Overview
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <StatCard
              title="Page Views"
              value={analytics.pageViews.toLocaleString()}
              icon="👁️"
              trend="+12%"
            />
            <StatCard
              title="Unique Visitors"
              value={analytics.uniqueVisitors.toLocaleString()}
              icon="👥"
              trend="+8%"
            />
            <StatCard
              title="Avg. Session Duration"
              value="2m 34s"
              icon="⏱️"
              trend="+5%"
            />
          </div>
        </motion.div>

        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">🔥</span>
            Top Pages
          </h2>

          <div className="bg-white/95 dark:bg-gray-800/95 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Page
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Views
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { page: 'Home', views: 1243 },
                  { page: 'Projects', views: 891 },
                  { page: 'About', views: 657 },
                  { page: 'Contact', views: 423 },
                ].map((item, idx) => {
                  const total = 3214;
                  const percentage = ((item.views / total) * 100).toFixed(1);
                  return (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-800 dark:text-white font-medium">
                        /{item.page.toLowerCase()}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-600 dark:text-gray-400">
                        {item.views.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <div className="flex-1 max-w-[100px] bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                            {percentage}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 font-medium"
          >
            Logout
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  trend,
}: {
  title: string;
  value: string;
  icon: string;
  trend?: string;
}) {
  return (
    <div className="bg-white/95 dark:bg-gray-800/95 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{icon}</div>
        {trend && (
          <span className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
        {title}
      </h3>
      <p className="text-3xl font-bold text-gray-800 dark:text-white">{value}</p>
    </div>
  );
}
