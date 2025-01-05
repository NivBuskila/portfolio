import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FadeIn } from '@/components/animations/FadeIn';
import { personalInfo } from '@/data/personalInfo';

const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().required('Required'),
});

const FORM_ENDPOINT = 'https://formspree.io/f/xrbboyzz';

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
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          alert('Message sent successfully!');
          resetForm();
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        alert('Failed to send message. Please try again later.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <FadeIn>
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">
              Get in Touch
            </h1>
            <p className="mt-4 text-lg text-gray-500 text-center">
              Have a question or want to work together? Feel free to reach out!
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    {...formik.getFieldProps('name')}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="mt-2 text-sm text-red-600">{formik.errors.name}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    {...formik.getFieldProps('email')}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    {...formik.getFieldProps('message')}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                  {formik.touched.message && formik.errors.message && (
                    <p className="mt-2 text-sm text-red-600">{formik.errors.message}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {formik.isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="flex flex-col space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                  <p className="mt-1 text-gray-500">{personalInfo.email}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Follow Me</h3>
                  <div className="mt-2 flex space-x-6">
                    <a
                      href={personalInfo.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">GitHub</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a
                      href={personalInfo.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}