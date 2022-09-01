// Coloque aqui suas actions
import { EMAIL_LOGIN } from '../reducers/user';
import {
  WALLET_EXPENSES,
  REQUEST_COINS,
  REQUEST_API,
  DELETE_EXPENSES,
} from '../reducers/wallet';
import store from '../store';

export const userEmail = (email) => ({
  type: EMAIL_LOGIN,
  email,
});

export const walletExpenses = (obj) => {
  const res = obj.reduce((acc, at) => {
    const arr = Object.values(at.exchangeRates);
    const ret = arr.find((e) => e.code === at.currency);
    return Number(acc) + Number(at.value * ret.ask);
  }, 0);

  return {
    type: WALLET_EXPENSES,
    idToEdit: res.toFixed(2),
  };
};

const request = (json) => ({
  type: REQUEST_COINS,
  payload: json,
});

const requestApi = (json) => ({
  type: REQUEST_API,
  payload: json,
});

export function fetchCoins() {
  return async (dispatch) => {
    try {
      let res = await fetch('https://economia.awesomeapi.com.br/json/all');
      res = await res.json();
      res = Object.keys(res).filter((obj) => obj !== 'USDT');
      dispatch(request(res));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchApi(arr) {
  return async (dispatch) => {
    try {
      let ret = arr;
      let res = await fetch('https://economia.awesomeapi.com.br/json/all');
      res = await res.json();
      ret = { ...ret, exchangeRates: res };

      dispatch(requestApi(ret));
      dispatch(walletExpenses(store.getState().wallet.expenses));
    } catch (error) {
      console.log(error);
    }
  };
}

export const deleteRow = (arr) => ({
  type: DELETE_EXPENSES,
  payload: arr,
});
