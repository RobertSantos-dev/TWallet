// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
export const WALLET = 'WALLET';

const INITIAL_STATE = {
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  }, // string que armazena o email da pessoa usuária
};

export function user(state = INITIAL_STATE.wallet, action) {
  switch (action.type) {
  case WALLET:
    return { email: action.state };
  default:
    return state;
  }
}
