import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchCoins, fetchApi } from '../redux/actions';

const VALUES_INITIAL = ['Alimentação', 'Dinheiro', 'USD'];

class WalletForm extends Component {
  constructor(props) {
    super(props);

    const { expenses } = props;

    if (expenses.length > 0) {
      this.state = {
        id: expenses.reduce((acc, at) => (Number(at.id) > acc ? at.id : acc), 0) + 1,
        value: '',
        description: '',
        currency: VALUES_INITIAL[2],
        method: VALUES_INITIAL[1],
        tag: VALUES_INITIAL[0],
      };
    } else {
      this.state = {
        id: 0,
        value: '',
        description: '',
        currency: VALUES_INITIAL[2],
        method: VALUES_INITIAL[1],
        tag: VALUES_INITIAL[0],
      };
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoins());
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { dispatch } = this.props;
    dispatch(fetchApi(this.state));

    this.setState((state) => ({
      id: state.id + 1,
      value: '',
      description: '',
      currency: VALUES_INITIAL[2],
      method: VALUES_INITIAL[1],
      tag: VALUES_INITIAL[0],
    }));
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <form>
        <div>
          <label htmlFor="value">
            Valor:
            {' '}
            <input
              type="number"
              name="value"
              id="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Descrição:
            {' '}
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            >
              ...
            </textarea>
          </label>
        </div>
        <div>
          <label htmlFor="currency">
            Moeda:
            {' '}
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              { currencies.map((obj, i) => (
                <option value={ obj } key={ i } selected={ i === 0 }>
                  { obj }
                </option>
              )) }
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="method">
            Método:
            {' '}
            <select
              name="method"
              id="method"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ method }
            >
              <option value="Dinheiro" selected>Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="tag">
            Marcação:
            {' '}
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option value="Alimentação" selected>Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
        <div>
          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
