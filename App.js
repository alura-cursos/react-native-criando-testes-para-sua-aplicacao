import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import ListaLeiloes from './src/telas/ListaLeiloes';

export default function App() {
  return (
    <SafeAreaView style={estilos.container}>
      <StatusBar />
      <ListaLeiloes />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  }
});