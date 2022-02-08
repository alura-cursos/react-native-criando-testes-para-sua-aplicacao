import { useState, useEffect } from 'react';
import { obterLeilao, mudarLeilao } from '../repositorio/leilao';
import { validaLance } from '../negocio/validadores/lance';
import { formataLeilaoComNovoLance } from '../negocio/formatadores/lance';

export default function useLeilao(id) {
  const [leilao, setLeilao] = useState({});

  const atualizaLeilao = async () => {
    const leilaoAtualizado = await obterLeilao(id);
    setLeilao(leilaoAtualizado);
  };
  
  const enviarLance = async (valor) => {
    const estadoLance = validaLance(valor, leilao);
    if (!estadoLance.valido)
      return estadoLance;

    const novoLeilao = formataLeilaoComNovoLance(valor, leilao);

    const mudado = await mudarLeilao(novoLeilao);
    if (mudado) {
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

  return [ leilao, atualizaLeilao, enviarLance ];
}

