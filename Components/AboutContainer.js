import React from 'react';
import Link from 'next/link';
import { Typography } from '@material-ui/core';
import styles from '../styles/Home.module.css';

export default function MaskContainer({ categories }) {
  return (
    <div className={styles.masksContainer}>
      <div className={styles.maskDescription}>
        <div className={styles.maskLogo}>
          <img src='/logos/71AD6B84-A24F-4AD1-94BE-53D78B348DB2.png' />
        </div>
        <p>
          Started in March 2020, as a way to keep busy at the onset of lockdown,
          Nevson Masks grew into a side hustle with a mission - to stop the
          spread and give back to our community.<br></br>
          <br></br>
          Well-made, safe,comfortable and cute masks have always been the
          priority; donating a portion of proceeds to local charities and
          organizations has been integral to the vision from the start. Why the
          name Nevson? It’s a portmanteau of the names of these beloved
          fur-babies, Neville and Watson. They’re excellent company in the
          sewing room, and needed to be represented somehow! Pet lovers will
          understand.
        </p>
        <div className={styles.maskButton}>
          <Link href='mailto:nevsonmasks@gmail.com'>
            <button>CONTACT US</button>
          </Link>
        </div>
      </div>
      <div className={styles.maskImage}></div>
    </div>
  );
}
