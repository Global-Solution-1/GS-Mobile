import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform 
} from 'react-native'; 
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaInfosUs() {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formUsuario, setFormUsuario] = useState({
    nome: '', email: '', cpf: '', senha: '', telefone: '', perfil: 'ADMINISTRADOR' 
  });

  const API_BASE = 'https://gs-fireawaysystem.onrender.com';

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const resp = await fetch(`${API_BASE}/usuario/usuarios`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!resp.ok) {
        const errorText = await resp.text();
        console.error('Erro na API:', errorText);
        Alert.alert('Erro', 'Falha ao carregar usuários!');
        return;
      }

      const data = await resp.json();
      if (Array.isArray(data)) {
        setUsuarios(data);
      } else {
        console.warn('Resposta inesperada:', data);
        setUsuarios([]);
      }

    } catch (err) {
      console.error('Erro:', err);
      Alert.alert('Erro', 'Não foi possível carregar os usuários.');
    }
  };

  const handleSalvar = async () => {
    const token = await AsyncStorage.getItem('token');
    const url = `${API_BASE}/usuario/cadastro/admin`;
    const body = JSON.stringify({ ...formUsuario, perfil: formUsuario.perfil.toUpperCase() });

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body
      });
      if (resp.ok) {
        Alert.alert('Sucesso', 'Usuário adicionado!');
        setFormUsuario({ nome: '', email: '', cpf: '', senha: '', telefone: '', perfil: 'ADMINISTRADOR' });
        setMostrarFormulario(false);
        carregarUsuarios();
      } else {
        const errorData = await resp.text();
        Alert.alert('Erro', errorData);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível salvar o usuário.');
    }
  };

  const handleDeletar = async (id) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const resp = await fetch(`${API_BASE}/usuario/usuarios/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resp.status === 204) {
        Alert.alert('Sucesso', 'Usuário deletado!');
        carregarUsuarios();
      } else {
        const errorData = await resp.text();
        Alert.alert('Erro', errorData);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível deletar o usuário.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Gerenciamento de Usuários</Text>

      {usuarios.map((usuario) => (
        <View key={usuario.id} style={styles.usuarioItem}>
          <View style={styles.linha}>
            <Text style={styles.tituloUsuario}>Nome: </Text>
            <Text style={styles.valor}>{usuario.nome}</Text>
          </View>

          <View style={styles.linha}>
            <Text style={styles.tituloUsuario}>CPF: </Text>
            <Text style={styles.valor}>{usuario.cpf}</Text>
            <TouchableOpacity onPress={() => handleDeletar(usuario.id)} style={styles.botaoLixeira}>
              <Ionicons name="trash-outline" size={20} color="#ff5555" />
            </TouchableOpacity>
          </View>

          <View style={styles.linha}>
            <Text style={styles.tituloUsuario}>Email: </Text>
            <Text style={styles.valor}>{usuario.email}</Text>
          </View>

          <View style={styles.linha}>
            <Text style={styles.tituloUsuario}>Perfil: </Text>
            <Text style={styles.valor}>{usuario.perfil}</Text>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.adicionarBtn} onPress={() => setMostrarFormulario(!mostrarFormulario)}>
        <Ionicons name="add" size={18} color="#6db913" style={{ marginRight: 6 }} />
        <Text style={styles.adicionarTexto}>{mostrarFormulario ? 'Fechar Formulário' : 'Adicionar Usuário'}</Text>
      </TouchableOpacity>

      {mostrarFormulario && (
        <View style={styles.formulario}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#888"
            value={formUsuario.nome}
            onChangeText={(text) => setFormUsuario({ ...formUsuario, nome: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={formUsuario.email}
            keyboardType="email-address"
            onChangeText={(text) => setFormUsuario({ ...formUsuario, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="CPF"
            placeholderTextColor="#888"
            value={formUsuario.cpf}
            onChangeText={(text) => setFormUsuario({ ...formUsuario, cpf: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#888"
            value={formUsuario.senha}
            secureTextEntry={true}
            onChangeText={(text) => setFormUsuario({ ...formUsuario, senha: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            placeholderTextColor="#888"
            value={formUsuario.telefone}
            keyboardType="phone-pad"
            onChangeText={(text) => setFormUsuario({ ...formUsuario, telefone: text })}
          />

          <Text style={styles.labelPicker}>Perfil</Text>
          <RNPickerSelect
  onValueChange={(itemValue) => setFormUsuario({ ...formUsuario, perfil: itemValue })}
  items={[
    { label: 'Administrador', value: 'ADMINISTRADOR' },
    { label: 'Socorrista', value: 'SOCORRISTA' },
  ]}
  value={formUsuario.perfil}
  style={{
    inputIOS: pickerSelectStyles.input,
    inputAndroid: pickerSelectStyles.input,
    iconContainer: pickerSelectStyles.iconContainer,
  }}
  useNativeAndroidPickerStyle={false} // importantíssimo para customizar no Android
  Icon={() => (
    <Ionicons name="chevron-down" size={20} color="#6db913" />
  )}
/>


          <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
            <Text style={styles.textoBotao}>Salvar</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4b4949', marginBottom: 20 },
  content: { alignItems: 'center', padding: 20 },
  titulo: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  usuarioItem: {
    backgroundColor: '#222',
    width: '95%',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  tituloUsuario: {
    fontWeight: 'bold',
    color: '#fff',
  },
  valor: {
    color: '#ddd',
    flexShrink: 1,
  },
  botaoLixeira: {
    marginLeft: 'auto',
  },
  usuarioTexto: { color: '#fff' },
  adicionarBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  adicionarTexto: { color: '#6db913', fontSize: 14, textDecorationLine: 'underline' },
  formulario: { backgroundColor: '#1E1E1E', width: '95%', padding: 20, borderRadius: 10, marginTop: 20 },
  input: {
    backgroundColor: '#4B4949',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  labelPicker: {
    color: '#fff',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  botaoSalvar: { backgroundColor: '#6db913', borderRadius: 8, padding: 12, alignItems: 'center', marginTop: 10 },
  textoBotao: { color: '#fff', fontSize: 16, letterSpacing: 1 },
});

const pickerSelectStyles = StyleSheet.create({
  input: {
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#6db913',
    borderRadius: 8,
    color: '#fff',
    backgroundColor: '#4B4949',
    paddingRight: 40,      
    marginBottom: 10,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: '35%',
    marginTop: -5,       
    pointerEvents: 'none' 
  },
});
