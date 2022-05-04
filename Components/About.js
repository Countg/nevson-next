import React from 'react';
import Link from 'next/link';
import styles from '../styles/CallToAction.module.css';

export default function CallToAction() {
  return (
    <div className={styles.callContainer}>
      <Link href='/about'>
        <div className={styles.callToAction}></div>
      </Link>
    </div>
  );
}
