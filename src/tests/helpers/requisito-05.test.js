import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouterAndRedux from './renderWith';
import mockData from './mockData';

import App from '../../App';
import WalletForm from '../../components/WalletForm';
import Header from '../../components/Header';
import Table from '../../components/Table';

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

  test('05 - Testanto se uma api é chamada', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    const eventos = [EMAIL_USER, '123321'];

    renderWithRouterAndRedux(<App />);

    const labels = [
      screen.getByLabelText(/email/i),
      screen.getByLabelText(/password/i),
      screen.getByRole('button', { name: /entrar/i }),
    ];

    labels.forEach((e) => {
      expect(e).toBeInTheDocument();
    });
    eventos.forEach((e, i) => {
      userEvent.type(labels[i], e);
    });
    userEvent.click(labels[2]);

    const element = await screen.findByLabelText(/moeda/i);
    expect(global.fetch).toBeCalledTimes(1);
    expect(element).toBeInTheDocument();
  });

  test('06 - Testanto se existem os campos da tabela', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    renderWithRouterAndRedux(
      <Table />,
      { initialState: { wallet: {
        currencies: Object.keys(mockData).filter((e) => e !== 'USDT'),
        expenses: [{
          id: 0,
          value: '125',
          description: 'Meus testes',
          currency: 'EUR',
          method: 'Cartão de débito',
          tag: 'Trabalho',
          exchangeRates: mockData,
        }],
        editor: false,
        idToEdit: '650.95',
      } } },
    );

    const elementText = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];

    elementText.forEach((e) => {
      const element = screen.getByText(e);
      expect(element).toBeInTheDocument();
    });
  });
});
