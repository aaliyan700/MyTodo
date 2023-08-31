import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import AddProduct from './Screens/AddProduct';
import ViewProduct from './Screens/ViewProduct';
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}

        />
        <Stack.Screen
          name="ViewProduct"
          component={ViewProduct}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;