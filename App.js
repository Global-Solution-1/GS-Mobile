import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import Header from './src/Components/Header';
import TelaInicial from './src/Screens/TelaInicial';
import TelaLogin from './src/Screens/TelaLogin';
import TelaCadastroU from './src/Screens/TelaCadastroU';
import TelaADM from './src/Screens/TelaADM';
import TelaUsuario from './src/Screens/TelaUsuario';
import TelaBombeiro from './src/Screens/TelaBombeiro';
import TelaInfosSen from './src/Screens/TelaInfosSen';
import TelaInfosUs from './src/Screens/TelaInfosUs';
import TelaMensagens from './src/Screens/TelaMensagensADM';
import TelaListaAvisos from './src/Screens/TelaListaAvisos';
import TelaGerenciamento from './src/Screens/TelaGerenciamento';
import TelaListaAlertas from './src/Screens/TelaListaAlertas';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <View style={styles.userIconContainer}>
          <Ionicons name="person" size={48} color="white" />
        </View>
        <Text style={styles.drawerTitle}>Visitante</Text>
      </View>

      <DrawerItem
        label="Início"
        icon={() => (
          <Ionicons name="earth-outline" size={24} color="#6db913" style={{ marginRight: 10 }} />
        )}
        onPress={() => navigation.navigate('TelaInicial')}
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
      />

      <DrawerItem
        label="Tela ADM"
        icon={() => (
          <Ionicons name="earth-outline" size={24} color="#6db913" style={{ marginRight: 10 }} />
        )}
        onPress={() => navigation.navigate('TelaADM')}
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
      />

      <DrawerItem
        label="Tela Usuario"
        icon={() => (
          <Ionicons name="earth-outline" size={24} color="#6db913" style={{ marginRight: 10 }} />
        )}
        onPress={() => navigation.navigate('TelaUsuario')}
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
      />

      <DrawerItem
        label="Tela Bombeiro"
        icon={() => (
          <Ionicons name="earth-outline" size={24} color="#6db913" style={{ marginRight: 10 }} />
        )}
        onPress={() => navigation.navigate('TelaBombeiro')}
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
      />

      <DrawerItem
        label="Sensores"
        icon={() => (
          <Ionicons name="options-outline" size={24} color="#6db913" style={{ marginRight: 10 }} />
        )}
        onPress={() => navigation.navigate('TelaInfosSen')}
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
      />

      <DrawerItem
        label="Usuarios"
        icon={() => (
          <Ionicons name="person-outline" size={24} color="#6db913" style={{ marginRight: 10 }} />
        )}
        onPress={() => navigation.navigate('TelaInfosUs')}
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
      />

      <DrawerItem
        label="Mensagens"
        icon={() => (
          <Ionicons name="mail-outline" size={24} color="#6db913" style={{ marginRight: 10 }} />
        )}
        onPress={() => navigation.navigate('TelaMensagens')}
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
      />

      <DrawerItem
        label="Alertas"
        icon={() => (
          <Ionicons name="mail-outline" size={24} color="#6db913" style={{ marginRight: 10 }} />
        )}
        onPress={() => navigation.navigate('TelaListaAvisos')}
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
      />

      <DrawerItem
        label="Gerenciamento"
        icon={() => (
          <Ionicons name="mail-outline" size={24} color="#6db913" style={{ marginRight: 10 }} />
        )}
        onPress={() => navigation.navigate('TelaGerenciamento')}
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
      />

      <DrawerItem
        label="Listas Alertas"
        icon={() => (
          <Ionicons name="mail-outline" size={24} color="#6db913" style={{ marginRight: 10 }} />
        )}
        onPress={() => navigation.navigate('TelaListaAlertas')}
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
      />

    </DrawerContentScrollView>
  );
}

function MainNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#f4b751',
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#ccc',
        drawerStyle: {
          backgroundColor: '#fff',
          width: 280,
        },
        header: (props) => <Header {...props} />,
      }}
    >
      <Drawer.Screen
        name="TelaInicial"
        component={TelaInicial}
        options={{
          title: 'Início',
          drawerIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          )
        }}
      />

      <Drawer.Screen
        name="TelaLogin"
        component={TelaLogin}
        options={{
          title: 'Login',
          drawerIcon: ({ color }) => (
            <Ionicons name="log-in-outline" size={27} color="#6db913" />
          )
        }}
      />

      <Drawer.Screen
        name="TelaCadastroU"
        component={TelaCadastroU}
        options={{
          title: 'Cadastro Usuario',
        }}
      />

      <Drawer.Screen
        name="TelaADM"
        component={TelaADM}
        options={{
          title: 'Tela administrador',
        }}
      />

      <Drawer.Screen
        name="TelaUsuario"
        component={TelaUsuario}
        options={{
          title: 'Tela Usuario',
        }}
      />

      <Drawer.Screen
        name="TelaBombeiro"
        component={TelaBombeiro}
        options={{
          title: 'Tela Bombeiro',
        }}
      />

      <Drawer.Screen
        name="TelaInfosSen"
        component={TelaInfosSen}
        options={{
          title: 'Gerenciar Sensores',
        }}
      />

      <Drawer.Screen
        name="TelaInfosUs"
        component={TelaInfosUs}
        options={{
          title: 'Gerenciar Sensores',
        }}
      />

      <Drawer.Screen
        name="TelaMensagens"
        component={TelaMensagens}
        options={{
          title: 'Mensagens',
        }}
      />

      <Drawer.Screen
        name="TelaListaAvisos"
        component={TelaListaAvisos}
        options={{
          title: 'Avisos',
        }}
      />

      <Drawer.Screen
        name="TelaGerenciamento"
        component={TelaGerenciamento}
        options={{
          title: 'Tela Gerenciamento',
        }}
      />

      <Drawer.Screen
        name="TelaListaAlertas"
        component={TelaListaAlertas}
        options={{
          title: 'Lista de Alertas Bombeiros',
        }}
      />


    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: '#4b4949',
  },
  drawerHeader: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  userIconContainer: {
    backgroundColor: '#6db913',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6db913',
    marginBottom: 10,
  },
  drawerTitle: {
    fontSize: 22,
    color: '#fff',
    marginTop: 10,
    letterSpacing: 0.5,
  },
  drawerLabel: {
    fontSize: 18,
    color: '#000',
    marginLeft: -16,
    letterSpacing: 0.3,
  },
  drawerItem: {
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
});
