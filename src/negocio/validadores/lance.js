import {
  VALIDO,
  INVALIDO,
  MENOR_QUE_VALOR_INICIAL,
  MENOR_QUE_LANCES
} from "../constantes/estadosLance";

export function validaFormatoNumericoDoLance(valorEmTexto) {
  if (valorEmTexto.match(/^[1-9]+[0-9]*(\,[0-9]{1,2})?$/)) {
    return VALIDO;
  }

  return INVALIDO;
}

export function validaLance(valor, { lances, valorInicial }) {
  const lanceMaiorQueInicial = validaLanceMaiorQueInicial(valor, valorInicial);
  
  if(lanceMaiorQueInicial === VALIDO) {
    return validaLanceMaiorQueLances(valor, lances);
  }

  return lanceMaiorQueInicial;
}

function validaLanceMaiorQueInicial(valor, valorInicial) {
  if (valor > valorInicial) {
    return VALIDO;
  }

  return MENOR_QUE_VALOR_INICIAL;
}

function validaLanceMaiorQueLances(valor, lances) {
  const lanceMaiorQueValor = lances.find(lance => lance.valor >= valor);
  if (!lanceMaiorQueValor) {
    return VALIDO;
  }

  return MENOR_QUE_LANCES;
}
