import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Cartao from '../../../componentes/Cartao';

import { formataDecimalParaReal } from '../../../negocio/formatadores/moeda';

export default function Lance({ id, valor, cor }) {
  return <Cartao style={estilos.cartao}>
    <View style={estilos.inicio}>
      <FontAwesome5 name="hand-paper" size={24} color={cor} />
      <Text style={estilos.identificador}>#{id}</Text>
    </View>
    <Text style={estilos.lance}>{formataDecimalParaReal(valor)}</Text>
  </Cartao>

}

const estilos = StyleSheet.create({
  cartao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 16,

    marginHorizontal: 16,
    marginVertical: 8,
  },
  inicio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  identificador: {
    fontSize: 14,
    marginLeft: 8,
    color: '#4A4A4A',
  },
  lance: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
  }
});
