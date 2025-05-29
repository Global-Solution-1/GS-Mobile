import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import Header from './src/Components/Header';
import TelaInicial from './src/Screens/TelaInicial';
import TelaLogin from './src/Screens/TelaLogin';
import TelaCadastroU from './src/Screens/TelaCadastroU';

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
