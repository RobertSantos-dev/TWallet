import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import WalletFormEdict from '../components/WalletFormEdict';

class Wallet extends React.Component {
  render() {
    const { editor } = this.props;

    return (
      <main>
        <Header />
        {editor ? <WalletFormEdict /> : <WalletForm />}
        <Table />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  editor: state.wallet.editor,
});

Wallet.propTypes = {
  editor: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Wallet);
