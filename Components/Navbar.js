import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  IconButton,
  Badge,
  CircularProgress,
} from '@material-ui/core';
import { FiShoppingCart } from 'react-icons/fi';
import { GrInstagram } from 'react-icons/gr';
import styles from '../styles/Navbar.module.css';
import { useStoreState } from '../Context/Store';

export default function Navbar() {
  const router = useRouter();
  const { cart } = useStoreState();

  return (
    <header className={styles.mainNav}>
      <div className={styles.navBar}>
        <Link variant='h6' color='inherit' noWrap href='/'>
          <div className={styles.logo}></div>
        </Link>

        <div className={styles.toolbarButtons}>
          <Link variant='button' color='textPrimary' href='/cart'>
            {cart.loading ? (
              <CircularProgress />
            ) : cart.data.total_items > 0 ? (
              <Badge badgeContent={cart.data.total_items} color='secondary'>
                <FiShoppingCart
                  style={{
                    color: '#E3D4B7',
                    fontSize: '1.5em',
                    cursor: 'pointer',
                  }}
                />
              </Badge>
            ) : (
              <FiShoppingCart
                style={{
                  color: '#E3D4B7',
                  fontSize: '1.5em',
                  cursor: 'pointer',
                }}
              />
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
