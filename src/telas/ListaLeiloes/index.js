import React, { useState } from 'react';
import useListaLeiloes from '../../hooks/useListaLeiloes';

import { View, FlatList, StyleSheet } from 'react-native';
import Leilao from './componentes/Leilao';

export default function ListaLeiloes() {
  const [leiloes, obterLeiloes] = useListaLeiloes();
  const [carregando, setCarregando] = useState(false);
  
  const atualizaLista = async () => {
    setCarregando(true);
    await obterLeiloes();
    setCarregando(false);
  };

  if (!leiloes || leiloes.length === 0) {
    return <View />
  }

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
