import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icone from '../../../componentes/Icone';
import Cartao from '../../../componentes/Cartao';

import { formataReal } from '../../../util/monetario';

export default function Leilao({ id, nome, valorInicial, lances, icone, cor }) {
  const navigation = useNavigation();
  let valorLance = valorInicial;
  let legendaLance = 'Valor Inicial';

  if (lances.length > 0) {
    const ultimoLance = lances[lances.length - 1];
    valorLance = ultimoLance.valor;
    legendaLance = "Melhor Lance";
  }

  return (
    <Cartao 
      onPress={() => navigation.navigate('Leilao', { id })}
      style={estilos.cartao}
      Componente={TouchableOpacity}
    >
      <Icone cor={cor} nome={icone} style={estilos.topo} />
      <View style={estilos.info}>
        <Text style={estilos.nome}>{nome}</Text>
        <View style={estilos.valor}>
          <Text style={estilos.legendaLance}>{legendaLance}</Text>
          <Text style={estilos.valorLance}>{formataReal(valorLance)}</Text>
        </View>
      </View>
    </Cartao>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  topo: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  info: {
    padding: 8,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  nome: {
    fontSize: 18,
    color: '#4A4A4A',
  },
  valor: {
    alignItems: 'flex-end',
  },
  legendaLance: {
    fontSize: 14,
    color: '#4A4A4A',
  },
  valorLance: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
  }
});