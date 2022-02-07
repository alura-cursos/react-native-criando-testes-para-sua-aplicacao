import React from 'react';

import { Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Cartao from '../../../componentes/Cartao';

import { formataReal } from '../../../util/monetario';

export default function Lance({ valor, cor }) {
  return <Cartao style={estilos.cartao}>
    <FontAwesome5 name="hand-paper" size={24} color={cor} />
    <Text style={estilos.lance}>{formataReal(valor)}</Text>
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
  lance: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});
