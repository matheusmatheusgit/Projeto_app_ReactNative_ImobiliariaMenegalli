// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ImovelListScreen from './src/screens/ImovelListScreen';
import ImovelDetailScreen from './src/screens/ImovelDetailScreen';
import ContactScreen from './src/screens/ContactScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ImovelList">
        <Stack.Screen
          name="ImovelList"
          component={ImovelListScreen}
          options={{ title: 'Imobiliária Menegalli - Imóveis em Piracicaba' }}
        />
        <Stack.Screen
          name="ImovelDetail"
          component={ImovelDetailScreen}
          options={{ title: 'Detalhes do Imóvel' }}
        />
        <Stack.Screen
          name="Contact"
          component={ContactScreen}
          options={{ title: 'Fale Conosco' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;