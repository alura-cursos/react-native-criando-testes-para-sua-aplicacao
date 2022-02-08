import { formataBrasileiroParaDecimal } from "./moeda";

export function formataLeilaoComNovoLance(valor, leilao) {
  const valorNumerico = formataBrasileiroParaDecimal(valor);

  const lance = {
    id: leilao.lances.length + 1,
    valor: valorNumerico,
  };

  const novoLeilao = {
    ...leilao,
    lances: [lance, ...leilao.lances],
  }

  return novoLeilao;
}