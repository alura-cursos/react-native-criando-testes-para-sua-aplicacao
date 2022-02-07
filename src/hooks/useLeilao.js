import { useState, useEffect } from 'react';
import apiLeiloes from '../servicos/apiLeiloes';
import { validaLance, adicionaLance } from '../util/lance';

export default function useLeilao(id) {
  const [leilao, setLeilao] = useState({});

  const obterLeilao = async () => {
    try {
      const resposta = await apiLeiloes.get(`/leiloes/${id}`);
      setLeilao(resposta.data);
    } catch(erro) {
      setLeilao({});
      console.log(erro, id);
    }
  };
  
  const enviarLance = async (valor) => {
    if (!validaLance(valor, leilao))
      return false;

    adicionaLance(valor, leilao);

    try {
      const resposta = await apiLeiloes.put(`/leiloes/${id}`, { leilao });
      console.log(resposta);
      obterLeilao();
      return true;
    } catch(erro) {
      return false;
    }
  };

  useEffect(() => {
    obterLeilao();
  }, []);

  return [ leilao, obterLeilao, enviarLance ];
}
