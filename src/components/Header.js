import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, totalExpenses } = this.props;
    return (
      <header>
        <div><h2>TrybeWallet</h2></div>
        <div>
          <span data-testid="email-field">{ email }</span>
        </div>
        <div>
          Despesas: R$
          {' '}
          <span data-testid="total-field">{ totalExpenses }</span>
          {' '}
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
