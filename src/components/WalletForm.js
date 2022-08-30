import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchCoins } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoins());
  }

  render() {
    const { currencies } = this.props;

    return (
      <form>
        <div>
          <input type="text" name="valueExpenses" data-testid="value-input" />
        </div>
        <div>
          <textarea
            name="description"
            cols="30"
            rows="10"
            data-testid="description-input"
            value="This is a description."
          >
            ...
          </textarea>
        </div>
        <div>
          <select name="selectCurrencies" data-testid="currency-input">
            {
              currencies.map((obj, i) => (
                <option value={ obj } key={ i }>{ obj }</option>
              ))
            }
          </select>
        </div>
        <div>
          <select name="selectPayment" data-testid="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao-de-credito">Cartão de crédito</option>
            <option value="cartao-de-debito">Cartão de débito</option>
          </select>
        </div>
        <div>
          <select name="selectCategory" data-testid="tag-input">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
