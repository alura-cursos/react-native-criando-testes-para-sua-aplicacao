import { useState, useEffect } from 'react';
import { obtemLeiloes } from '../repositorio/leilao';

export default function useListaLeiloes() {
  const [leiloes, setLeiloes] = useState([]);

  const atualizaLeiloes = async () => {
    const leiloesAtualizados = await obtemLeiloes();
    setLeiloes(leiloesAtualizados);
  };

  useEffect(() => {
    atualizaLeiloes();
  }, []);

  return [ leiloes, atualizaLeiloes ];
}