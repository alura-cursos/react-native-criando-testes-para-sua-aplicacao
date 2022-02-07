import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';
import ListaLeiloes from '../telas/ListaLeiloes';
import Leilao from '../telas/Leilao';

const Stack = createNativeStackNavigator();

export default function AppRotas() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="ListaLeiloes"
          component={ListaLeiloes}
          options={{
            title: 'Lista de Leilões',
          }}
        />
        <Stack.Screen 
          name="Leilao"
          component={Leilao}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}