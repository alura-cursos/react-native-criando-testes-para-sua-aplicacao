import { formataBrasileiroParaDecimal } from "../formatadores/moeda";

export function validaLance(valor, { lances, valorInicial }) {
  const retorno = {
    valido: false,
    erro: "Lance inválido",
  };
  
  try {
    const valorNumerico = formataBrasileiroParaDecimal(valor);
  
    // Validações de valor numérico

    if (!valor || !valorNumerico || valorNumerico <= 0) {
      retorno.erro = "Digite um valor numérico maior que zero";
      return retorno;
    }

    /* valor deve conter pelo menos um número na 
    frente e, opcionalmente, uma vírgula com um 
    ou dois números atrás */
    if (!valor.match(/^[0-9]+(\,[0-9]{1,2})?$/)) {
      retorno.erro = "Digite um valor numérico como: \"100\" ou \"99,99\"";
      return retorno;
    }

    // Validação de maior lance
  
    const maiorValor = !lances.find(lance => lance.valor >= valorNumerico);
    if (!maiorValor) {
      retorno.erro = "Lance menor que o maior lance já realizado";
      return retorno;
    }

    // Validação de primeiro lance

    if (valorNumerico < valorInicial) {
      retorno.erro = "Lance menor que o valor inicial";
      return retorno;
    }

  } catch (erro) {
    return retorno;
  }

  retorno.valido = true;
  return retorno;
}