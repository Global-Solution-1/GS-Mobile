import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaGerenciamento() {
    const [sensores, setSensores] = useState([]);
    const [monitoramentos, setMonitoramentos] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_BASE = 'https://gs-fireawaysystem.onrender.com';

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            console.log("Token recuperado:", token);

            if (!token) {
                Alert.alert('Erro', 'Usuário não autenticado.');
                setLoading(false);
                return;
            }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };

            const sensoresResp = await fetch(`${API_BASE}/sensor/sensores`, { headers });
            console.log("Status sensores:", sensoresResp.status);
            const sensoresData = await sensoresResp.json();
            console.log("sensoresData:", sensoresData);

            if (!Array.isArray(sensoresData)) {
                console.warn("Resposta inesperada: sensoresData não é um array.", sensoresData);
                setSensores([]);
            } else {
                setSensores(sensoresData);
            }

            const monitoramentosResp = await fetch(`${API_BASE}/monitoramento`, { headers });
            console.log("Status monitoramentos:", monitoramentosResp.status);
            const monitoramentosData = await monitoramentosResp.json();
            console.log("monitoramentosData:", monitoramentosData);

            if (!Array.isArray(monitoramentosData)) {
                console.warn("Resposta inesperada: monitoramentosData não é um array.", monitoramentosData);
                setMonitoramentos([]);
            } else {
                setMonitoramentos(monitoramentosData);
            }

        } catch (error) {
            console.error("Erro ao carregar dados:", error);
            Alert.alert('Erro', 'Falha ao carregar dados.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#6db913" style={{ flex: 1, justifyContent: 'center' }} />;
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.titulo}>Gerenciamento de Sensores</Text>

            {sensores.map(sensor => {
                const monitoramentosDoSensor = monitoramentos.filter(m => String(m.sensor.id) === String(sensor.id));

                return (
                    <View key={sensor.id} style={styles.card}>
                        <Text style={styles.cardText}>Tipo Sensor: {sensor.tipo}</Text>
                        <Text style={styles.cardText}>Latitude: {sensor.latitude}</Text>
                        <Text style={styles.cardText}>Longitude: {sensor.longitude}</Text>
                        <Text style={styles.cardText}>Status: {sensor.status || '-'}</Text>

                        <Text style={[styles.cardText, { marginTop: 10 }]}>Monitoramentos:</Text>

                        {monitoramentosDoSensor.length > 0 ? (
                            monitoramentosDoSensor.map(m => (
                                <View key={m.id} style={{ marginBottom: 8 }}>
                                    <Text style={styles.monitoramento}>
                                        Data/Hora: {new Date(m.dataHora).toLocaleString()}
                                    </Text>
                                    <Text style={styles.monitoramento}>Valor: {m.valor}</Text>
                                    <Text style={styles.monitoramento}>Descrição: {m.descricao || '-'}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.monitoramento}>Nenhum monitoramento.</Text>
                        )}
                    </View>
                );
            })}
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
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#1E1E1E',
        width: '95%',
        borderRadius: 14,
        padding: 20,
        marginBottom: 20,
    },
    cardText: {
        color: '#fff',
        fontSize: 13,
    },
    monitoramento: {
        color: '#aaa',
        fontSize: 11,
        marginLeft: 10,
    },
});
