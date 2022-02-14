export function formataDecimalParaReal(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}

export function formataBrasileiroParaDecimal(valor) {
  const pontuacaoAjustada = valor.replace('.', '').replace(',', '.');
  return parseFloat(pontuacaoAjustada);
}