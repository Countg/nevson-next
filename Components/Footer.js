import React from 'react';
import { Instagram, Email } from '@material-ui/icons';
import { GrInstagram } from 'react-icons/gr';
import { AiFillMail } from 'react-icons/ai';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';
import { Typography } from '@material-ui/core';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.top}>
          <a target='_blank' href='http://instagram.com/nevsonmasks'>
            <GrInstagram className={styles.socials} />
          </a>
          <Link href='mailto:nevsonmasks@gmail.com'>
            <AiFillMail
              className={styles.socials}
              style={{ fontSize: '2em' }}
            />
          </Link>
        </div>
        <div className={styles.bottom}>
          <Typography style={{ fontFamily: 'Lato' }}>
            Copyright © Nevson Masks {currentYear}
          </Typography>
        </div>
      </div>
    </div>
  );
}
