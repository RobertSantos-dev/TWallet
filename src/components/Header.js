import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, idToEdit } = this.props;
    return (
      <header>
        <div><h2>TrybeWallet</h2></div>
        <div>
          <span data-testid="email-field">{ email }</span>
        </div>
        <div>
          Despesas: R$
          {' '}
          <span data-testid="total-field">{ idToEdit }</span>
          {' '}
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  idToEdit: state.wallet.idToEdit,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
