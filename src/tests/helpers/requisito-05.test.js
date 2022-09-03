import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouterAndRedux from './renderWith';
import mockData from './mockData';

import App from '../../App';
import WalletForm from '../../components/WalletForm';
import Header from '../../components/Header';
import Table from '../../components/Table';
// import WalletFormEdict from '../../components/WalletFormEdict';

describe('Testes para obter no minimo 60% de corbetura', () => {
  const EMAIL_USER = 'robert@email.com';
  const PASSWORD_USER = '123321';
  const botoes = ['Adicionar despesa', 'Editar', 'Excluir'];
  const labelsText = ['Valor:', 'Descrição:', 'Moeda:', 'Método:', 'Marcação:'];
  const eventos = [EMAIL_USER, PASSWORD_USER];
  const preenchimento = ['120.00', 'cento e vinte', 'USD', 'Cartão de débito', 'Trabalho'];

  afterEach(() => jest.clearAllMocks());

  test('01 - Testanto rota Home', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

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
    userEvent.type(labelPassword, PASSWORD_USER);
    userEvent.click(btn);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  test('03 - Testanto se é visivel as labels no component WalletForm', () => {
    renderWithRouterAndRedux(<WalletForm />);

    labelsText.forEach((e) => {
      const spaces = screen.getByLabelText(e);
      expect(spaces).toBeInTheDocument();
    });
  });

  test('04 - Testanto se é apagado os textos das labels do componente WalletForm', () => {
    renderWithRouterAndRedux(<WalletForm />);

    const button = screen.getByRole('button', { name: botoes[0] });
    labelsText.forEach((e, i) => {
      const spaces = screen.getByLabelText(e);
      userEvent.type(spaces, preenchimento[i]);
    });
    userEvent.click(button);

    const res = ['', '', '', 'Dinheiro', 'Alimentação'];
    labelsText.forEach((e, i) => {
      const spaces = screen.getByLabelText(e);
      expect(spaces.value).toBe(res[i]);
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

  test('04 - Testanto se é visivel um header com total de despesas', () => {
    renderWithRouterAndRedux(
      <Header />,
      { initialState: { wallet: { totalExpenses: '510.00' } } },
    );

    const despesas = screen.getByText(/510/i);
    expect(despesas).toBeInTheDocument();
  });

  test('05 - Testanto se uma api é chamada', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

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
    renderWithRouterAndRedux(<Table />);

    const elementText = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
    ];

    elementText.forEach((e) => {
      const element = screen.getByText(e);
      expect(element).toBeInTheDocument();
    });
  });

  test('07 - Testanto se existem os campos de preenchimento do formulário', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    renderWithRouterAndRedux(<App />);

    const labels = [
      screen.getByLabelText(/email/i),
      screen.getByLabelText(/password/i),
      screen.getByRole('button', { name: /entrar/i }),
    ];

    eventos.forEach((e, i) => {
      userEvent.type(labels[i], e);
    });
    userEvent.click(labels[2]);

    labelsText.forEach((e) => {
      const element = screen.getByLabelText(e);
      expect(element).toBeInTheDocument();
    });
    const btn = screen.getByRole('button', { name: botoes[0] });
    expect(btn).toBeInTheDocument();

    labelsText.forEach((e, i) => {
      const element = screen.getByLabelText(e);
      userEvent.type(element, preenchimento[i]);
    });
    userEvent.click(btn);

    expect(await screen.findByText(preenchimento[0])).toBeInTheDocument();
    preenchimento.slice(1).forEach((e) => {
      const element = screen.getByText(e);
      expect(element).toBeInTheDocument();
    });

    const despesaT = Number(preenchimento[0]) * Number(mockData[preenchimento[2]].ask);
    const despesa = screen.getByText(despesaT.toFixed(2));
    expect(despesa).toBeInTheDocument(despesaT);

    const real = screen.getAllByText(/real/i);
    const dolar = screen.getByText(/dólar/i);
    expect(real[0]).toBeInTheDocument();
    expect(dolar).toBeInTheDocument();

    const btnTableEditar = screen.queryByRole('button', { name: /Editar/i });
    const btnTableExcluir = screen.queryByRole('button', { name: /Excluir/i });
    expect(btnTableEditar).toBeInTheDocument();
    expect(btnTableExcluir).toBeInTheDocument();

    userEvent.click(btnTableEditar);

    const editaDespesa = screen.getByText(/editar despesa/i);
    expect(editaDespesa).toBeInTheDocument();
    userEvent.click(editaDespesa);
    expect(editaDespesa).not.toBeInTheDocument();
  });
});
