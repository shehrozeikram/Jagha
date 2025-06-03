import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;

const listings = [
  {
    id: 1,
    image: require('../assets/real_estate_residential.png'),
    price: '45.5 Lac to 2 Crore PKR',
    location: 'Rawalpindi',
    type: 'House',
    size: '5 - 10 Marla',
    featured: true,
  },
  {
    id: 2,
    image: require('../assets/real_estate_commercial.png'),
    price: '45.5 Lac to 2 Crore PKR',
    location: 'Islamabad',
    type: 'Apartment',
    size: '5 - 10 Marla',
    featured: true,
  },
  {
    id: 3,
    image: require('../assets/real_estate_residential.png'),
    price: '45.5 Lac to 2 Crore PKR',
    location: 'Rawalpindi',
    type: 'Farmhouse',
    size: '5 - 10 Marla',
    featured: true,
  },
  {
    id: 4,
    image: require('../assets/real_estate_commercial.png'),
    price: '45.5 Lac to 2 Crore PKR',
    location: 'Islamabad',
    type: 'House',
    size: '5 - 10 Marla',
    featured: true,
  },
];

const propertyTypes = ['All', 'House', 'Apartment', 'Farmhouse'];

const Search = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState('grid');
  const [selectedType, setSelectedType] = useState('All');

  // Filter listings based on search query and selected type
  const filteredListings = listings.filter(l => {
    const matchesType = selectedType === 'All' || l.type === selectedType;
    const matchesQuery = searchQuery.trim().length === 0 ||
      l.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.price.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesQuery;
  });

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardImgWrapper}>
        <Image source={item.image} style={styles.cardImg} />
        <View style={styles.badgeGreen}><Text style={styles.badgeGreenText}>{item.type}</Text></View>
        {item.featured && <View style={styles.badgeGold}><Text style={styles.badgeGoldText}>Featured</Text></View>}
        <TouchableOpacity style={styles.heartBtn}>
          <Image source={require('../assets/heart.png')} style={styles.heartIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.cardPrice}>{item.price}</Text>
      <View style={styles.cardRow}><Image source={require('../assets/location.png')} style={styles.locIcon} /><Text style={styles.locText}>{item.location}</Text></View>
      <Text style={styles.cardType}>{item.type}</Text>
      <View style={styles.cardRow}><Image source={require('../assets/size_icon.png')} style={styles.sizeIcon} /><Text style={styles.sizeText}>{item.size}</Text></View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: '#fff' }}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
            <View style={styles.headerCircle}><Text style={styles.headerIcon}>←</Text></View>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search results</Text>
          <TouchableOpacity style={styles.headerBtn}>
            <View style={styles.headerCircle}><Text style={styles.filterIcon}>⚙️</Text></View>
          </TouchableOpacity>
        </View>
        {/* Search Bar */}
        <View style={styles.searchBarWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="House For Sale"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#7B7B93"
          />
          <Text style={styles.searchBarIcon}>🔍</Text>
        </View>
        {/* Property Type Filter Buttons */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeFilterScroll} contentContainerStyle={styles.typeFilterContainer}>
          {propertyTypes.map(type => (
            <TouchableOpacity
              key={type}
              style={[styles.typeFilterBtn, selectedType === type && styles.typeFilterBtnActive]}
              onPress={() => setSelectedType(type)}
            >
              <Text style={[styles.typeFilterText, selectedType === type && styles.typeFilterTextActive]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* Results Info Row */}
        <View style={styles.resultsRow}>
          <Text style={styles.resultsText}>Found <Text style={styles.resultsCount}>{filteredListings.length}</Text> estates</Text>
          <View style={styles.toggleBtns}>
            <TouchableOpacity style={[styles.toggleBtn, viewType === 'grid' && styles.toggleBtnActive]} onPress={() => setViewType('grid')}>
              <Image source={require('../assets/group_search.png')} style={styles.toggleIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.toggleBtn, viewType === 'list' && styles.toggleBtnActive]} onPress={() => setViewType('list')}>
              <Image source={require('../assets/vector.png')} style={styles.toggleIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      {/* Listings Grid */}
      {filteredListings.length === 0 ? (
        <View style={styles.emptyStateWrapper}>
          <Text style={styles.emptyStateEmoji}>😕</Text>
          <Text style={styles.emptyStateTitle}>No properties found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredListings}
          renderItem={renderCard}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 8, marginBottom: 8 },
  headerBtn: {},
  headerCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F5F4F8', alignItems: 'center', justifyContent: 'center' },
  headerIcon: { fontSize: 22, color: '#252B5C' },
  filterIcon: { fontSize: 22, color: '#252B5C' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#252B5C', textAlign: 'center' },
  searchBarWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F4F8', borderRadius: 16, marginHorizontal: 16, paddingHorizontal: 16, height: 48, marginBottom: 16 },
  searchInput: { flex: 1, fontSize: 16, color: '#252B5C' },
  searchBarIcon: { fontSize: 20, color: '#7B7B93', marginLeft: 8 },
  typeFilterScroll: { marginBottom: 8, marginTop: 4 },
  typeFilterContainer: { paddingHorizontal: 12 },
  typeFilterBtn: { backgroundColor: '#F5F4F8', borderRadius: 20, paddingHorizontal: 18, paddingVertical: 8, marginRight: 8 },
  typeFilterBtnActive: { backgroundColor: '#FFD225' },
  typeFilterText: { color: '#7B7B93', fontSize: 14, fontWeight: '600' },
  typeFilterTextActive: { color: '#252B5C' },
  resultsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 16, marginBottom: 8 },
  resultsText: { color: '#7B7B93', fontWeight: '600', fontSize: 14, letterSpacing: 0.5 },
  resultsCount: { color: '#252B5C', fontWeight: '700', fontSize: 16 },
  toggleBtns: { flexDirection: 'row', alignItems: 'center' },
  toggleBtn: { backgroundColor: '#F5F4F8', borderRadius: 10, padding: 8, marginLeft: 8 },
  toggleBtnActive: { backgroundColor: '#FFD225' },
  toggleIcon: { width: 20, height: 20, tintColor: '#252B5C' },
  grid: { paddingHorizontal: 8, paddingBottom: 16 },
  card: { backgroundColor: '#F5F4F8', borderRadius: 18, width: CARD_WIDTH, margin: 8, padding: 10, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, elevation: 1 },
  cardImgWrapper: { position: 'relative' },
  cardImg: { width: '100%', height: 110, borderRadius: 14 },
  badgeGreen: { position: 'absolute', bottom: 8, left: 8, backgroundColor: '#117C3E', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 2, zIndex: 2 },
  badgeGreenText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  badgeGold: { position: 'absolute', bottom: 8, right: 8, backgroundColor: '#FFD225', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 2, zIndex: 2 },
  badgeGoldText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  heartBtn: { position: 'absolute', top: 8, right: 8, backgroundColor: '#fff', borderRadius: 16, width: 28, height: 28, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  heartIcon: { width: 18, height: 18, tintColor: '#E57373' },
  cardPrice: { color: '#252B5C', fontWeight: '700', fontSize: 15, marginTop: 8, marginBottom: 2 },
  cardRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  locIcon: { width: 14, height: 14, tintColor: '#117C3E', marginRight: 4 },
  locText: { color: '#7B7B93', fontSize: 13 },
  cardType: { color: '#117C3E', fontSize: 13, fontWeight: '600', marginBottom: 2 },
  sizeIcon: { width: 16, height: 16, tintColor: '#B89B2B', marginRight: 4 },
  sizeText: { color: '#B89B2B', fontSize: 13, fontWeight: '600' },
  emptyStateWrapper: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, marginTop: 32 },
  emptyStateEmoji: { fontSize: 60, marginBottom: 16 },
  emptyStateTitle: { fontSize: 18, fontWeight: '700', color: '#252B5C', marginBottom: 8, textAlign: 'center' },
});

export default Search; 