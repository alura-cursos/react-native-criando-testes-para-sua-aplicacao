import { useState, useEffect } from 'react';
import apiLeiloes from '../servicos/apiLeiloes';

export default function useLeilao(id) {
  const [leilao, setLeilao] = useState({});

  const obterLeilao = async () => {
    const response = await apiLeiloes.get(`/leiloes/${id}`);
    setLeilao(response.data);
  };  

  useEffect(() => {
    obterLeilao();
  }, []);

  return { leilao, obterLeilao };
}