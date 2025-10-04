import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const Contact = dynamic(() => import('@/components/contact/Contact'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" type="spinner" text="Loading contact form..." />
    </div>
  ),
});

export default function ContactPage() {
  return <Contact />;
}