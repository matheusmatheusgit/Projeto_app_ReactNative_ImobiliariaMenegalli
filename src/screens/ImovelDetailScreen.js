// src/screens/ImovelDetailScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SliderBox } from 'react-native-image-slider-box';

const { width } = Dimensions.get('window');

const ImovelDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { imovel } = route.params;

  const handleContactPress = () => {
    navigation.navigate('Contact', { imovelTitle: imovel.title });
  };

  const handleWhatsAppPress = () => {
    const phoneNumber = '5519999999999'; // Número fictício da Imobiliária Menegalli (com código do país e DDD)
    const message = `Olá, tenho interesse no imóvel: <span class="math-inline">\{imovel\.title\} \(</span>{imovel.location}). Poderíamos conversar mais sobre ele?`;
    const url = `whatsapp://send?phone=<span class="math-inline">\{phoneNumber\}&text\=</span>{encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      alert('Por favor, instale o WhatsApp.');
    });
  };

  return (
    <ScrollView style={styles.container}>
      {imovel.images && imovel.images.length > 0 && (
        <SliderBox
          images={imovel.images}
          dotColor="#28a745"
          inactiveDotColor="#90A4AE"
          sliderBoxHeight={250}
          onCurrentImagePressed={(index) => console.warn(`image ${index} pressed`)}
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
          ImageComponentStyle={{ borderRadius: 15, width: '97%', marginTop: 5 }}
          autoplayInterval={5000}
        />
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{imovel.title}</Text>
        <Text style={styles.location}>{imovel.location}</Text>
        <Text style={styles.price}>{imovel.price}</Text>

        <View style={styles.detailsContainer}>
          <DetailItem icon="📐" label="Área" value={imovel.area} />
          {imovel.bedrooms > 0 && <DetailItem icon="🛏️" label="Quartos" value={imovel.bedrooms} />}
          {imovel.bathrooms > 0 && <DetailItem icon="🛁" label="Banheiros" value={imovel.bathrooms} />}
          <DetailItem icon="🏡" label="Tipo" value={imovel.type} />
          <DetailItem icon="🏷️" label="Status" value={imovel.status} />
        </View>

        <Text style={styles.descriptionHeader}>Descrição:</Text>
        <Text style={styles.description}>{imovel.description}</Text>

        <TouchableOpacity style={styles.contactButton} onPress={handleContactPress}>
          <Text style={styles.contactButtonText}>Entrar em Contato com a Menegalli</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsAppPress}>
          <Text style={styles.whatsappButtonText}>Fale Conosco pelo WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailIcon}>{icon}</Text>
    <View>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  image: {
    width: width,
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%', // Adjust as needed for spacing
    marginBottom: 10,
  },
  detailIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  detailLabel: {
    fontSize: 13,
    color: '#777',
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
  },
  descriptionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 30,
  },
  contactButton: {
    backgroundColor: '#007bff', // Blue
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  whatsappButton: {
    backgroundColor: '#25D366', // WhatsApp green
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  whatsappButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ImovelDetailScreen;