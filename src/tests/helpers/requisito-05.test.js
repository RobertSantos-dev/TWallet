import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouterAndRedux from './renderWith';
import mockData from './mockData';

import App from '../../App';
import WalletForm from '../../components/WalletForm';
import Header from '../../components/Header';

describe('Testes para obter no minimo 60% de corbetura', () => {
  const EMAIL_USER = 'robert@email.com';

  test('01 - Testanto o componente Login, para saber de existe elemetos', () => {
    renderWithRouterAndRedux(<App />);
    const labelEmail = screen.getByLabelText(/email/i);
    const labelPassword = screen.getByLabelText(/password/i);
    const btn = screen.getByRole('button', { name: /entrar/i });

    expect(labelEmail).toBeInTheDocument();
    expect(labelPassword).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  test('02 - Testanto cliques e mudança de rota', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const labelEmail = screen.getByLabelText(/email/i);
    const labelPassword = screen.getByLabelText(/password/i);
    const btn = screen.getByRole('button', { name: /entrar/i });

    expect(labelEmail).toBeInTheDocument();
    expect(labelPassword).toBeInTheDocument();
    expect(btn).toBeInTheDocument();

    userEvent.type(labelEmail, EMAIL_USER);
    userEvent.type(labelPassword, '123321');
    userEvent.click(btn);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  test('03 - Testanto se é visivel as labels no component WalletForm', () => {
    const labelsText = ['Valor:', 'Descrição:', 'Moeda:', 'Método:', 'Marcação:'];
    renderWithRouterAndRedux(<WalletForm />);

    labelsText.forEach((e) => {
      const spaces = screen.getByLabelText(e);
      expect(spaces).toBeInTheDocument();
    });
  });

  test('04 - Testanto se é visivel um header com o email salvo', () => {
    renderWithRouterAndRedux(
      <Header />,
      { initialState: { user: { email: EMAIL_USER } } },
    );

    const emailText = screen.getByText(/@email/i);
    expect(emailText).toBeInTheDocument();
  });

  test('05 - Testanto se uma api é chamada', () => {
    global.fetch = async () => ({
      json: async () => mockData,
    });

    renderWithRouterAndRedux(<App />);

    const labelEmail = screen.getByLabelText(/email/i);
    const labelPassword = screen.getByLabelText(/password/i);
    const btn = screen.getByRole('button', { name: /entrar/i });

    expect(labelEmail).toBeInTheDocument();
    expect(labelPassword).toBeInTheDocument();
    expect(btn).toBeInTheDocument();

    userEvent.type(labelEmail, EMAIL_USER);
    userEvent.type(labelPassword, '123321');
    userEvent.click(btn);

    expect(global.fetch).toBeCalledTimes(1);
  });
});
