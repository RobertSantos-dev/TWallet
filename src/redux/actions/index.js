// Coloque aqui suas actions
import { EMAIL_LOGIN } from '../reducers/user';

const userEmail = (email) => ({
  type: EMAIL_LOGIN,
  email,
});

export default userEmail;
