import React, { useEffect, useState, useContext } from 'react';
import commerce from '../../lib/commerce';
import Layout from '../../Components/Layout';
import Image from 'next/image';
import { Alert } from '@material-ui/lab';
import Featured from '../../Components/Featured';

import {
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from '@material-ui/core';
import styles from '../../styles/ProductDetails.module.css';
import { useStoreDispatch } from '../../Context/Store';
import Link from 'next/link';

export default function ProductDetails({ product, featured }) {
  const { setCart } = useStoreDispatch();

  const [sizes, setSizes] = useState([]);
  const [variantInfo, setVariantInfo] = useState();

  const fetchSizes = () => {
    let finalSizeArray = product.variant_groups[0].options.map((option) => {
      let sizeInfo = {};

      sizeInfo.key = option.name;
      sizeInfo.text = option.name;
      sizeInfo.value = option.id;

      return sizeInfo;
    });

    setSizes(finalSizeArray);
  };

  useEffect(() => {
    fetchSizes();
  }, []);

  const handleSize = (e, { value }) => {
    setVariantInfo({ [product.variant_groups[0].id]: e.target.value });
  };

  const addToCart = () => {
    if (variantInfo) {
      commerce.cart.add(product.id, 1, variantInfo).then(({ cart }) => {
        setCart(cart);
      });
    } else {
      window.alert('Please Select a Size');
    }
  };

  const renderEmptyProductId = () => (
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

  const renderProductById = () => (
    <Layout title={`Nevson Masks - ${product.name}`}>
      <div>
        <div className={styles.productDetailsContainer}>
          <div className={styles.productDetailsImage}>
            <img src={product.image.url} />
          </div>

          {/* Details container */}
          <div className={styles.productDetailsInfo}>
            <div>
              <Typography
                className='headline'
                variant='h3'
                style={{
                  fontFamily: 'Lumberjack',
                  textTransform: 'uppercase',
                }}>
                {product.name}
              </Typography>
            </div>
            <div className={styles.statusContainer}>
              <Typography variant='h6'>
                {product.price.formatted_with_symbol}
              </Typography>

              {product.inventory.available > 0 ? (
                <Alert icon={false} severity='success'>
                  In Stock
                </Alert>
              ) : (
                <Alert icon={false} severity='error'>
                  Unavailable
                </Alert>
              )}
            </div>
            <div>
              <Typography
                variant='h6'
                style={{
                  display: 'block',
                  lineHeight: '80%',
                  fontWeight: 'lighter',
                }}>
                Description:
              </Typography>
              <Box
                style={{ display: 'block', lineHeight: '30%' }}
                dangerouslySetInnerHTML={{ __html: product.description }}></Box>
            </div>

            <div>
              <FormControl style={{ width: '30%', marginBottom: '2em' }}>
                <InputLabel id='demo-simple-select-label'>SIZE</InputLabel>
                <Select
                  name={sizes.text}
                  value={sizes.text}
                  onChange={handleSize}>
                  {sizes.map((option) => {
                    return (
                      <MenuItem
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='Size'
                        key={option.value}
                        value={option.value}>
                        {option.text}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            {product.categories.map((cat) =>
              cat.name === 'Masks' ? (
                <div className={styles.sizeChart}></div>
              ) : null
            )}

            <div>
              <button onClick={addToCart} role='button' disabled={!variantInfo}>
                Add To Cart
              </button>
              <Link href='/'>
                <button role='button'>Continue Shopping</button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.featuredContainer}>
          <Featured featured={featured} />
        </div>
      </div>
    </Layout>
  );

  return <>{!product ? renderEmptyProductId() : renderProductById()}</>;
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const product = await commerce.products.retrieve(id, {
    type: 'permalink',
  });

  const { data: featured } = await commerce.products.list({
    category_slug: 'Featured',
  });
  return {
    props: {
      product,
      featured,
    },
  };
}
