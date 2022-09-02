import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { editaLinha, removeLinha, linhaTabela, titulos } from '../services/functionTable';

class Table extends Component {
  render() {
    const { dispatch, expenses } = this.props;
    const rowTable = linhaTabela(expenses);

    return (
      <div>
        <table>
          <thead>
            <tr>{ titulos.map((e, i) => <th key={ i }>{ e }</th>) }</tr>
          </thead>
          <tbody>
            { rowTable.map((e) => (
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
                    data-testid="edit-btn"
                    onClick={ ({ target }) => editaLinha(target, dispatch) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ ({ target }) => removeLinha(target, dispatch, expenses) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
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
