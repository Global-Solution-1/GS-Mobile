import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  ActivityIndicator, Alert, TouchableOpacity,
  TextInput, Button
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const API_BASE = 'https://gs-fireawaysystem.onrender.com';

export default function TelaInfosSen() {
  const [sensores, setSensores] = useState([]);
  const [monitoramentos, setMonitoramentos] = useState([]);
  const [loading, setLoading] = useState(true);


  const [formVisible, setFormVisible] = useState(false);
  const [formMode, setFormMode] = useState(null); 
  const [formSensorData, setFormSensorData] = useState({ tipo: '', latitude: '', longitude: '', status: '' });
  const [formMonitoramentoData, setFormMonitoramentoData] = useState({ sensorId: null, valor: '', descricao: '' });
  const [editTargetId, setEditTargetId] = useState(null);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        setLoading(false);
        return;
      }
      const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

      const sensoresResp = await fetch(`${API_BASE}/sensor/sensores`, { headers });
      const sensoresData = await sensoresResp.json();
      setSensores(Array.isArray(sensoresData) ? sensoresData : []);

      const monitoramentosResp = await fetch(`${API_BASE}/monitoramento`, { headers });
      const monitoramentosData = await monitoramentosResp.json();
      setMonitoramentos(Array.isArray(monitoramentosData) ? monitoramentosData : []);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar dados.');
    } finally {
      setLoading(false);
    }
  }

  

  async function deletarMonitoramento(id) {
    const token = await AsyncStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    const resp = await fetch(`${API_BASE}/monitoramento/${id}`, { method: 'DELETE', headers });
    if (resp.status === 204) {
      Alert.alert('Sucesso', 'Monitoramento deletado');
      carregarDados();
    } else Alert.alert('Erro', 'Falha ao deletar monitoramento');
  }

  async function salvarSensor() {
    if (!formSensorData.tipo || !formSensorData.latitude || !formSensorData.longitude || !formSensorData.status) {
      Alert.alert('Erro', 'Preencha todos os campos do sensor');
      return;
    }
    const token = await AsyncStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

    const body = JSON.stringify({
      tipo: formSensorData.tipo,
      latitude: parseFloat(formSensorData.latitude),
      longitude: parseFloat(formSensorData.longitude),
      status: formSensorData.status,
    });

    let url = `${API_BASE}/sensor/save`;
    let method = 'POST';
    if (formMode === 'editSensor' && editTargetId) {
      url = `${API_BASE}/sensor/${editTargetId}`;
      method = 'PUT';
    }

    const resp = await fetch(url, { method, headers, body });
    if (resp.ok) {
      Alert.alert('Sucesso', `Sensor ${formMode === 'editSensor' ? 'atualizado' : 'cadastrado'}!`);
      carregarDados();
      limparFormulario();
    } else {
      Alert.alert('Erro', 'Falha ao salvar sensor');
    }
  }

  async function salvarMonitoramento() {
    if (!formMonitoramentoData.sensorId || !formMonitoramentoData.valor) {
      Alert.alert('Erro', 'Preencha todos os campos do monitoramento');
      return;
    }
    const token = await AsyncStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

    const body = JSON.stringify({
      sensorId: parseInt(formMonitoramentoData.sensorId),
      valor: parseFloat(formMonitoramentoData.valor),
      descricao: formMonitoramentoData.descricao || ''
    });

    let url = `${API_BASE}/monitoramento`;
    let method = 'POST';
    if (formMode === 'editMonitoramento' && editTargetId) {
      url = `${API_BASE}/monitoramento/${editTargetId}`;
      method = 'PUT';
    }

    const resp = await fetch(url, { method, headers, body });
    if (resp.ok) {
      Alert.alert('Sucesso', `Monitoramento ${formMode === 'editMonitoramento' ? 'atualizado' : 'cadastrado'}!`);
      carregarDados();
      limparFormulario();
    } else {
      Alert.alert('Erro', 'Falha ao salvar monitoramento');
    }
  }

  function limparFormulario() {
    setFormVisible(false);
    setFormMode(null);
    setFormSensorData({ tipo: '', latitude: '', longitude: '', status: '' });
    setFormMonitoramentoData({ sensorId: null, valor: '', descricao: '' });
    setEditTargetId(null);
  }


  function iniciarEdicaoSensor(sensor) {
    setFormSensorData({
      tipo: sensor.tipo,
      latitude: String(sensor.latitude),
      longitude: String(sensor.longitude),
      status: sensor.status,
    });
    setEditTargetId(sensor.id);
    setFormMode('editSensor');
    setFormVisible(true);
  }

  function iniciarEdicaoMonitoramento(monitoramento) {
    setFormMonitoramentoData({
      sensorId: monitoramento.sensor?.id || '',
      valor: String(monitoramento.valor),
      descricao: monitoramento.descricao || '',
    });
    setEditTargetId(monitoramento.id);
    setFormMode('editMonitoramento');
    setFormVisible(true);
  }


  function iniciarAddMonitoramento(sensorId) {
    setFormMonitoramentoData({ sensorId, valor: '', descricao: '' });
    setEditTargetId(null);
    setFormMode('addMonitoramento');
    setFormVisible(true);
  }

  function renderForm() {
    if (!formVisible) return null;

    return (
      <View style={styles.formContainer}>
        {(formMode === 'addSensor' || formMode === 'editSensor') && (
          <>
            <Text style={styles.formTitle}>{formMode === 'editSensor' ? 'Editar Sensor' : 'Adicionar Sensor'}</Text>
            <TextInput
              placeholder="Tipo (ex: TEMPERATURA)"
              style={styles.input}
              value={formSensorData.tipo}
              onChangeText={text => setFormSensorData(prev => ({ ...prev, tipo: text }))}
            />
            <TextInput
              placeholder="Latitude"
              keyboardType="numeric"
              style={styles.input}
              value={formSensorData.latitude}
              onChangeText={text => setFormSensorData(prev => ({ ...prev, latitude: text }))}
            />
            <TextInput
              placeholder="Longitude"
              keyboardType="numeric"
              style={styles.input}
              value={formSensorData.longitude}
              onChangeText={text => setFormSensorData(prev => ({ ...prev, longitude: text }))}
            />
            <TextInput
              placeholder="Status"
              style={styles.input}
              value={formSensorData.status}
              onChangeText={text => setFormSensorData(prev => ({ ...prev, status: text }))}
            />
            <View style={styles.formButtonsRow}>
              <Button title="Cancelar" color="#888" onPress={limparFormulario} />
              <Button title="Salvar Sensor" color="#6db913" onPress={salvarSensor} />
            </View>
          </>
        )}

        {(formMode === 'addMonitoramento' || formMode === 'editMonitoramento') && (
          <>
            <Text style={styles.formTitle}>{formMode === 'editMonitoramento' ? 'Editar Monitoramento' : 'Adicionar Monitoramento'}</Text>

            <TextInput
              placeholder="Sensor ID"
              keyboardType="numeric"
              style={[styles.input, { backgroundColor: '#eee' }]}
              value={formMonitoramentoData.sensorId ? String(formMonitoramentoData.sensorId) : ''}
              editable={false} // não edita sensorId
            />
            <TextInput
              placeholder="Valor"
              keyboardType="numeric"
              style={styles.input}
              value={formMonitoramentoData.valor}
              onChangeText={text => setFormMonitoramentoData(prev => ({ ...prev, valor: text }))}
            />
            <TextInput
              placeholder="Descrição (opcional)"
              style={styles.input}
              value={formMonitoramentoData.descricao}
              onChangeText={text => setFormMonitoramentoData(prev => ({ ...prev, descricao: text }))}
            />
            <View style={styles.formButtonsRow}>
              <Button title="Cancelar" color="#888" onPress={limparFormulario} />
              <Button title="Salvar Monitoramento" color="#6db913" onPress={salvarMonitoramento} />
            </View>
          </>
        )}
      </View>
    );
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#6db913" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Gerenciamento de Sensores</Text>

      {/* Botão para adicionar sensor */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20, width: '100%' }}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => {
            limparFormulario();
            setFormMode('addSensor');
            setFormVisible(true);
          }}
        >
          <Ionicons name="add" size={18} color="#6db913" />
          <Text style={styles.actionBtnText}>Adicionar Sensor</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de sensores */}
      {sensores.map(sensor => {
        const monitoramentosDoSensor = monitoramentos.filter(m => String(m.sensor.id) === String(sensor.id));
        return (
          <View key={sensor.id} style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.cardText}><Text style={{fontWeight: 'bold'}}>Tipo Sensor:</Text> {sensor.tipo}</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => iniciarEdicaoSensor(sensor)} style={{ marginRight: 15 }}>
                  <Ionicons name="pencil" size={20} color="#6db913" />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.cardText}><Text style={{fontWeight: 'bold'}}>Latitude:</Text> {sensor.latitude} <Text style={{fontWeight: 'bold'}}> Longitude:</Text> {sensor.longitude}</Text>
            <Text style={styles.cardText}><Text style={{fontWeight: 'bold'}}>Status:</Text> {sensor.status}</Text>

            {/* Botão para adicionar monitoramento ao sensor */}
            <TouchableOpacity
              style={[styles.actionBtn, { marginTop: 10, alignSelf: 'flex-start' }]}
              onPress={() => iniciarAddMonitoramento(sensor.id)}
            >
              <Ionicons name="add-circle" size={18} color="#6db913" />
              <Text style={styles.actionBtnText}>Adicionar Monitoramento</Text>
            </TouchableOpacity>

            {/* Lista de monitoramentos do sensor */}
            {monitoramentosDoSensor.length > 0 && (
              <View style={{ marginTop: 10 }}>
                <Text style={[styles.cardText, { fontWeight: 'bold' }]}>Monitoramentos:</Text>
                {monitoramentosDoSensor.map(monitoramento => (
                  <View key={monitoramento.id} style={styles.monitoramentoRow}>
                    <Text style={{ flex: 1 }}>
                      <Text style={{fontWeight: 'bold'}}>Valor:</Text> {monitoramento.valor} - {monitoramento.descricao || 'Sem descrição'}
                    </Text>
                    <View style={styles.monitoramentoButtons}>
                      <TouchableOpacity
                        onPress={() => iniciarEdicaoMonitoramento(monitoramento)}
                        style={styles.smallButton}
                      >
                        <Ionicons name="pencil" size={16} color="#6db913" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          Alert.alert('Confirmação', 'Deseja deletar este monitoramento?', [
                            { text: 'Cancelar', style: 'cancel' },
                            { text: 'Sim', onPress: () => deletarMonitoramento(monitoramento.id) },
                          ]);
                        }}
                        style={styles.smallButton}
                      >
                        <Ionicons name="trash" size={16} color="red" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      })}

      {/* Formulário de cadastro/edição */}
      {renderForm()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10 },
  content: { paddingBottom: 50, paddingTop: 20 },
  titulo: { fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 20, textAlign: 'center' },
  card: {
    backgroundColor: '#577235',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  cardText: { fontSize: 16, marginBottom: 5 },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f3d6',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  actionBtnText: {
    color: '#6db913',
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 14,
  },
  monitoramentoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 4,
    padding: 6,
    borderRadius: 5,
  },
  monitoramentoButtons: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  smallButton: {
    marginLeft: 8,
  },
  formContainer: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    backgroundColor: '#577235',
    borderRadius: 10,
    padding: 15,
    elevation: 10,
    zIndex: 999,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6db913',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderColor: '#6db913',
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
  },
  formButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
