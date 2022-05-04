import React from 'react';
import { Typography } from '@material-ui/core';
import styles from '../styles/Home.module.css';

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContainer}>
        <div className={styles.heroImage}></div>
        <div className={styles.heroBlurb}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            est leo, sodales ut ipsum et, pharetra imperdiet ante.
          </p>
          <button className={styles.productButton}>Contact Us</button>
        </div>
      </div>
    </div>
  );
}
