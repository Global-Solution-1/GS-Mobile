import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaMensagens() {
  const [emailReceptor, setEmailReceptor] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [mensagensRecebidas, setMensagensRecebidas] = useState([]);

  const API_BASE = 'API_JAVA';

  useEffect(() => {
    carregarMensagensRecebidas();
  }, []);

  const carregarMensagensRecebidas = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('Erro', 'Token não encontrado!');
      return;
    }

    const resp = await fetch(`${API_BASE}/mensagem/recebidas`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error('Erro na API:', errorText);
      Alert.alert('Erro', 'Falha ao carregar mensagens.');
      return;
    }

    const data = await resp.json();
    console.log('Mensagens recebidas:', data);  
    setMensagensRecebidas(data);
  } catch (err) {
    console.error('Erro:', err);
    Alert.alert('Erro', 'Não foi possível carregar as mensagens.');
  }
};

useEffect(() => {
    carregarMensagensRecebidas();
  }, []);

  const enviarMensagem = async () => {
  if (!emailReceptor || !conteudo) {
    Alert.alert('Atenção', 'Preencha todos os campos.');
    return;
  }

  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('Erro', 'Token não encontrado!');
      return;
    }

    const body = JSON.stringify({
      emailReceptor: emailReceptor.trim(),
      conteudo: conteudo.trim()
    });

    const resp = await fetch(`${API_BASE}/mensagem/enviar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body
    });

    const result = await resp.json();
    console.log('Resposta envio:', result);

    if (resp.ok) {
      Alert.alert('Sucesso', 'Mensagem enviada!');
      setEmailReceptor('');
      setConteudo('');
      carregarMensagensRecebidas();
    } else {
      Alert.alert('Erro', result.mensagem || 'Falha ao enviar mensagem.');
    }
  } catch (err) {
    console.error(err);
    Alert.alert('Erro', 'Não foi possível enviar a mensagem.');
  }
};

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Mensagens</Text>
      <Text style={styles.subtitulo}>Envie mensagens aos usuários FireAway</Text>

      <View style={styles.cardPequeno}>
        <Text style={styles.cardPequenoTitulo}>Mensagens recebidas</Text>
        {mensagensRecebidas.length === 0 ? (
          <Text style={styles.cardPequenoTexto}>Nenhuma mensagem recebida.</Text>
        ) : (
          mensagensRecebidas.map((msg, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={styles.cardPequenoTexto}>
                De: {msg.nomeEmissor} ({msg.emailEmissor}) - {msg.perfilEmissor}
              </Text>
              <Text style={styles.cardPequenoTexto}>
                {msg.conteudo}
              </Text>
              <Text style={{ color: '#888', fontSize: 10 }}>
                {new Date(msg.dataHora).toLocaleString()}
              </Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Envie uma mensagem</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email do receptor</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o email"
            placeholderTextColor="#aaa"
            value={emailReceptor}
            onChangeText={setEmailReceptor}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mensagem</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Digite a mensagem"
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={4}
            value={conteudo}
            onChangeText={setConteudo}
          />
        </View>

        <TouchableOpacity style={styles.botao} onPress={enviarMensagem}>
          <Text style={styles.textoBotao}>Enviar</Text>
        </TouchableOpacity>
      </View>
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
    padding: 20
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 30,
  },
  cardPequeno: {
    backgroundColor: '#1E1E1E',
    width: '85%',
    borderRadius: 14,
    padding: 16,
    marginBottom: 30,
  },
  cardPequenoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6db913',
    marginBottom: 10,
  },
  cardPequenoTexto: {
    color: '#fff',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#1E1E1E',
    width: '85%',
    borderRadius: 14,
    padding: 20,
    marginBottom: 70,
    justifyContent: 'space-between',
  },
  cardTitulo: {
    fontSize: 16,
    color: '#6db913',
    textAlign: 'center',
  },
  inputGroup: {
    marginTop: 20,
  },
  label: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#3c3b3b',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
  },
  textArea: {
    backgroundColor: '#3c3b3b',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    height: 100,
    textAlignVertical: 'top',
  },
  botao: {
    backgroundColor: '#6db913',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 14,
  },
});
