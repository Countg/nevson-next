import React from 'react';
import styles from '../styles/Header.module.css';
import Link from 'next/link';

export default function Header() {
  return (
    <section>
      <Link href='/'>
        <div className={styles.header}></div>
      </Link>
    </section>
  );
}
