import React from 'react';
import Layout from '../Components/Layout';
import { useStoreState, useStoreDispatch } from '../Context/Store';
import commerce from '../lib/commerce';
import Router from 'next/router';
import {
  CircularProgress,
  Slide,
  Typography,
  TableContainer,
  TableBody,
  TableCell,
  Button,
  MenuItem,
  TableRow,
  Table,
  TableHead,
  Select,
  Grid,
  Card,
  List,
  ListItem,
} from '@material-ui/core';
import Link from 'next/link';
import { Alert } from '@material-ui/lab';
import styles from '../styles/Landing.module.css';

export default function Cart() {
  const { cart } = useStoreState();
  const { setCart } = useStoreDispatch();

  const handleUpdateCartQty = async (lineItem, quantity) => {
    commerce.cart
      .update(lineItem.id, {
        quantity,
      })
      .then(({ cart }) => {
        setCart(cart);
      });
  };

  const handleRemoveFromCart = (lineItemId) => {
    commerce.cart.remove(lineItemId).then(({ cart }) => {
      setCart(cart);
    });
  };

  const processCheckoutHandler = () => {
    Router.push('/checkout');
  };

  return (
    <Layout title='Nevson Masks - Cart'>
      {cart.loading ? (
        <CircularProgress />
      ) : cart.data.line_items.length === 0 ? (
        <Alert icon={false} severity='error'>
          Cart is empty. <Link href='/'>GO SHOPPING</Link>
        </Alert>
      ) : (
        <React.Fragment>
          <Typography variant='h3' component='h1' style={{ marginTop: '1em' }}>
            Shopping Cart
          </Typography>
          <Slide direction='up' in={true}>
            <Grid container spacing={2} justifyContent='center'>
              <Grid item md={8} style={{ margin: '0 auto' }}>
                <TableContainer>
                  <Table aria-label='Orders'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align='right'>Quantity</TableCell>
                        <TableCell align='right'>Price</TableCell>
                        <TableCell align='right'>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cart.data.line_items.map((cartItem) => (
                        <TableRow key={cartItem.name}>
                          <TableCell component='th' scope='row'>
                            {cartItem.name}

                            <p
                              style={{
                                fontWeight: 'lighter',
                                fontSize: '.8em',
                              }}>
                              {cartItem.selected_options[0].option_name}
                            </p>
                          </TableCell>
                          <TableCell align='right'>
                            <Select
                              labelId='quanitity-label'
                              id='quanitity'
                              value={cartItem.quantity}
                              onChange={(e) =>
                                handleUpdateCartQty(cartItem, e.target.value)
                              }>
                              {[...Array(10).keys()].map((x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>

                          <TableCell align='right'>
                            {cartItem.price.formatted_with_symbol}
                          </TableCell>
                          <TableCell align='right'>
                            <button
                              className={styles.productButton}
                              onClick={() => handleRemoveFromCart(cartItem.id)}>
                              x
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item lg={3} md={8} sm={7} xs={12}>
                <Card>
                  <List>
                    <ListItem>
                      <Grid container>
                        <Typography variant='h6'>
                          Subtotal: {cart.data.subtotal.formatted_with_symbol}
                        </Typography>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      {cart.data.total_items > 0 && (
                        <button
                          className={styles.productButton}
                          onClick={processCheckoutHandler}>
                          Proceed to Checkout
                        </button>
                      )}
                      <Link href='/'>
                        <button className={styles.productButton}>
                          Continue Shopping
                        </button>
                      </Link>
                    </ListItem>
                  </List>
                </Card>
              </Grid>
            </Grid>
          </Slide>
        </React.Fragment>
      )}
    </Layout>
  );
}
