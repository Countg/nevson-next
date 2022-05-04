import { Typography } from '@material-ui/core';
import React from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { FaCanadianMapleLeaf } from 'react-icons/fa';
import { BiHomeHeart } from 'react-icons/bi';
import styles from '../styles/Home.module.css';

export default function ShippingContainer() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.shippingContainer}>
        <Typography variant='h6' style={{ fontFamily: 'Leto' }}>
          Free Shipping in Ontario <MdLocalShipping className={styles.icon} />
        </Typography>
        <Typography variant='h6' style={{ fontFamily: 'Leto' }}>
          Quality Made <BiHomeHeart className={styles.icon} />
        </Typography>

        <Typography variant='h6' style={{ fontFamily: 'Leto' }}>
          100% Locally Made <FaCanadianMapleLeaf className={styles.icon} />
        </Typography>
      </div>
    </div>
  );
}
