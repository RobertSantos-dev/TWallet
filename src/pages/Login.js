import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userEmail } from '../redux/actions';

const VALUE_LENGTH = 6;
const EMAIL_VALID = '@email.com';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.btnValidad = this.btnValidad.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    const { dispatch, history } = this.props;
    const { email } = this.state;

    dispatch(userEmail(email));
    history.push('/carteira');
  }

  btnValidad() {
    const { email, password } = this.state;
    const condicao = !email.includes(EMAIL_VALID);
    const condicao2 = password.length < VALUE_LENGTH;

    const res = (condicao || condicao2) || false;
    return res;
  }

  render() {
    const { passwordLogin } = this.state;

    return (
      <main>
        <div>
          <input
            type="email"
            name="email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </div>
        <div>
          <button
            type="button"
            onClick={ this.handleClick }
            disabled={ this.btnValidad() }
          >
            Entrar
          </button>
        </div>
        <div><span>{ passwordLogin }</span></div>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
