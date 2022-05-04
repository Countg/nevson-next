import React from 'react';
import Image from 'next/image';
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  Typography,
  Slide,
  Box,
  CardActionArea,
  Divider,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function ProductContainer({ products }) {
  const renderEmptyProducts = () => (
    <Typography variant='subtitle1'>
      We might be sold out of this product. To inquire,
      <a href='mailto:nevsonmasks@gmail.com'>
        <span style={{ paddingLeft: '.2em', fontWeight: 'bold' }}>
          Contact us here
        </span>
      </a>
      !
    </Typography>
  );

  const renderProducts = () => (
    <>
      <div className={styles.productCategoryContainer}>
        {products.map((product) => (
          <div key={product.id}>
            <Slide direction='up' in={true}>
              <a href={`/product/${product.permalink}`}>
                <div>
                  <img src={product.image.url} />
                </div>

                <div>
                  <p>{product.name}</p>
                  <p>{product.price.formatted_with_symbol}</p>
                  <button>Shop Now</button>
                </div>
              </a>
            </Slide>
          </div>
        ))}
      </div>
    </>
  );
  return <>{!products ? renderEmptyProducts() : renderProducts()}</>;
}
