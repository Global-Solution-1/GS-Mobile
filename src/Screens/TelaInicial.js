import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function TelaInicio() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.heroContainer}>
        <Text style={styles.heroTitle}>FireAway</Text>
        <Text style={styles.heroSubtitle}>Protegendo vidas e florestas com tecnologia</Text>
        <View style={styles.heroDivider} />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="flame" size={28} color="#6db913" />
          <Text style={styles.sectionTitle}>O Problema</Text>
        </View>
        <Text style={styles.sectionText}>
          Incêndios florestais são desastres recorrentes que causam:
        </Text>
        
        <View style={styles.problemGrid}>
          <View style={styles.problemCard}>
            <FontAwesome5 name="kiwi-bird" size={25} color="#6db913" />
            <Text style={styles.problemText}>Perda de biodiversidade</Text>
          </View>
          <View style={styles.problemCard}>
            <MaterialIcons name="nature-people" size={25} color="#6db913" />
            <Text style={styles.problemText}>Destruição de ecossistemas</Text>
          </View>
          <View style={styles.problemCard}>
            <MaterialCommunityIcons name="home-alert" size={25} color="#6db913" />
            <Text style={styles.problemText}>Riscos à vida humana</Text>
          </View>
          <View style={styles.problemCard}>
            <Ionicons name="alert-circle-outline" size={25} color="#6db913" />
            <Text style={styles.problemText}>Falta de alerta em tempo hábil</Text>
          </View>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: '#4b4949' }]}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="verified" size={28} color="#6db913" />
          <Text style={[styles.sectionTitle, { color: '#6db913' }]}>A Solução FireAway</Text>
        </View>
        <Text style={[styles.sectionText, { color: '#fff' }]}>
          Sistema tecnológico integrado que combina:
        </Text>
        
        <View style={styles.solutionIcons}>
          <View style={styles.iconItem}>
            <MaterialCommunityIcons name="chip" size={30} color="#6db913" />
            <Text style={styles.iconText}>Sensores IoT</Text>
          </View>
          <View style={styles.iconItem}>
            <MaterialCommunityIcons name="drone" size={30} color="#6db913" />
            <Text style={styles.iconText}>Drones</Text>
          </View>
          <View style={styles.iconItem}>
            <MaterialIcons name="phone-android" size={30} color="#6db913" />
            <Text style={styles.iconText}>App Mobile</Text>
          </View>
          <View style={styles.iconItem}>
            <MaterialIcons name="dashboard" size={30} color="#6db913" />
            <Text style={styles.iconText}>Dashboard</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="cogs" size={28} color="#6db913" />
          <Text style={styles.sectionTitle}>Como Funciona</Text>
        </View>
        
        <View style={styles.stepContainer}>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Detecção Automatizada</Text>
              <Text style={styles.stepText}>
                Sensores IoT monitoram temperatura, umidade e fumaça em áreas de risco.
              </Text>
            </View>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Atuação Imediata</Text>
              <Text style={styles.stepText}>
                Alertas sonoros e visuais protegem animais e registram ocorrências.
              </Text>
            </View>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Drones em Campo</Text>
              <Text style={styles.stepText}>
                Sobrevoo da área, coleta de imagens e envio de dados de localização.
              </Text>
            </View>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>App Mobile</Text>
              <Text style={styles.stepText}>
                Alertas em tempo real, rotas de evacuação e relatos de focos de incêndio.
              </Text>
            </View>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>5</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Dashboard</Text>
              <Text style={styles.stepText}>
                Painel completo com status de sensores, localização de focos e histórico.
              </Text>
            </View>
          </View>
        </View>
      </View>

      

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="earth" size={28} color="#6db913" />
          <Text style={styles.sectionTitle}>Impacto Esperado</Text>
        </View>
        
        <View style={styles.impactGrid}>
          <View style={styles.impactCard}>
            <Text style={styles.impactEmoji}>🌿</Text>
            <Text style={styles.impactArea}>Meio ambiente</Text>
            <Text style={styles.impactBenefit}>Proteção da fauna e flora</Text>
          </View>
          <View style={styles.impactCard}>
            <Text style={styles.impactEmoji}>🧍‍♂️</Text>
            <Text style={styles.impactArea}>Comunidades</Text>
            <Text style={styles.impactBenefit}>Evacuação rápida e segura</Text>
          </View>
          <View style={styles.impactCard}>
            <Text style={styles.impactEmoji}>📡</Text>
            <Text style={styles.impactArea}>Governos e ONGs</Text>
            <Text style={styles.impactBenefit}>Monitoramento remoto</Text>
          </View>
          <View style={styles.impactCard}>
            <Text style={styles.impactEmoji}>🧠</Text>
            <Text style={styles.impactArea}>Educação</Text>
            <Text style={styles.impactBenefit}>Consciência ambiental</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderRight}>
          <Text style={styles.sectionTitleRight}>Proteção da Vida Animal</Text>
        </View>
        <View style={styles.contentWithImages}>
          <View style={styles.imagesContainer}>
            <Image
              source={require('../../assets/tucano.png')}
              style={styles.contentImage}
            />
            <Image
              source={require('../../assets/tigre.png')}
              style={styles.contentImage}
            />
          </View>
          <Text style={styles.sectionTextRight}>
            Inspirado no projeto Lion{"\n"}
            Lights e em estudos{"\n"}
            científicos, o FireAway utiliza{"\n"}
            alertas sonoros e luminosos{"\n"}
            para afastar animais de áreas{"\n"}
            de risco, reduzindo os{"\n"}
            impactos dos incêndios e{"\n"}
            protegendo a fauna.
          </Text>
        </View>
      </View>
      <View style={[styles.section, { backgroundColor: '#577235', paddingBottom: 40 }]}>
        <View style={styles.sectionHeaderFooter}>
          <Image
            source={require('../../assets/logo.png')}
            style={[styles.logo, {marginBottom: 10 }]}
            resizeMode="contain"
          />
 
          <Text style={styles.contactText}>Não hesite em nos contatar</Text>
          <Text style={styles.contactInfo}>FireAway@hotmail.com</Text>
          <Text style={styles.contactInfo}>0800-448-222</Text>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#4b4949',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    maxWidth: '80%',
  },
  heroDivider: {
    height: 4,
    width: 100,
    backgroundColor: '#6db913',
    marginTop: 20,
    borderRadius: 2,
  },
  section: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 12
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  sectionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 24,
    marginBottom: 15,
  },
  problemGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  problemCard: {
    width: '48%',
    backgroundColor: '#c6c6c6',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  problemText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
    width: 130
  },
  solutionIcons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  iconItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  stepContainer: {
    marginTop: 10,
  },
  step: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#6db913',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6db913',
    marginBottom: 5,
  },
  stepText: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
  },
  techCard: {
    backgroundColor: '#6db913',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  techHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  techTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  techText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 22,
  },
  impactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  impactCard: {
    width: '48%',
    backgroundColor: '#4b4949',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#6db913',
  },
  impactEmoji: {
    fontSize: 28,
    marginBottom: 5,
  },
  impactArea: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  impactBenefit: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 18,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6db913',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  sectionHeaderRight: {
    alignItems: 'flex-end',
    marginBottom: 15,
    marginTop: 12,
  },
  sectionTitleRight: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  contentWithImages: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  imagesContainer: {
    marginRight: 15,
    alignItems: 'center',
  },
  contentImage: {
    width: 120,
    height: 80,
    marginBottom: 5,
    resizeMode: 'contain'
  },
  sectionTextRight: {
    fontSize: 14,
    color: '#555',
    lineHeight: 24,
    flex: 1,
    textAlign: 'right',
  },
    logo: {
    width: 180,
    height: 50,
  },
  contactText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 15,
    paddingLeft: 10
  },
  contactInfo: {
    color: 'white',
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 15,
    paddingLeft: 10
  },
  sectionHeaderFooter: {
    width: '100%',
    paddingLeft: 2
  }
});