import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function TelaMensagens() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Mensagens</Text>
      <Text style={styles.subtitulo}>Envie mensagens aos usuários FireAway</Text>

      <View style={styles.cardPequeno}>
        <Text style={styles.cardPequenoTitulo}>Mensagens recebidas</Text>
        <Text style={styles.cardPequenoTexto}>Lista das mensagens recebidas</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Envie uma mensagem</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email do receptor</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o email"
            placeholderTextColor="#aaa"
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
          />
        </View>

        <TouchableOpacity style={styles.botao}>
          <Text style={styles.textoBotao}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4b4949',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 12,
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
    fontSize: 15,
    color: '#6db913',
    marginBottom: 6,
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
    height: 430,
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
