'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CheckCircleIcon, XCircleIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { personalInfo } from '@/data/personalInfo';

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .required('Message is required'),
});

type NotificationType = 'success' | 'error' | null;

export default function Contact() {
  const [notification, setNotification] = useState<{
    type: NotificationType;
    message: string;
  }>({ type: null, message: '' });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: ContactSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setNotification({ type: null, message: '' });
        
        const response = await fetch('https://formspree.io/f/xrbboyzz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          setNotification({
            type: 'success',
            message: 'Thank you! Your message has been sent successfully. I&apos;ll get back to you soon!'
          });
          resetForm();
  
          setTimeout(() => setNotification({ type: null, message: '' }), 5000);
        } else {
          throw new Error('Failed to send message');
        }
      } catch {
        setNotification({
          type: 'error',
          message: 'Oops! Failed to send your message. Please try again or contact me directly.'
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div
      className="
        relative
        min-h-screen
        bg-gradient-to-b
        from-pink-50
        to-blue-50
        dark:from-gray-900
        dark:to-purple-900
        flex
        items-center
        justify-center
        px-4
        py-16
        transition-colors
        duration-500
      "
    >
      <motion.div
        className="
          absolute
          w-80
          h-80
          bg-blue-200
          dark:bg-blue-800/30
          rounded-full
          mix-blend-multiply
          filter
          blur-3xl
          opacity-50
          top-[-6rem]
          left-[-6rem]
        "
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
      />

      <motion.div
        className="
          absolute
          w-72
          h-72
          bg-purple-200
          dark:bg-purple-800/30
          rounded-full
          mix-blend-multiply
          filter
          blur-3xl
          opacity-50
          bottom-[-6rem]
          right-[-6rem]
        "
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse' }}
      />

      <motion.div
        className="
          relative
          bg-white/90
          dark:bg-gray-800/90
          backdrop-blur-md
          border
          border-gray-200
          dark:border-gray-700
          rounded-2xl
          shadow-xl
          dark:shadow-2xl
          max-w-lg
          w-full
          p-8
          transition-colors
          duration-500
        "
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 text-center transition-colors duration-500">
            Let&apos;s Connect
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8 transition-colors duration-500">
            Have a project in mind? I&apos;d love to hear about it!
          </p>
        </motion.div>

        <AnimatePresence>
          {notification.type && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`
                flex items-center gap-3 p-4 rounded-lg mb-6 border
                ${notification.type === 'success' 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300' 
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
                }
              `}
            >
              {notification.type === 'success' ? (
                <CheckCircleIcon className="h-5 w-5 flex-shrink-0" />
              ) : (
                <XCircleIcon className="h-5 w-5 flex-shrink-0" />
              )}
              <p className="text-sm font-medium">{notification.message}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-500">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              {...formik.getFieldProps('name')}
              className={`
                w-full px-4 py-3 rounded-lg border
                bg-white dark:bg-gray-700
                text-gray-900 dark:text-white
                placeholder-gray-500 dark:placeholder-gray-400
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                ${formik.touched.name && formik.errors.name 
                  ? 'border-red-500 dark:border-red-400' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }
              `}
            />
            <AnimatePresence>
              {formik.touched.name && formik.errors.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 dark:text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  <XCircleIcon className="h-4 w-4" />
                  {formik.errors.name}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-500">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              {...formik.getFieldProps('email')}
              className={`
                w-full px-4 py-3 rounded-lg border
                bg-white dark:bg-gray-700
                text-gray-900 dark:text-white
                placeholder-gray-500 dark:placeholder-gray-400
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                ${formik.touched.email && formik.errors.email 
                  ? 'border-red-500 dark:border-red-400' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }
              `}
            />
            <AnimatePresence>
              {formik.touched.email && formik.errors.email && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 dark:text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  <XCircleIcon className="h-4 w-4" />
                  {formik.errors.email}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-500">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Tell me about your project or ask me anything..."
              {...formik.getFieldProps('message')}
              className={`
                w-full px-4 py-3 rounded-lg border
                bg-white dark:bg-gray-700
                text-gray-900 dark:text-white
                placeholder-gray-500 dark:placeholder-gray-400
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                resize-none
                ${formik.touched.message && formik.errors.message 
                  ? 'border-red-500 dark:border-red-400' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }
              `}
            />
            <div className="flex justify-between items-center mt-2">
              <AnimatePresence>
                {formik.touched.message && formik.errors.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 dark:text-red-400 text-sm flex items-center gap-1"
                  >
                    <XCircleIcon className="h-4 w-4" />
                    {formik.errors.message}
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formik.values.message.length}/1000
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <button
              type="submit"
              disabled={formik.isSubmitting || !formik.isValid}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-3
                py-3
                px-6
                rounded-lg
                text-white
                font-medium
                bg-gradient-to-r
                from-purple-500
                to-blue-500
                hover:from-purple-600
                hover:to-blue-600
                dark:from-purple-600
                dark:to-blue-600
                dark:hover:from-purple-700
                dark:hover:to-blue-700
                transform
                transition-all
                duration-300
                hover:scale-105
                focus:outline-none
                focus:ring-4
                focus:ring-purple-500/50
                disabled:opacity-50
                disabled:cursor-not-allowed
                disabled:transform-none
                shadow-lg
                hover:shadow-xl
              "
            >
              {formik.isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Sending Message...
                </>
              ) : (
                <>
                  <PaperAirplaneIcon className="h-5 w-5" />
                  Send Message
                </>
              )}
            </button>
          </motion.div>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center transition-colors duration-500"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-3 transition-colors duration-500">
            Or reach me directly at:
          </p>
          <div className="space-y-2">
            <a
              href={`mailto:${personalInfo.email}`}
              className="block text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors duration-300"
            >
              {personalInfo.email}
            </a>
            <a
              href={`tel:${personalInfo.phone}`}
              className="block text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors duration-300"
            >
              {personalInfo.phone}
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
