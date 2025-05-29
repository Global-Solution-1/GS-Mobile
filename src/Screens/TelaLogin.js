import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

export default function TelaLogin({ navigation }) {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <Text style={{ fontSize: 17, color: '#fff', marginBottom: 80, marginTop: 50 }}>Autenticação para acesso</Text>
            <View style={styles.card}>
                <View style={styles.contentWrapper}>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>E-mail de Usuário</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o seu Email"
                            placeholderTextColor="#888"
                        />
                    </View>

                    <View style={styles.inputContainer2}>
                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite sua senha"
                            placeholderTextColor="#888"
                        />
                    </View>

                    <TouchableOpacity style={styles.botao} disabled>
                        <Text style={styles.textoBotao}>Acessar</Text>
                    </TouchableOpacity>


                </View>
            </View>

            <View style={styles.card2}>
                <Text style={styles.subtitulo}>É um morador de região florestal {"\n"}ou convive nesses locais?</Text>

                <TouchableOpacity
                    style={styles.linkContainer}
                    onPress={() => navigation.navigate('TelaCadastroU')}
                >
                <Text style={styles.linkTexto}>Junte-se a comunidade</Text>
                </TouchableOpacity>

                <Image
                    style={styles.imagem}
                    source={require('../../assets/juntos.png')}
                    resizeMode="contain"
                />
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
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
    card: {
        backgroundColor: '#1E1E1E',
        width: '92%',
        height: 480,
        padding: 25,
        marginBottom: 110,
        borderRadius: 12,
    },
    card2: {
        backgroundColor: '#1E1E1E',
        width: '92%',
        height: 200,
        padding: 25,
        borderRadius: 12,
        marginBottom: 100,
        shadowColor: '#6db913',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'center',
    },
    contentWrapper: {
        marginTop: 30,
    },
    inputContainer: {
        marginBottom: 70,
    },
    inputContainer2: {
        marginBottom: 50,
    },
    label: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 11,
    },
    input: {
        backgroundColor: '#4B4949',
        borderRadius: 8,
        padding: 12,
        color: '#fff',
        fontSize: 16,
    },
    botao: {
        backgroundColor: '#6db913',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginTop: 30,
    },
    textoBotao: {
        color: '#fff',
        fontSize: 18,
        letterSpacing: 1,
    },
    subtitulo: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 9,
        opacity: 0.9,
    },
    linkContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    linkTexto: {
        color: '#6db913',
        fontSize: 15,
        textDecorationLine: 'underline',
    },
    imagem: {
        width: 30,
        height: 30,
        alignSelf: 'center',
        marginTop: 15,
    }
});
