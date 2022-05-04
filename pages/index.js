import Head from 'next/head';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from '../styles/Product.module.css';
import Layout from '../Components/Layout';

import commerce from '../lib/commerce';
import ProductDisplay from '../Components/ProductDisplay';

import Featured from '../Components/Featured';
import AboutContainer from '../Components/AboutContainer';
import ShippingContainer from '../Components/ShippingContainer';

export default function Home({ productsPerCategory, featured }) {
  return (
    <Layout title='Nevson Masks - Home'>
      <AboutContainer />
      <ProductDisplay categories={productsPerCategory} />
      <ShippingContainer />
      <div className={styles.productContainer}>
        <div className={styles.productDetails}>
          <Featured featured={featured} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data: featured } = await commerce.products.list({
    category_slug: 'Featured',
  });
  const { data: products } = await commerce.products.list();
  const { data: categoriesData } = await commerce.categories.list();

  const productsPerCategory = categoriesData.reduce((acc, category) => {
    return [
      ...acc,
      {
        ...category,
        productData: products.filter((product) =>
          product.categories.find((cat) => cat.id === category.id)
        ),
      },
    ];
  }, []);

  return {
    props: {
      productsPerCategory,
      featured,
    },
  };
}
