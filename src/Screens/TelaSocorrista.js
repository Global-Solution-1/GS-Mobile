import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function TelaSocorrista({ navigation, route }) {
  const [nome, setNome] = useState('Socorrista');
  const [location, setLocation] = useState(null);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    const obterNome = async () => {
      try {
        let nomeObtido = route?.params?.nome;
        if (!nomeObtido) {
          nomeObtido = await AsyncStorage.getItem('nome');
        }
        setNome(nomeObtido || 'Usuário');
      } catch (e) {
        setNome('Usuário');
      }
    };

    obterNome();
  }, [route?.params?.nome]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermission(status);
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
      }
    })();
  }, []);

  if (!nome) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff' }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.welcomeBox}>
        <Ionicons name="person" size={20} color="#6db913" style={{ marginRight: 8 }} />
        <Text style={styles.welcomeText}>Olá {nome}!</Text>
      </View>

      <Text style={styles.subText}>O que você quer fazer hoje?</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TelaListaAlertas')}>
        <Ionicons name="alert-circle-outline" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Verificar alertas na sua região</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TelaMensagensADM')}>
        <MaterialIcons name="chat-bubble-outline" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Enviar mensagens para usuários</Text>
      </TouchableOpacity>

      <View style={styles.mapBox}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Você está aqui"
            />
          </MapView>
        ) : (
          <Text style={styles.mapText}>Carregando mapa...</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3c3b3b',
    flex: 1,
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  welcomeBox: {
    borderWidth: 1,
    borderColor: '#6db913',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 20,
    color: '#fff',
  },
  subText: {
    color: '#fff',
    marginBottom: 20,
    fontSize: 15,
  },
  button: {
    backgroundColor: '#6db913',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    marginRight: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
  mapBox: {
    marginTop: 20,
    backgroundColor: '#222',
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: '#fff',
    fontSize: 16,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
