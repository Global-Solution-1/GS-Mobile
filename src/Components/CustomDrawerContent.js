import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawerContent = ({ navigation, userType, setUserType }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setUserType(null);
      navigation.navigate('TelaInicial');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const canAccess = (requiredType) => {
    if (!requiredType) return true;
    return userType === requiredType;
  };

  const drawerLabelStyle = { color: '#fff' };  

  return (
    <DrawerContentScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle" size={60} color="#6db913" />
        <Text style={styles.title}>
          {userType === 'admin' ? 'Administrador' :
            userType === 'user' ? 'Morador' :
            userType === 'socorrista' ? 'Socorrista' : 'Visitante'}
        </Text>
      </View>

      <DrawerItem
        label="Início"
        icon={() => <Ionicons name="home" size={24} color="#6db913" />}
        labelStyle={drawerLabelStyle}
        onPress={() => navigation.navigate('TelaInicial')}
      />

      <DrawerItem
        label="Equipe"
        icon={() => <Ionicons name="people-circle-outline" size={24} color="#6db913" />}
        labelStyle={drawerLabelStyle}
        onPress={() => navigation.navigate('TelaEquipe')}
      />


      {canAccess('admin') && (
        <>
          <DrawerItem
            label="Painel Admin"
            icon={() => <Ionicons name="shield" size={24} color="#6db913" />}
            labelStyle={drawerLabelStyle}
            onPress={() => navigation.navigate('TelaADM')}
          />
          <DrawerItem
            label="Gerenciar Usuários"
            icon={() => <Ionicons name="people" size={24} color="#6db913" />}
            labelStyle={drawerLabelStyle}
            onPress={() => navigation.navigate('TelaInfosUs')}
          />
          <DrawerItem
            label="Gerenciar Sensores e Monitoramentos"
            icon={() => <Ionicons name="people" size={24} color="#6db913" />}
            labelStyle={drawerLabelStyle}
            onPress={() => navigation.navigate('TelaInfosSen')}
          />
          <DrawerItem
            label="Enviar mensagens"
            icon={() => <Ionicons name="people" size={24} color="#6db913" />}
            labelStyle={drawerLabelStyle}
            onPress={() => navigation.navigate('TelaMensagensADM')}
          />

        </>



      )}

      {canAccess('user') && (
        <>
        <DrawerItem
          label="Área do Morador"
          icon={() => <Ionicons name="person" size={24} color="#6db913" />}
          labelStyle={drawerLabelStyle}
          onPress={() => navigation.navigate('TelaUsuario')}
        />
        <DrawerItem
          label="Alertas na região"
          icon={() => <Ionicons name="person" size={24} color="#6db913" />}
          labelStyle={drawerLabelStyle}
          onPress={() => navigation.navigate('TelaListaAvisos')}
        />
        <DrawerItem
            label="Enviar mensagens"
            icon={() => <Ionicons name="people" size={24} color="#6db913" />}
            labelStyle={drawerLabelStyle}
            onPress={() => navigation.navigate('TelaMensagensADM')}
          />

        </>
        
        

      )}

      {canAccess('socorrista') && (
        <>
        <DrawerItem
          label="Painel Socorrista"
          icon={() => <Ionicons name="medkit" size={24} color="#6db913" />}
          labelStyle={drawerLabelStyle}
          onPress={() => navigation.navigate('TelaSocorrista')}
        />
        <DrawerItem
          label="Acompanhar Sensores e Monitoramento"
          icon={() => <Ionicons name="medkit" size={24} color="#6db913" />}
          labelStyle={drawerLabelStyle}
          onPress={() => navigation.navigate('TelaGerenciamento')}
        />
        <DrawerItem
          label="Visualizar Alertas"
          icon={() => <Ionicons name="medkit" size={24} color="#6db913" />}
          labelStyle={drawerLabelStyle}
          onPress={() => navigation.navigate('TelaListaAlertas')}
        />
        <DrawerItem
          label="Enviar mensagens"
          icon={() => <Ionicons name="medkit" size={24} color="#6db913" />}
          labelStyle={drawerLabelStyle}
          onPress={() => navigation.navigate('TelaMensagensADM')}
        />

        </>
        

      )}

      {!userType && (
        <>
        <DrawerItem
          label="Login"
          icon={() => <Ionicons name="log-in" size={24} color="#6db913" />}
          labelStyle={drawerLabelStyle}
          onPress={() => navigation.navigate('TelaLogin')}
        />

        <DrawerItem
        label="Cadastro"
        icon={() => <Ionicons name="person-add" size={24} color="#6db913" />}
        labelStyle={drawerLabelStyle}
        onPress={() => navigation.navigate('TelaCadastroU')}
      />
        </>
        
      )}

      

      {userType && (
        <DrawerItem
          label="Sair"
          icon={() => <Ionicons name="log-out" size={24} color="#6db913" />}
          labelStyle={drawerLabelStyle}
          onPress={handleLogout}
        />
      )}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#6db913',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
});

export default CustomDrawerContent;
