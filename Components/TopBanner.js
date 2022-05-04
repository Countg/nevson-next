import React from 'react';
import { Typography } from '@material-ui/core';
import styles from '../styles/Home.module.css';

export default function TopBanner() {
  return (
    <div style={{ backgroundColor: '#F1DED9' }}>
      <div className={styles.topBanner}>
        <Typography variant='p' className={styles.scrollText}>
          Free Shipping in Ontario
        </Typography>
      </div>
    </div>
  );
}
