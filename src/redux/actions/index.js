// Coloque aqui suas actions
import { EMAIL_LOGIN } from '../reducers/user';
import { WALLET_EXPENSES } from '../reducers/wallet';

export const userEmail = (email) => ({
  type: EMAIL_LOGIN,
  email,
});

export const walletExpenses = (idToEdit) => ({
  type: WALLET_EXPENSES,
  idToEdit,
});
