// Esse reducer será responsável por tratar as informações da pessoa usuária
export const EMAIL_LOGIN = 'EMAIL_LOGIN';

const USER_STATE = { email: '' }; // string que armazena o email da pessoa usuária

export default function user(state = USER_STATE, action) {
  switch (action.type) {
  case EMAIL_LOGIN:
    return { email: action.email };
  default:
    return state;
  }
}
