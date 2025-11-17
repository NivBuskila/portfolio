'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  bio: string;
  avatar_url: string;
  name: string;
  login: string;
  html_url: string;
}

interface SocialPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'github' | 'linkedin';
  username: string;
}

export default function SocialPreviewModal({
  isOpen,
  onClose,
  type,
  username,
}: SocialPreviewModalProps) {
  const [githubData, setGithubData] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cache configuration: 5 minutes
  const CACHE_KEY = `github_${username}`;
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

  const fetchGitHubData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Check cache first
      if (typeof window !== 'undefined') {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          try {
            const { data, timestamp } = JSON.parse(cachedData);
            const cacheAge = Date.now() - timestamp;

            // Use cached data if it's fresh (less than 5 minutes old)
            if (cacheAge < CACHE_DURATION) {
              setGithubData(data);
              setLoading(false);
              return;
            }
          } catch {
            // If cache is corrupted, clear it and continue to fetch
            localStorage.removeItem(CACHE_KEY);
          }
        }
      }

      // Fetch from API
      const response = await fetch(`https://api.github.com/users/${username}`);

      // Check for rate limit
      if (response.status === 403) {
        const rateLimitReset = response.headers.get('X-RateLimit-Reset');
        const resetTime = rateLimitReset
          ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString()
          : 'soon';
        setError(`GitHub API rate limit reached. Try again after ${resetTime}`);
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch GitHub data');
      }

      const data = await response.json();
      setGithubData(data);

      // Save to cache
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              data,
              timestamp: Date.now(),
            })
          );
        } catch {
          // Storage quota exceeded or disabled - not critical, just skip caching
          if (process.env.NODE_ENV === 'development') {
            console.warn('Failed to cache GitHub data');
          }
        }
      }
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      setError('Failed to load GitHub profile. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [username, CACHE_KEY, CACHE_DURATION]);

  useEffect(() => {
    if (isOpen && type === 'github') {
      fetchGitHubData();
    }
  }, [isOpen, type, fetchGitHubData]);

  const renderGitHubPreview = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Oops!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchGitHubData}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (!githubData) return null;

    return (
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <Image
            src={githubData.avatar_url}
            alt={githubData.name}
            width={80}
            height={80}
            loading="lazy"
            className="rounded-full border-4 border-purple-500"
          />
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {githubData.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              @{githubData.login}
            </p>
          </div>
        </div>

        {/* Bio */}
        {githubData.bio && (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {githubData.bio}
          </p>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {githubData.public_repos}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Repositories
            </div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {githubData.followers}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Followers
            </div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {githubData.following}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Following
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <a
            href={githubData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
          >
            View Full Profile →
          </a>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const renderLinkedInPreview = () => {
    return (
      <div className="space-y-6">
        {/* LinkedIn Preview */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
            NB
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              Niv Buskila
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Full Stack Developer
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span>Computer Science Graduate - Afeka College</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Tel Aviv, Israel</span>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
            Top Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              'React',
              'Next.js',
              'TypeScript',
              'Python',
              'Java',
              'Node.js',
              'AWS',
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <a
            href="https://www.linkedin.com/in/nivbuskila/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
          >
            Connect on LinkedIn →
          </a>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  {type === 'github' ? (
                    <>
                      <svg
                        className="h-8 w-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      GitHub Profile
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-8 w-8 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      LinkedIn Profile
                    </>
                  )}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Content */}
              {type === 'github'
                ? renderGitHubPreview()
                : renderLinkedInPreview()}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
