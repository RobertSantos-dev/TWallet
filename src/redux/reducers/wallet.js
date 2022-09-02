// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
export const WALLET_EXPENSES = 'WALLET_EXPENSES';
export const REQUEST_COINS = 'REQUEST_COINS';
export const REQUEST_API = 'REQUEST_API';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const EDITOR_BOOL = 'EDITOR_BOOL';
export const EDITOR_EXPENSES = 'EDITOR_EXPENSES';

const WALLET_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  totalExpenses: '0', // string que armazena o email da pessoa usuária
};

export default function wallet(state = WALLET_STATE, action) {
  switch (action.type) {
  case WALLET_EXPENSES:
    return { ...state, totalExpenses: action.totalExpenses };
  case REQUEST_COINS:
    return { ...state, currencies: action.payload };
  case REQUEST_API:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case DELETE_EXPENSES:
    return { ...state, expenses: action.payload };
  case EDITOR_BOOL:
    return { ...state, editor: action.editor };
  case EDITOR_EXPENSES:
    return { ...state, idToEdit: action.idToEdit };
  default:
    return state;
  }
}
