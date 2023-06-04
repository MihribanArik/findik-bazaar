import React, { useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';

//ekranlar
import Welcome from './views/Welcome';
import Login from './views/Login';
import Register from './views/Register';
import HomeCiftci from './views/ciftci/HomeCiftci';
import HomeMusteri from './views/musteri/HomeMusteri';
import ZiraiDestek from './views/ZiraiDestek';

const Stack = createStackNavigator();

export default function App() {

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        'Poppins-Regular': require('./assets/Poppins-Regular.ttf'),
      });
    })();
  }, []);
  
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome"
        screenOptions={{
          headerShown: false, 
          gestureEnabled: false,
          ...TransitionPresets.ModalTransition, // Özelleştirilmiş geçiş animasyonu
        }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="HomeCiftci" component={HomeCiftci}/>
          <Stack.Screen name="HomeMusteri" component={HomeMusteri}/>
          <Stack.Screen name='ZiraiDestek' component={ZiraiDestek}/>
        </Stack.Navigator>

      </NavigationContainer>
    </NativeBaseProvider>
  );
}

