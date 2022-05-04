import React, { useEffect, useState } from 'react';
import {
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from '@material-ui/core';
import Router from 'next/router';
import commerce from '../lib/commerce';
import AddressForm from '../Components/Checkout/AddressForm';
import PaymentForm from '../Components/Checkout/PaymentForm';
import { useStoreState, useStoreDispatch } from '../Context/Store';
import Link from 'next/dist/client/link';
import styles from '../styles/Checkout.module.css';

const steps = ['Shipping address', 'Payment details'];

export default function Checkout() {
  const { cart } = useStoreState();

  const { setCart } = useStoreDispatch();
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [order, setOrder] = useState({});
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const refreshCart = () => {
    commerce.cart.refresh().then(({ cart }) => {
      setCart(cart);
    });
  };

  useEffect(() => {
    if (!cart.loading) {
      generateCheckoutToken();
    }
  }, [cart.loading]);

  const generateCheckoutToken = async () => {
    if (cart.data.line_items.length) {
      const token = await commerce.checkout.generateToken(cart.data.id, {
        type: 'cart',
      });
      setCheckoutToken(token);
    } else {
      Router.push('/cart');
    }
  };

  const test = (data) => {
    setShippingData(data);

    nextStep();
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setError(error.data.error.message);
    }
  };

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant='h5'>
            Thank you for your purchase, {order.customer.firstname}{' '}
            {order.customer.lastname}!
          </Typography>
          <Divider className={styles.divider} />
          <Typography variant='subtitle2'>
            Check your email for your receipt
          </Typography>
          <Typography variant='subtitle3'>
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <a href='/'>
          <Button variant='outlined' type='button' to='/'>
            Back to home
          </Button>
        </a>
      </>
    ) : (
      <div className={styles.spinner}>
        <CircularProgress />
      </div>
    );

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant='h5'>Error: {error}</Typography>
        <br />
        <a href='/'>
          <Button variant='outlined' type='button' to='/'>
            Back to home
          </Button>
        </a>
      </>
    );
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        setShippingData={setShippingData}
        test={test}
      />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        shippingData={shippingData}
        onCaptureCheckout={handleCaptureCheckout}
      />
    );
  return (
    <>
      <CssBaseline />
      <div />
      <main className={styles.layout}>
        <Paper className={styles.paper}>
          <Typography variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={styles.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
}
