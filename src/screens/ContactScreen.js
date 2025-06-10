// src/screens/ContactScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const ContactScreen = () => {
  const route = useRoute();
  const { imovelTitle } = route.params || {};

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(
    imovelTitle ? `Olá, tenho interesse no imóvel: ${imovelTitle}.` : ''
  );

  const handleSubmit = () => {
    if (!name || !email || !phone || !message) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Aqui você integraria com um serviço de backend para enviar o email/mensagem
    // Por exemplo, uma API REST que envia emails para a Imobiliária Menegalli.
    console.log({ name, email, phone, message });
    Alert.alert(
      'Sucesso',
      'Sua mensagem foi enviada para a Imobiliária Menegalli. Em breve entraremos em contato!'
    );

    // Limpar formulário
    setName('');
    setEmail('');
    setPhone('');
    setMessage(imovelTitle ? `Olá, tenho interesse no imóvel: ${imovelTitle}.` : '');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.header}>Fale com a Imobiliária Menegalli</Text>
        <Text style={styles.subHeader}>
          Preencha o formulário abaixo e entraremos em contato em breve para tirar suas dúvidas ou agendar uma visita.
        </Text>

        <Text style={styles.label}>Nome Completo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Telefone (WhatsApp):</Text>
        <TextInput
          style={styles.input}
          placeholder="(99) 99999-9999"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.label}>Mensagem:</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Gostaria de mais informações sobre..."
          multiline
          numberOfLines={5}
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Enviar Mensagem</Text>
        </TouchableOpacity>

        <View style={styles.contactInfo}>
          <Text style={styles.infoTitle}>Outros Canais de Contato:</Text>
          <Text style={styles.infoText}>Telefone: (19) 34XX-XXXX</Text>
          <Text style={styles.infoText}>E-mail: contato@imobiliariamenegalli.com.br</Text>
          <Text style={styles.infoText}>Endereço: Rua Fictícia, 123 - Centro, Piracicaba/SP</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  formContainer: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#555',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  textArea: {
    height: 120,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingTop: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#28a745', // Green
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactInfo: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 15,
    color: '#666',
    marginBottom: 5,
  },
});

export default ContactScreen;