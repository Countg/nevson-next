import { Typography } from '@material-ui/core';
import React from 'react';
import Divider from '../lib/Divider';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
  Dot,
  ButtonFirst,
  ButtonLast,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import ProductContainer from './ProductContainer';
import styles from '../styles/Home.module.css';

export default function Featured({ featured }) {
  return (
    <div className={styles.featuredContainer}>
      <Divider>
        <Typography
          className='headline'
          variant='h6'
          component='h3'
          style={{
            textAlign: 'center',
            fontFamily: 'Lato',
            textTransform: 'uppercase',
            padding: '2em',
          }}>
          Featured Products
        </Typography>
      </Divider>

      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={120}
        visibleSlides={4}
        totalSlides={6}>
        <Slider>
          <ProductContainer products={featured} />
        </Slider>
        <div className={styles.sliderComponent}>
          <ButtonBack>Back</ButtonBack>
          <DotGroup dotNumbers={false} />
          <ButtonNext>Next</ButtonNext>
        </div>
      </CarouselProvider>
    </div>
  );
}
