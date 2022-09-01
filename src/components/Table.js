import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteRow, walletExpenses } from '../redux/actions';

class Table extends Component {
  valorMoeda = (obj, condicao, chave) => {
    let res = Object.entries(obj).find((e) => e[0] === condicao);
    res = res[1][chave];
    return res;
  };

  linhaTabela = () => {
    const { expenses } = this.props;
    return expenses.map((e) => ([
      e.id,
      e.description,
      e.tag,
      e.method,
      Number(e.value).toFixed(2),
      this.valorMoeda(e.exchangeRates, e.currency, 'name'),
      Number(this.valorMoeda(e.exchangeRates, e.currency, 'ask')).toFixed(2),
      (Number(this.valorMoeda(e.exchangeRates, e.currency, 'ask'))
      * Number(e.value)).toFixed(2),
      'Real',
    ]));
  };

  removeLinha = ({ parentElement: { parentElement: { id } } }) => {
    const { dispatch, expenses } = this.props;
    const res = expenses.filter((e) => e.id !== Number(id));

    dispatch(deleteRow(res));
    dispatch(walletExpenses(res));
  };

  render() {
    const rowTable = this.linhaTabela();

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              rowTable.map((e) => (
                <tr key={ e[0] } id={ e[0] }>
                  <td>{ e[1] }</td>
                  <td>{ e[2] }</td>
                  <td>{ e[3] }</td>
                  <td>{ e[4] }</td>
                  <td>{ e[5] }</td>
                  <td>{ e[6] }</td>
                  <td>{ e[7] }</td>
                  <td>{ e[8] }</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ ({ target }) => this.removeLinha(target) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
