import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TelaInicial from './src/Screens/TelaInicial';
import TelaLogin from './src/Screens/TelaLogin';
import TelaCadastroU from './src/Screens/TelaCadastroU';
import TelaADM from './src/Screens/TelaADM';
import TelaUsuario from './src/Screens/TelaUsuario';
import TelaSocorrista from './src/Screens/TelaSocorrista';

import Header from './src/Components/Header';
import CustomDrawerContent from './src/Components/CustomDrawerContent';
import TelaMensagens from './src/Screens/TelaMensagensADM';
import TelaInfosUs from './src/Screens/TelaInfosUs';
import TelaInfosSen from './src/Screens/TelaInfosSen';
import TelaListaAvisos from './src/Screens/TelaListaAvisos';

const Drawer = createDrawerNavigator();

export default function App() {
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDrawerScreens = (userType) => {
    const screens = [
      { name: 'TelaInicial', component: TelaInicial },
      { name: 'TelaLogin', component: (props) => <TelaLogin {...props} setUserType={setUserType} /> },
      { name: 'TelaCadastroU', component: TelaCadastroU },
    ];

    if (userType === 'admin') {
      screens.push({ name: 'TelaADM', component: TelaADM });
      screens.push({name: 'TelaMensagensADM', component: TelaMensagens});
      screens.push({name: 'TelaInfosUs', component: TelaInfosUs});
      screens.push({name: 'TelaInfosSen', component: TelaInfosSen});
    }
    if (userType === 'user') {
      screens.push({ name: 'TelaUsuario', component: TelaUsuario });
      screens.push({ name: 'TelaListaAvisos', component: TelaListaAvisos });
      screens.push({name: 'TelaMensagensADM', component: TelaMensagens});
    }
    if (userType === 'bombeiro') {
      screens.push({ name: 'TelaSocorrista', component: TelaSocorrista });
    }

  

    return screens;
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const perfil = await AsyncStorage.getItem('perfil');
        if (perfil) {
          setUserType(perfil);
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6db913" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => (
          <CustomDrawerContent {...props} userType={userType} setUserType={setUserType} />
        )}
        screenOptions={({ navigation }) => ({
          header: () => <Header navigation={navigation} userType={userType} />,
        })}
        initialRouteName="TelaInicial"
      >
        {getDrawerScreens(userType).map((screen) => (
          <Drawer.Screen key={screen.name} name={screen.name} component={screen.component} />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
