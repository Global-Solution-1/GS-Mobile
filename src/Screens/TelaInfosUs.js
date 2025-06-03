import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TelaInfosUs() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.titulo}>Gerenciamento de Sensores</Text>

            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.cardText}>
                        Lista dos usuários
                        ja cadastrados
                        (com botão de atualizar  e deletar ao lado de cada um)
                    </Text>
                </View>

                <TouchableOpacity style={styles.adicionarBtn}>
                    <Ionicons name="add" size={18} color="#6db913" style={{ marginRight: 6 }} />
                    <Text style={styles.adicionarTexto}>Adicionar Usuario</Text>
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
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#1E1E1E',
        width: '95%',
        height: 380,
        borderRadius: 14,
        padding: 20,
        marginBottom: 40,
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
    adicionarBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    adicionarTexto: {
        color: '#6db913',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
});
