import { useState, useEffect } from 'react';
import { obterLeiloes } from '../repositorio/leilao';

export default function useListaLeiloes() {
  const [leiloes, setLeiloes] = useState([]);

  const atualizaLeiloes = async () => {
    const leiloesAtualizados = await obterLeiloes();
    setLeiloes(leiloesAtualizados);
  };

  useEffect(() => {
    atualizaLeiloes();
  }, []);

  return [ leiloes, atualizaLeiloes ];
}