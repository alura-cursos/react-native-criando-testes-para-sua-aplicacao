import { useState, useEffect } from 'react';
import apiLeiloes from '../servicos/apiLeiloes';

export default function useListaLeiloes() {
  const [leiloes, setLeiloes] = useState([]);

  const obterLeiloes = async () => {
    try {
      const resposta = await apiLeiloes.get(`/leiloes`);
      setLeiloes(resposta.data);
    } catch (erro) {
      setLeiloes([]);
    }
  };  

  useEffect(() => {
    obterLeiloes();
  }, []);

  return [ leiloes, obterLeiloes ];
}