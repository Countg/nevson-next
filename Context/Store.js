import React, { createContext, useReducer, useEffect, useContext } from 'react';
import commerce from '../lib/commerce';
import {
  CART_RETRIEVE_REQUEST,
  CART_RETRIEVE_SUCCESS,
} from '../lib/Constansts';

const StoreContext = createContext();
const StoreDispatchContext = createContext();

const initialState = {
  cart: { loading: true },
};

function reducer(state, action) {
  switch (action.type) {
    case CART_RETRIEVE_REQUEST:
      return {
        ...state,
        cart: { loading: true },
      };
    case CART_RETRIEVE_SUCCESS:
      return {
        ...state,
        cart: { loading: false, data: action.payload },
      };
    default:
      return state;
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getCart();
  }, []);

  const setCart = (payload) =>
    dispatch({ type: CART_RETRIEVE_SUCCESS, payload });

  const getCart = async () => {
    try {
      const cart = await commerce.cart.retrieve();
      setCart(cart);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StoreDispatchContext.Provider value={{ setCart }}>
      <StoreContext.Provider value={state}>{children}</StoreContext.Provider>
    </StoreDispatchContext.Provider>
  );
};

export const useStoreState = () => useContext(StoreContext);
export const useStoreDispatch = () => useContext(StoreDispatchContext);
