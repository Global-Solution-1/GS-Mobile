import React from 'react';
import { View, Text, Image, Linking, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const equipe = [
  {
    nome: 'Gabriela De Sousa Reis',
    rm: 'RM558830',
    imagem: require('../../assets/gabriela.png'),
    github: 'https://github.com/Gabriela-Reiss',
    linkedin: 'https://www.linkedin.com/in/dev-gabrielareis/',
  },
  {
    nome: 'Laura Amadeu Soares',
    rm: 'RM566690',
    imagem: require('../../assets/laura.png'),
    github: 'https://github.com/lauraamadeu5',
    linkedin: 'https://www.linkedin.com/in/laura-amadeu-0995a22b6/',
  },
  {
    nome: 'Raphael Lamaison Kim',
    rm: 'RM557914',
    imagem: require('../../assets/raphael.png'),
    github: 'https://github.com/RaphaelKim21',
    linkedin: 'https://www.linkedin.com/in/raphael-kim-48b26630b/',
  },
];

export default function TelaEquipe() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Nossa Equipe</Text>

      {equipe.map((p, idx) => (
        <View key={idx} style={styles.card}>
          <Image source={p.imagem} style={styles.imagem} />
          <View style={styles.info}>
            <Text style={styles.nome}>{p.nome}</Text>
            <Text style={styles.rm}>{p.rm}</Text>
            <View style={styles.icones}>
              <TouchableOpacity onPress={() => Linking.openURL(p.github)}>
                <Image source={require('../../assets/githubb.png')} style={styles.icone} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL(p.linkedin)}>
                <Image source={require('../../assets/linkedinn.png')} style={styles.icone} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4b4949',
    padding: 20,
    flex: 1,
  },
  titulo: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#4b4949',
    borderRadius: 12,
    padding: 15,
    marginBottom: 25,
    alignItems: 'center',
  },
  imagem: {
    width: 100,
    height: 160,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  nome: {
    fontSize: 18,
    color: '#fff',
  },
  rm: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 5,
    opacity: 0.9,
    marginLeft:50,
    marginTop: 10,
  },
  icones: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft:55
  },
  icone: {
    width: 28,
    height: 28,
    marginRight: 15,
    tintColor: '#fff',
  },
});
