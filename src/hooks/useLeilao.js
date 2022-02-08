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
    if (!validaLance(valor, leilao))
      return false;

    const novoLeilao = formataLeilaoComNovoLance(valor, leilao);

    const mudado = await mudarLeilao(novoLeilao);
    if (mudado)
      atualizaLeilao();

    return mudado;
  };

  useEffect(() => {
    atualizaLeilao();
  }, []);

  return [ leilao, atualizaLeilao, enviarLance ];
}

