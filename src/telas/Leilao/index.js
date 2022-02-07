import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import useLeilao from '../../hooks/useLeilao';

import { Text, FlatList, View, StyleSheet } from 'react-native';
import Topo from './componentes/Topo';
import Lance from './componentes/Lance';
import EnviaLance from './componentes/EnviaLance';

export default function Leilao() {
  const route = useRoute();
  const [carregando, setCarregando] = useState(false);

  const id = route.params.id;
  const [ leilao, obterLeilao, enviarLance ] = useLeilao(id);
  
  const atualizaLeilao = async () => {
    setCarregando(true);
    await obterLeilao();
    setCarregando(false);
  };

  if (!leilao.nome) {
    return <View />
  }

  return <>
    <FlatList
      data={leilao.lances}
      keyExtractor={(leilao) => leilao.id}
      renderItem={({ item }) => <Lance {...item} cor={leilao.cor} />}
      ListHeaderComponent={() => <Topo {...leilao} />}
      onRefresh={atualizaLeilao}
      refreshing={carregando}
    />
    <EnviaLance cor={leilao.cor} enviarLance={enviarLance} />
  </>
}
