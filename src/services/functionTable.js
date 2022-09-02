import { deleteRow, walletExpenses, editorRow, editorRowObject } from '../redux/actions';
// import store from '../redux/store';

const valorMoeda = (obj, condicao, chave) => {
  let res = Object.entries(obj).find((e) => e[0] === condicao);
  res = res[1][chave];
  return res;
};

export const titulos = [
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

export const linhaTabela = (expenses) => expenses.map((e) => ([
  e.id,
  e.description,
  e.tag,
  e.method,
  Number(e.value).toFixed(2),
  valorMoeda(e.exchangeRates, e.currency, 'name'),
  Number(valorMoeda(e.exchangeRates, e.currency, 'ask')).toFixed(2),
  (Number(valorMoeda(e.exchangeRates, e.currency, 'ask')) * Number(e.value)).toFixed(2),
  'Real',
]));

export const removeLinha = (element, dispatch, expenses) => {
  const { parentElement: { parentElement: { id } } } = element;
  const res = expenses.filter((e) => e.id !== Number(id));

  dispatch(deleteRow(res));
  dispatch(walletExpenses(res));
};

export const editaLinha = (element, dispatch) => {
  const { parentElement: { parentElement: { id } } } = element;

  dispatch(editorRowObject(Number(id)));
  dispatch(editorRow(true));
};
