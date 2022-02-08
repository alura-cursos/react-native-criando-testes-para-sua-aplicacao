import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icone from '../../../componentes/Icone';
import Cartao from '../../../componentes/Cartao';

import { formataDecimalParaReal } from '../../../negocio/formatadores/moeda';

export default function Leilao({ id, nome, valorInicial, icone, cor }) {
  const navigation = useNavigation();

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
          <Text style={estilos.legendaLance}>Valor Inicial</Text>
          <Text style={estilos.valorLance}>{formataDecimalParaReal(valorInicial)}</Text>
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