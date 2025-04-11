import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import HomePage from './pages/HomePage';
import CongratulationsPage from './pages/CongratulationsPage';
import ChatPage from './pages/ChatPage';
import NewChatPage from './pages/NewChatPage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={NewChatPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatPage"
          component={ChatPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CongratulationsPage"
          component={CongratulationsPage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
