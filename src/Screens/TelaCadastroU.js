import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function TelaCadastroU({ navigation }) {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>


            <View style={styles.card}>
                <View style={styles.contentWrapper}>
                    <Text style={styles.sectionTitle}>Dados pessoais</Text>
                    <Text style={styles.label}>Nome Completo</Text>
                    <TextInput style={styles.input} placeholder="Nome completo" placeholderTextColor="#aaa" />
                    <Text style={styles.label}>CPF</Text>
                    <TextInput style={styles.input} placeholder="CPF" placeholderTextColor="#aaa" />
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#aaa" />
                    <Text style={styles.label}>Crie uma Senha</Text>
                    <TextInput style={styles.input} placeholder="Crie uma senha" placeholderTextColor="#aaa" secureTextEntry />
                    <Text style={styles.label}>CEP</Text>
                    <TextInput style={styles.input} placeholder="CEP" placeholderTextColor="#aaa" />
                    <Text style={styles.label}>Endereço Completo</Text>
                    <TextInput style={styles.input} placeholder="Endereço completo" placeholderTextColor="#aaa" />
                    <Text style={styles.label}>Telefone</Text>
                    <TextInput style={styles.input} placeholder="Telefone" placeholderTextColor="#aaa" />

                    <Text style={styles.sectionTitle}>Questionário Florestal</Text>
                    <Text style={styles.label}>Área Total (m2) da sua residência</Text>
                    <TextInput style={styles.input} placeholder="Área Total (m2) da sua residência" placeholderTextColor="#aaa" />
                    <Text style={styles.label}>Número de moradores</Text>
                    <TextInput style={styles.input} placeholder="Quantos moradores?" placeholderTextColor="#aaa" />
                    <Text style={styles.label}>Possui animais de estimação</Text>
                    <TextInput style={styles.input} placeholder="Vivem animais?" placeholderTextColor="#aaa" />
                    <Text style={styles.label}>Possui histórico de incêndios próximos</Text>
                    <TextInput style={styles.input} placeholder="histórico de incêndios na região?" placeholderTextColor="#aaa" />
                    <Text style={styles.label}>Faz uso do solo para alguma atividade</Text>
                    <TextInput style={styles.input} placeholder="Faz uso de alguma atividade?" placeholderTextColor="#aaa" />
                    <Text style={styles.label}>Se sim, qual atividade?</Text>
                    <TextInput style={styles.input} placeholder="Qual atividade?" placeholderTextColor="#aaa" />

                    <TouchableOpacity style={styles.botao} disabled>
                        <Text style={styles.textoBotao}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4B4949',
        padding: 20,
    },
    scrollContent: {
        alignItems: 'center',
        paddingBottom: 80,
    },
    card: {
        backgroundColor: '#1E1E1E',
        width: '92%',
        padding: 25,
        borderRadius: 12,
        shadowColor: '#6db913',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginTop:30
    },
    contentWrapper: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 19,
        color: '#6db913',
        marginBottom: 35,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    input: {
        backgroundColor: '#4B4949',
        borderRadius: 8,
        padding: 12,
        color: '#fff',
        fontSize: 16,
        marginBottom: 34,
    },
    botao: {
        backgroundColor: '#6db913',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginTop: 25,
    },
    textoBotao: {
        color: '#fff',
        fontSize: 18,
        letterSpacing: 1,
    },
    label: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 11,
    },
});
