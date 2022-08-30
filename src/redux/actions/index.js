// Coloque aqui suas actions
import { EMAIL_LOGIN } from '../reducers/user';
import { WALLET_EXPENSES, REQUEST_API } from '../reducers/wallet';

export const userEmail = (email) => ({
  type: EMAIL_LOGIN,
  email,
});

export const walletExpenses = (idToEdit) => ({
  type: WALLET_EXPENSES,
  idToEdit,
});

const request = (json) => ({
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
