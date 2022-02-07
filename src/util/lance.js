export function validaLance(valor, { lances, valorInicial }) {
  try {
    const valorNumerico = parseFloat(formataLance(valor));
  
    if (!valorNumerico)
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
  
    if (lances.length > 0) {
      if (valorNumerico <= lances[lances.length - 1].valor) {
        return false;
      }
    }
  } catch (erro) {
    return false;
  }

  return true;
}

export function adicionaLance(valor, leilao) {
  const valorNumerico = parseFloat(formataLance(valor));

  const lance = {
    id: leilao.lances.length + 1,
    valor: valorNumerico,
  };

  leilao.lances.push(lance);
}

export function formataLance(valor) {
  return valor.replace('.', '').replace(',', '.');
}