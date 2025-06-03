import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function TelaBombeiro() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Saudação */}
      <View style={styles.welcomeBox}>
        <Ionicons name="person" size={20} color="#6db913" style={{ marginRight: 8 }} />
        <Text style={styles.welcomeText}>Olá _____ !</Text>
      </View>

      {/* Pergunta */}
      <Text style={styles.subText}>O que você quer fazer hoje?</Text>

      {/* Botões de ação */}
      <TouchableOpacity style={styles.button}>
        <Ionicons name="wifi" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Acompanhar Sensores e Monitoramentos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Ionicons name="alert-circle-outline" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Visualizar alertas por região</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <MaterialIcons name="chat-bubble-outline" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Enviar mensagens para usuários</Text>
      </TouchableOpacity>

      {/* Mapa interativo */}
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
    marginBottom: 30,
    backgroundColor: 'transparent',
  },
  welcomeText: {
    color: '#6db913',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#6db913',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    flexShrink: 1,
  },
  mapBox: {
    backgroundColor: '#6db913',
    width: '95%',
    height: 300,
    borderRadius: 14,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: '#fff',
    fontSize: 16,
  },
});
