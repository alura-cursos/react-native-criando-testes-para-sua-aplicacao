import React from 'react';

import { Text, View, StyleSheet } from 'react-native';
import Icone from '../../../componentes/Icone';

import { formataDecimalParaReal } from '../../../negocio/formatadores/moeda';
import { formataMaiorLanceDoLeilao } from '../../../negocio/formatadores/lance';

export default function Topo({ nome, descricao, lances, valorInicial, cor, icone }) {
  const maiorLance = formataMaiorLanceDoLeilao(lances, valorInicial);

  return <>
    <Icone cor={cor} nome={icone} style={estilos.topo} />
    <View style={estilos.info}>
      <Text style={estilos.nome}>{nome}</Text>
      <Text style={estilos.descricao}>{descricao}</Text>
      <View style={estilos.resumo}>
        <View style={estilos.melhorLance} accessibilityHint="Melhor Lance">
          <Text style={estilos.legendaLance}>Melhor Lance</Text>
          <Text style={estilos.valorLance}>{formataDecimalParaReal(maiorLance)}</Text>
        </View>
        <View style={estilos.divisor} />
        <View style={estilos.lanceInicial} accessibilityHint="Valor Inicial">
          <Text style={estilos.legendaLance}>Valor Inicial</Text>
          <Text style={estilos.valorLance}>{formataDecimalParaReal(valorInicial)}</Text>
        </View>
      </View>
    </View>
  </>    
}

const estilos = StyleSheet.create({
  topo: {
    paddingTop: 48,
    paddingBottom: 48 + 24,
  },
  info: {
    flex: 1,
    marginTop: -24,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,

    marginBottom: 8,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  descricao: {
    fontSize: 16,
    marginTop: 8,
    color: '#4A4A4A',
  },
  resumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',

    borderRadius: 8,
    
    backgroundColor: '#F3F2F2',

    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 16,
  },
  legendaLance: {
    fontSize: 14,
    color: '#4A4A4A',
  },
  valorLance: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  divisor: {
    width: 1,
    backgroundColor: '#e6e6e6',
  },
  lanceInicial: {
    alignItems: 'flex-end',
  },
});