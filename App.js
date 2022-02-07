import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import AppRotas from './src/rotas/AppRotas';

export default function App() {
  return (
    <SafeAreaView style={estilos.container}>
      <StatusBar />
      <AppRotas />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  }
});