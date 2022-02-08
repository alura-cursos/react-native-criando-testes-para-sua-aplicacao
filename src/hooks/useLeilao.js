import { useState, useEffect } from 'react';
import { obtemLeilao } from '../repositorio/leilao';
import { adicionaLance, obtemLancesDoLeilao } from '../repositorio/lance';
import { validaLance } from '../negocio/validadores/lance';
import { formataBrasileiroParaDecimal } from '../negocio/formatadores/moeda';

export default function useLeilao(id) {
  const [leilao, setLeilao] = useState({});

  const atualizaLeilao = async () => {
    const leilaoAtualizado = await obtemLeilao(id);
    const lancesAtualizados = await obtemLancesDoLeilao(id);
    setLeilao({ ...leilaoAtualizado, lances: lancesAtualizados });
  };
  
  const enviaLance = async (valor) => {
    const estadoLance = validaLance(valor, leilao);
    if (!estadoLance.valido)
      return estadoLance;

    const lanceFormatado = { 
      valor: formataBrasileiroParaDecimal(valor), 
      leilaoId: leilao.id 
    };

    const adicionado = await adicionaLance(lanceFormatado);
    if (adicionado) {
      atualizaLeilao();
      return estadoLance;
    }

    return {
      valido: false,
      erro: "Servidor indisponível",
    };
  };

  useEffect(() => {
    atualizaLeilao();
  }, []);

  return [ leilao, atualizaLeilao, enviaLance ];
}

