import React from 'react';

import { View, StyleSheet } from 'react-native';

export default function Cartao({ children, style, Componente = View, ...props }) {
  return <Componente style={[estilos.cartao, style]} {...props}>
    {children}
  </Componente>
}

const estilos = StyleSheet.create({
  cartao: {
    borderRadius: 10,

    backgroundColor: '#fff',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  }
});