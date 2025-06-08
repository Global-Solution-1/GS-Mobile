import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE = 'API_JAVA/alertas/todos';

export default function TelaListaAlertas() {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarAlertas();
  }, []);

  const carregarAlertas = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        setLoading(false);
        return;
      }
      const response = await fetch(API_BASE, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Erro ao buscar alertas');
      }
      const data = await response.json();
      setAlertas(data);
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Alertas</Text>
      <Text style={styles.inTitulo}>Confira todos os alertas para possíveis focos de</Text>
      <Text style={styles.inTitulo}>incêndio</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#6db913" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {alertas.length === 0 && <Text style={styles.cardText}>Nenhum alerta encontrado.</Text>}

          {alertas.map(alerta => (
            <View key={alerta.id} style={styles.card}>
              <Text style={styles.cardText}>Nível: {alerta.nivel}</Text>
              <Text style={styles.cardText}>Descrição: {alerta.descricao || '-'}</Text>
              <Text style={styles.cardText}>Latitude: {alerta.latitude}</Text>
              <Text style={styles.cardText}>Longitude: {alerta.longitude}</Text>
              <Text style={styles.cardText}>Data/Hora: {new Date(alerta.dataHora).toLocaleString()}</Text>
              <Text style={styles.cardText}>Status: {alerta.status}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4b4949',
    paddingTop: 40,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inTitulo: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 14,
    padding: 15,
    marginVertical: 8,
    width: '100%',
  },
  cardText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 2,
  },
});
