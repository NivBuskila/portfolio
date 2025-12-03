'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CheckCircle, XCircle, Send, Mail } from 'lucide-react';
import { personalInfo } from '@/data/personalInfo';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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
      botcheck: '', // Honeypot field
    },
    validationSchema: ContactSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setNotification({ type: null, message: '' });

        // Honeypot check - if filled, it's a bot
        if (values.botcheck) {
          console.warn('Bot detected - honeypot field was filled');
          setNotification({
            type: 'success',
            message: 'Thank you! Your message has been sent successfully.',
          });
          resetForm();
          return;
        }

        const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
        if (!accessKey) {
          throw new Error('Contact form is not configured');
        }

        const web3formsData = {
          access_key: accessKey,
          name: values.name,
          email: values.email,
          message: values.message,
          subject: `New Contact Form Message from ${values.name}`,
          from_name: `${values.name} via Portfolio`,
          botcheck: '',
          redirect: false,
        };

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(web3formsData),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Failed to send message');
        }

        setNotification({
          type: 'success',
          message:
            "Thank you! Your message has been sent successfully. I'll get back to you soon!",
        });

        if (typeof window !== 'undefined') {
          window.gtag?.('event', 'contact_submit', {
            event_category: 'Contact',
            event_label: 'Form Submission',
          });
        }

        resetForm();
      } catch (error) {
        console.error('Contact form error:', error);
        setNotification({
          type: 'error',
          message:
            'Something went wrong. Please try again later or email me directly.',
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? I&apos;d love to hear
            from you.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Feel free to reach out through any of these channels.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>
                I&apos;ll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* Honeypot */}
                <input
                  type="text"
                  name="botcheck"
                  style={{ display: 'none' }}
                  onChange={formik.handleChange}
                  value={formik.values.botcheck}
                />

                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.name && formik.errors.name
                        ? 'border-destructive'
                        : ''
                    }
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-sm text-destructive">
                      {formik.errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.email && formik.errors.email
                        ? 'border-destructive'
                        : ''
                    }
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-sm text-destructive">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can I help you?"
                    rows={5}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.message && formik.errors.message
                        ? 'border-destructive'
                        : ''
                    }
                  />
                  {formik.touched.message && formik.errors.message && (
                    <p className="text-sm text-destructive">
                      {formik.errors.message}
                    </p>
                  )}
                </div>

                <AnimatePresence>
                  {notification.message && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`flex items-center gap-2 p-3 rounded-md text-sm ${
                        notification.type === 'success'
                          ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                          : 'bg-destructive/10 text-destructive'
                      }`}
                    >
                      {notification.type === 'success' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                      {notification.message}
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
