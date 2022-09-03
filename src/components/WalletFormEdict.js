import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchCoins, deleteRow, editorRow, walletExpenses } from '../redux/actions';

class WalletFormEdict extends Component {
  constructor(props) {
    super(props);
    const { expenses, idToEdit } = props;

    const obj = expenses.find((e) => e.id === idToEdit);

    this.state = {
      id: idToEdit,
      value: obj.value,
      currency: obj.currency,
      method: obj.method,
      tag: obj.tag,
      description: obj.description,
    };

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
    const { dispatch, expenses, idToEdit } = this.props;
    const { id, value, description, currency, method, tag } = this.state;

    const res = expenses.map((e) => {
      if (e.id === idToEdit) {
        const { exchangeRates } = e;
        return {
          id, value, description, currency, method, tag, exchangeRates,
        };
      }
      return e;
    });
    dispatch(deleteRow(res));
    dispatch(editorRow(false));
    dispatch(walletExpenses(res));
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
              required
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
          <button type="button" onClick={ this.handleClick }>Editar despesa</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  currencies: state.wallet.currencies,
});

WalletFormEdict.propTypes = {
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletFormEdict);
