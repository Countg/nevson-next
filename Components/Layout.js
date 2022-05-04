import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import Footer from './Footer';
import TopBanner from './TopBanner';

import styles from '../styles/Layout.module.css';
export default function ContainerBlock({ children, ...customMeta }) {
  const router = useRouter();
  const meta = {
    title: 'Nevson Masks - We make quality masks and so much more!',
    description: `Nevson Masks is `,
    image: '/avatar.png',
    type: 'website',
    ...customMeta,
  };

  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name='robots' content='follow, index' />
        <meta content={meta.description} name='description' />
        <meta property='og:url' content={`https://nevson.ca${router.asPath}`} />
        <link rel='canonical' href={`https://nevson.ca${router.asPath}`} />

        <meta property='og:type' content={meta.type} />
        <meta property='og:site_name' content='Nevson Masks' />
        <meta property='og:description' content={meta.description} />
        <meta property='og:title' content={meta.title} />
        <meta property='og:image' content={meta.image} />
        <meta name='twitter:card' content='summary_large_image' />

        <meta name='twitter:title' content={meta.title} />
        <meta name='twitter:description' content={meta.description} />
        <meta name='twitter:image' content={meta.image} />
        {meta.date && (
          <meta property='article:published_time' content={meta.date} />
        )}
      </Head>
      <main className={styles.container}>
        <TopBanner />
        <Navbar />
        <div>{children}</div>

        <Footer />
      </main>
    </div>
  );
}
