import React from 'react';
import Link from 'next/link';
import Image from 'next/dist/client/image';
import styles from '../styles/Home.module.css';

export default function ProductDisplay({ categories }) {
  return (
    <div className={styles.productDisplayContainer}>
      <Link href={`categories/${categories[4].slug}`}>
        <div>
          <div className={styles.linkDisplayOne}>
            <img src='/images/BeBoldMasks.png' />
          </div>
          <div className={styles.linkContainer}>
            <h2>Be Bold & Stay Safe</h2>
            <button>Shop Masks</button>
          </div>
        </div>
      </Link>
      <Link href={`categories/${categories[3].slug}`}>
        <div>
          <div className={styles.linkDisplayTwo}>
            <img src='/images/StayPutLaynards2.png' />
          </div>
          <div className={styles.linkContainer}>
            <h2>Stay Put</h2>
            <button>Shop Lanyards</button>
          </div>
        </div>
      </Link>

      <Link href={`categories/${categories[2].slug}`}>
        <div>
          <div className={styles.linkDisplayThree}>
            <img src='/images/BabyBibTransparentNEW.png' />
          </div>
          <div className={styles.linkContainer}>
            <h2>Contain The Drool</h2>
            <button>Shop Baby Bibs</button>
          </div>
        </div>
      </Link>

      <Link href={`categories/${categories[1].slug}`}>
        <div>
          <div className={styles.linkDisplayFour}>
            <img src='/images/DogBandanasTransparentNEW.png' />
          </div>
          <div className={styles.linkContainer}>
            <h2>Protect Your Bestie</h2>
            <button>Shop Reflective Dog Bandanas</button>
          </div>
        </div>
      </Link>
    </div>
  );
}
