import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://gs-fireawaysystem.onrender.com/alertas/proximos';

export default function TelaListaAvisos() {
  const [alertas, setAlertas] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  const parseDataValida = (dataStr) => {
    let d = new Date(dataStr);
    if (!isNaN(d.getTime())) {
      return d;
    }
    const limpo = dataStr.replace(',', '').trim();
    const d2 = new Date(limpo);
    if (!isNaN(d2.getTime())) {
      return d2;
    }
    return null;
  };

  useEffect(() => {
    buscarAlertasProximos();
  }, []);

  const buscarAlertasProximos = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        setLoading(false);
        return;
      }

      const response = await fetch(API_URL, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        setAlertas(data);
        setMensagem('');
      } else if (typeof data === 'string') {
        setMensagem(data);
      } else {
        setMensagem('Erro inesperado ao buscar alertas.');
      }
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderAlertaCard = (alerta) => {
    const dataAlerta = parseDataValida(alerta.dataHora);
    const dataFormatada = dataAlerta
      ? dataAlerta.toLocaleDateString('pt-BR') + ' às ' + dataAlerta.toLocaleTimeString('pt-BR')
      : 'Data inválida';

    return (
      <View key={alerta.id} style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardText}>Nível: {alerta.nivel}</Text>
          <Text style={styles.cardText}>Descrição: {alerta.descricao || '-'}</Text>
          <Text style={styles.cardText}>Data/Hora: {dataFormatada}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Alertas próximos</Text>
      <Text style={styles.inTitulo}>Verifique alertas gerados pelos monitoramentos</Text>
      <Text style={styles.inTitulo}>de sensores próximo a sua residência</Text>
      <Text style={styles.inTituloAviso}>Alertas em um raio de 10 km de você</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#6db913" style={{ marginTop: 20 }} />
      ) : (
        <>
          {mensagem ? (
            <Text style={styles.cardText}>{mensagem}</Text>
          ) : alertas.length > 0 ? (
            alertas.map(renderAlertaCard)
          ) : (
            <Text style={styles.cardText}>Nenhum alerta encontrado.</Text>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4b4949'
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  inTitulo: {
    fontSize: 13,
    color: '#fff',
    marginBottom: 5,
  },
  inTituloAviso: {
    fontSize: 14,
    color: '#6db913',
    marginTop: 10,
    marginBottom: 20
  },
  card: {
    backgroundColor: '#1E1E1E',
    width: '95%',
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  cardText: {
    color: '#fff',
    textAlign: 'left',
    lineHeight: 22,
    marginBottom: 4,
  },
});
