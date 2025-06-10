// src/screens/ImovelListScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DUMMY_IMOVEIS = [
  {
    id: '1',
    title: 'Luxuoso Apartamento no Alphaville',
    location: 'Alphaville, Piracicaba',
    price: 'R$ 2.500.000',
    area: '250m²',
    bedrooms: 3,
    bathrooms: 4,
    description: 'Espetacular apartamento de alto padrão com vista panorâmica da cidade. 3 suítes, living amplo, varanda gourmet e 4 vagas de garagem. Condomínio com lazer completo.',
    images: [
      'https://picsum.photos/id/1018/600/400',
      'https://picsum.photos/id/1015/600/400',
      'https://picsum.photos/id/1019/600/400',
    ],
    type: 'Apartamento',
    status: 'Venda'
  },
  {
    id: '2',
    title: 'Casa em Condomínio Fechado - Damha',
    location: 'Condomínio Damha, Piracicaba',
    price: 'R$ 1.800.000',
    area: '300m²',
    bedrooms: 4,
    bathrooms: 5,
    description: 'Casa moderna e espaçosa em condomínio de alto padrão. 4 suítes, piscina, área gourmet e paisagismo impecável. Segurança 24h.',
    images: [
      'https://picsum.photos/id/1025/600/400',
      'https://picsum.photos/id/1026/600/400',
      'https://picsum.photos/id/1027/600/400',
    ],
    type: 'Casa',
    status: 'Venda'
  },
  {
    id: '3',
    title: 'Cobertura Duplex no Centro',
    location: 'Centro, Piracicaba',
    price: 'R$ 1.200.000',
    area: '180m²',
    bedrooms: 2,
    bathrooms: 3,
    description: 'Cobertura duplex com vista deslumbrante da cidade. Design moderno, terraço privativo com churrasqueira e jacuzzi. Localização privilegiada.',
    images: [
      'https://picsum.photos/id/1030/600/400',
      'https://picsum.photos/id/1031/600/400',
      'https://picsum.photos/id/1032/600/400',
    ],
    type: 'Cobertura',
    status: 'Venda'
  },
  {
    id: '4',
    title: 'Terreno Comercial - Região de Santa Terezinha',
    location: 'Santa Terezinha, Piracicaba',
    price: 'R$ 750.000',
    area: '500m²',
    bedrooms: 0,
    bathrooms: 0,
    description: 'Excelente terreno comercial em avenida de grande movimento. Ideal para construção de galpão, loja ou escritório. Próximo a comércios e serviços.',
    images: [
      'https://picsum.photos/id/1040/600/400',
      'https://picsum.photos/id/1041/600/400',
    ],
    type: 'Terreno',
    status: 'Venda'
  },
  {
    id: '5',
    title: 'Fazenda de Lazer - Charqueada',
    location: 'Zona Rural, Charqueada (Região de Piracicaba)',
    price: 'R$ 3.500.000',
    area: '10.000m²', // 1 hectare
    bedrooms: 5,
    bathrooms: 6,
    description: 'Linda fazenda com sede colonial, piscina, churrasqueira, campo de futebol, pomar e nascente. Ideal para lazer ou investimento. Ótima localização.',
    images: [
      'https://picsum.photos/id/1050/600/400',
      'https://picsum.photos/id/1051/600/400',
      'https://picsum.photos/id/1052/600/400',
    ],
    type: 'Sítio/Fazenda',
    status: 'Venda'
  }
];

const ImovelListScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [filteredImoveis, setFilteredImoveis] = useState(DUMMY_IMOVEIS);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const newData = DUMMY_IMOVEIS.filter((item) => {
        const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredImoveis(newData);
    } else {
      setFilteredImoveis(DUMMY_IMOVEIS);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ImovelDetail', { imovel: item })}
    >
      <Image source={{ uri: item.images[0] }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardLocation}>{item.location}</Text>
        <Text style={styles.cardPrice}>{item.price}</Text>
        <View style={styles.cardDetails}>
          <Text style={styles.detailText}>{item.area}</Text>
          {item.bedrooms > 0 && <Text style={styles.detailText}>{item.bedrooms} {item.bedrooms === 1 ? 'quarto' : 'quartos'}</Text>}
          {item.bathrooms > 0 && <Text style={styles.detailText}>{item.bathrooms} {item.bathrooms === 1 ? 'banheiro' : 'banheiros'}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar imóveis..."
          value={searchText}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filteredImoveis}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={styles.emptyListText}>Nenhum imóvel encontrado.</Text>}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  searchInput: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    margin: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  cardLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  cardPrice: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#28a745', // Green color for price
    marginBottom: 10,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  detailText: {
    fontSize: 13,
    color: '#777',
    marginRight: 10,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#777',
  },
});

export default ImovelListScreen;