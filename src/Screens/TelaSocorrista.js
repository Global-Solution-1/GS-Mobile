import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaSocorrista({ navigation, route }) {
  const [nome, setNome] = useState('Socorrista');

  useEffect(() => {
    const obterNome = async () => {
      try {
        let nomeObtido = route?.params?.nome;
        if (!nomeObtido) {
          nomeObtido = await AsyncStorage.getItem('nome');
        }
        setNome(nomeObtido || 'Usuário'); // <-- corrigido aqui
      } catch (e) {
        setNome('Usuário');
      }
    };

    obterNome();
  }, [route?.params?.nome]);

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

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TelaListaAvisos')}>
        <Ionicons name="alert-circle-outline" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Verificar alertas na sua região</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TelaMensagensSocorrista')}>
        <MaterialIcons name="chat-bubble-outline" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Enviar mensagens para usuários</Text>
      </TouchableOpacity>

      <View style={styles.mapBox}>
        <Text style={styles.mapText}>Mapa interativo</Text>
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
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  mapText: {
    color: '#fff',
    fontSize: 16,
  },
});
