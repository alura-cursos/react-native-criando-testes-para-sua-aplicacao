export function validaLance(valor, { lances, valorInicial }) {
  try {
    const valorNumerico = parseFloat(valor);
  
    if (!valorNumerico)
      return false;
    
    if (valorNumerico < valorInicial)
      return false;

    if (valorNumerico <= 0)
      return false;

    if (valorNumerico != valor)
      return false;
  
    if (lances.length > 0) {
      if (valorNumerico <= lances[lances.length - 1].valorNumerico) {
        return false;
      }
    }
  } catch (erro) {
    return false;
  }

  return true;
}

export function adicionaLance(valor, leilao) {
  const valorNumerico = parseFloat(valor);

  const lance = {
    id: leilao.lances.length,
    valor: valorNumerico,
  };

  leilao.lances.push(lance);
}