import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import AppRotas from './src/rotas/AppRotas';

export default function App() {
  return (
    <SafeAreaView style={estilos.container}>
      <StatusBar />
      <KeyboardAvoidingView 
        style={estilos.teclado}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 45}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <AppRotas />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
  teclado: {
    flex: 1,
  },
});