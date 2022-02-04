import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { formataReal } from '../../../util/monetario';

export default function Leilao({ nome, valorInicial, lances, icone, cor }) {
  const estilos = funcaoEstilos(cor);
  let valorLance = valorInicial;
  let legendaLance = 'Valor Inicial';

  if (lances.length > 0) {
    const ultimoLance = lances[lances.length - 1];
    valorLance = ultimoLance.valor;
    legendaLance = "Melhor Lance";
  }

  return (
    <View style={estilos.cartao}>
      <View style={estilos.topo}>
        <FontAwesome5 name={icone || "question"} size={48} color="#ffffff" />
      </View>
      <View style={estilos.info}>
        <Text style={estilos.nome}>{nome}</Text>
        <View style={estilos.valor}>
          <Text style={estilos.legendaLance}>{legendaLance}</Text>
          <Text style={estilos.valorLance}>{formataReal(valorLance)}</Text>
        </View>
      </View>
    </View>
  );
}

const funcaoEstilos = (cor) => StyleSheet.create({
  cartao: {
    marginHorizontal: 16,
    marginVertical: 8,
    
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
  },
  topo: {
    backgroundColor: cor || '#093366',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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