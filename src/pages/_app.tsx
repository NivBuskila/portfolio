import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { NEXT_SEO_DEFAULT } from '../next-seo.config';
import Layout from '@/components/layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...NEXT_SEO_DEFAULT} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}