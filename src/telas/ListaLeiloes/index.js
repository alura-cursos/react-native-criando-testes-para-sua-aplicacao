import React, { useState } from 'react';
import useListaLeiloes from '../../hooks/useListaLeiloes';

import { View, FlatList, StyleSheet } from 'react-native';
import Leilao from './componentes/Leilao';

export default function ListaLeiloes() {
  const [leiloes, obtemLeiloes] = useListaLeiloes();
  const [carregando, setCarregando] = useState(false);
  
  const atualizaLista = async () => {
    setCarregando(true);
    await obtemLeiloes();
    setCarregando(false);
  };

  return (
    <FlatList
      data={leiloes}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <Leilao {...item} />}
      onRefresh={atualizaLista}
      refreshing={carregando}
      contentContainerStyle={estilos.lista}
    />
  );
}

const estilos = StyleSheet.create({
  lista: {
    paddingVertical: 8,
  },
});
