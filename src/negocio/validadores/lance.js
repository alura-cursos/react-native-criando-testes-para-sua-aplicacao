import { formataBrasileiroParaDecimal } from "../formatadores/moeda";

export function validaLance(valor, { lances, valorInicial }) {
  try {
    const valorNumerico = formataBrasileiroParaDecimal(valor);
  
    if (!valor || !valorNumerico)
      return false;
    
    if (valorNumerico < valorInicial)
      return false;

    if (valorNumerico <= 0)
      return false;

    /* valor deve conter pelo menos um número na 
    frente e, opcionalmente, uma vírgula com um 
    ou dois números atrás */
    if (!valor.match(/([0-9]+)((\,[0-9]{1,2})?)/))
      return false;
  
    const maiorValor = !lances.find(lance => lance.valor >= valorNumerico);
    if (!maiorValor)
      return false;

  } catch (erro) {
    return false;
  }

  return true;
}