import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TelaListaAlertas() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.titulo}>Alertas</Text>
            <Text style={styles.inTitulo}>Confira todos os alertas para possível focos de</Text>
            <Text style={styles.inTitulo}>incêndio</Text>

            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.cardText}>
                        Lista de todos os alertas
                    </Text>
                </View>


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
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
    },
    inTitulo: {
        fontSize: 13,
        color: '#fff',
        marginBottom: 2,
    },
    card: {
        backgroundColor: '#1E1E1E',
        width: '95%',
        height: 380,
        borderRadius: 14,
        padding: 20,
        marginBottom: 40,
        marginTop: 40,
        justifyContent: 'space-between', // espaçamento entre conteúdo e botão
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        color: '#fff',
        textAlign: 'center',
        lineHeight: 22,
    },

    adicionarTexto: {
        color: '#6db913',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
});
