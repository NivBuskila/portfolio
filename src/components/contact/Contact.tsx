'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { personalInfo } from '@/data/personalInfo';

const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().required('Required'),
});

export default function Contact() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: ContactSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await fetch('https://formspree.io/f/xrbboyzz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          alert('Message sent successfully!');
          resetForm();
        } else {
          throw new Error('Failed to send message');
        }
      } catch {
        alert('Failed to send message. Please try again later.');
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
        flex
        items-center
        justify-center
        px-4
      "
    >
      <motion.div
        className="
          absolute
          w-80
          h-80
          bg-blue-200
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
          relative
          bg-white/80
          backdrop-blur-md
          border
          border-gray-200
          rounded-2xl
          shadow-lg
          max-w-md
          w-full
          p-8
        "
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Contact Me
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...formik.getFieldProps('name')}
              className="
                mt-1
                block
                w-full
                rounded-md
                border-gray-300
                text-gray-800
                shadow-sm
                focus:border-purple-500
                focus:ring-purple-500
              "
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps('email')}
              className="
                mt-1
                block
                w-full
                rounded-md
                border-gray-300
                text-gray-800
                shadow-sm
                focus:border-purple-500
                focus:ring-purple-500
              "
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              {...formik.getFieldProps('message')}
              className="
                mt-1
                block
                w-full
                rounded-md
                border-gray-300
                text-gray-800
                shadow-sm
                focus:border-purple-500
                focus:ring-purple-500
              "
            />
            {formik.touched.message && formik.errors.message && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.message}
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="
                w-full
                flex
                justify-center
                py-2
                px-4
                border
                border-transparent
                rounded-md
                shadow-sm
                text-sm
                font-medium
                text-white
                bg-purple-600
                hover:bg-purple-700
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-purple-500
                disabled:opacity-50
              "
            >
              {formik.isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600">Or reach me directly at:</p>
          <p className="text-purple-600 mt-2">{personalInfo.email}</p>
        </div>
      </motion.div>
    </div>
  );
}
