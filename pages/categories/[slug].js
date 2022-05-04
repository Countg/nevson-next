import React, { useState } from 'react';
import commerce from '../../lib/commerce';
import Layout from '../../Components/Layout';
import ProductContainer from '../../Components/ProductContainer';
import Header from '../../Components/Header';
import { Typography } from '@material-ui/core';
import Divider from '../../lib/Divider';
import ReactPaginate from 'react-paginate';
import Featured from '../../Components/Featured';
import { useWindowSize } from '../../lib/windowSize';

import styles from '../../styles/Product.module.css';

export async function getStaticProps({ params }) {
  const { slug } = params;

  const category = await commerce.categories.retrieve(slug, {
    type: 'slug',
  });

  const { data: products } = await commerce.products.list({
    category_slug: slug,
  });

  const { data: featured } = await commerce.products.list({
    category_slug: 'Featured',
  });

  return {
    props: {
      category,
      products,
      featured,
    },
  };
}

export async function getStaticPaths() {
  const { data: categories } = await commerce.categories.list();

  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug,
      },
    })),
    fallback: false,
  };
}

export default function CategoryPage({ category, products, featured }) {
  const [page, setPage] = useState(0);
  const size = useWindowSize();

  const productsPerPage = size;
  const pagesVisited = page * productsPerPage;
  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  return (
    <Layout title='Nevson Masks - Products'>
      <Header />
      <div className={styles.productContainer}>
        <div>
          <Divider>
            <Typography
              className='headline'
              variant='h6'
              component='h2'
              style={{
                textAlign: 'center',
                fontFamily: 'Lato',
                textTransform: 'uppercase',
                padding: '2em',
              }}>
              {category.name}
            </Typography>
          </Divider>
        </div>
        {products.length === 0 ? (
          <Typography>No Products found</Typography>
        ) : (
          <div className={styles.productDetails}>
            <ProductContainer
              products={products.slice(
                pagesVisited,
                pagesVisited + productsPerPage
              )}
            />
          </div>
        )}
        <div>
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={styles.paginationBttns}
            previousLinkClassName={'previousBttn'}
            nextLinkClassName={'nextBttn'}
            activeClassName={styles.paginationActive}
          />
        </div>
        <div className={styles.productDetails}>
          <Featured featured={featured} />
        </div>
      </div>
    </Layout>
  );
}
