import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Location-specific images for the featured grid
const locationImages = {
  'Islamabad': [
    require('../assets/real_estate_residential.png'),
    require('../assets/real_estate_commercial.png'),
    require('../assets/real_estate_land.png'),
    require('../assets/real_estate_industrial.png'),
  ],
  'Lahore': [
    require('../assets/real_estate_residential.png'),
    require('../assets/real_estate_commercial.png'),
    require('../assets/real_estate_land.png'),
    require('../assets/real_estate_industrial.png'),
  ],
  'Karachi': [
    require('../assets/real_estate_residential.png'),
    require('../assets/real_estate_commercial.png'),
    require('../assets/real_estate_land.png'),
    require('../assets/real_estate_industrial.png'),
  ],
  'Rawalpindi': [
    require('../assets/real_estate_residential.png'),
    require('../assets/real_estate_commercial.png'),
    require('../assets/real_estate_land.png'),
    require('../assets/real_estate_industrial.png'),
  ],
};

// Mock listings data (should match Home.js)
const listings = [
  {
    id: 1,
    image: require('../assets/real_estate_residential.png'),
    price: '50 Lac to 1 Crore',
    location: 'Islamabad',
    type: 'House',
    size: '5 - 10 Marla',
    featured: true,
  },
  {
    id: 2,
    image: require('../assets/real_estate_commercial.png'),
    price: '60 Lac to 1.2 Crore',
    location: 'Lahore',
    type: 'Apartment',
    size: '1 - 3 Marla',
    featured: true,
  },
  {
    id: 3,
    image: require('../assets/real_estate_land.png'),
    price: '1.5 Crore',
    location: 'Karachi',
    type: 'Farm House',
    size: '10 Marla',
    featured: false,
  },
  {
    id: 4,
    image: require('../assets/real_estate_residential.png'),
    price: '80 Lac',
    location: 'Rawalpindi',
    type: 'House',
    size: '7 Marla',
    featured: false,
  },
];

const LocationListings = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { location } = route.params;
  const [searchQuery, setSearchQuery] = useState('');

  // Filter listings based on location and search query
  const filteredListings = listings
    .filter(l => l.location === location)
    .filter(l => 
      searchQuery.trim().length === 0 ||
      l.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.price.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.size.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const currentLocationImages = locationImages[location] || locationImages['Islamabad'];

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: '#fff' }}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
            <Image source={require('../assets/back_arrow.png')} style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn}>
            <Image source={require('../assets/group.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>

        {/* Featured Images Grid */}
        <View style={styles.featuredGrid}>
          <Image source={currentLocationImages[0]} style={styles.mainImage} />
          <View style={styles.sideImages}>
            <Image source={currentLocationImages[1]} style={styles.sideImage} />
            <Image source={currentLocationImages[2]} style={styles.sideImage} />
          </View>
        </View>

        {/* Title & Subtitle */}
        <Text style={styles.title}>{location} Properties</Text>
        <Text style={styles.subtitle}>Find your dream property in {location}.</Text>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Image source={require('../assets/search.png')} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={`Search properties in ${location}`}
            placeholderTextColor="#BFC5D2"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Properties Count */}
        <View style={styles.propertiesRow}>
          <Text style={styles.propertiesCount}>
            <Text style={{fontWeight:'700'}}>{filteredListings.length}</Text> Properties
            {searchQuery.trim().length > 0 && (
              <Text style={styles.searchQueryText}> for "{searchQuery}"</Text>
            )}
          </Text>
        </View>

        {/* Properties Grid */}
        {filteredListings.length === 0 ? (
          <View style={styles.emptyStateWrapper}>
            <Text style={styles.emptyStateEmoji}>😕</Text>
            <Text style={styles.emptyStateTitle}>
              {searchQuery.trim().length > 0 
                ? `No properties found matching "${searchQuery}"`
                : `No properties found in ${location}`}
            </Text>
            {searchQuery.trim().length > 0 && (
              <TouchableOpacity 
                style={styles.clearSearchButton}
                onPress={() => setSearchQuery('')}
              >
                <Text style={styles.clearSearchButtonText}>Clear Search</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.cardsGrid} showsVerticalScrollIndicator={false}>
            {filteredListings.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => navigation.navigate('PropertyDetails', { property: item })}
              >
                <View style={{position:'relative'}}>
                  <Image source={item.image} style={styles.cardImage} />
                  <View style={styles.heartCircle}>
                    <Image source={require('../assets/heart.png')} style={styles.heartIcon} />
                  </View>
                  <View style={styles.badgesRow}>
                    <View style={styles.badgeForSale}>
                      <Text style={styles.badgeText}>{item.type}</Text>
                    </View>
                    {item.featured && (
                      <View style={styles.badgeFeatured}>
                        <Text style={styles.badgeText}>Featured</Text>
                      </View>
                    )}
                  </View>
                </View>
                <Text style={styles.cardPrice}>{item.price}</Text>
                <Text style={styles.cardLocation}>{item.location}</Text>
                <Text style={styles.cardForSale}>{item.type}</Text>
                <View style={styles.cardDetailsRow}>
                  <Image source={require('../assets/size_icon.png')} style={styles.cardDetailIcon} />
                  <Text style={styles.cardDetailText}>{item.size}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 64 },
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginHorizontal: 24, 
    marginBottom: 12 
  },
  headerBtn: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    backgroundColor: '#F5F5F7', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  headerIcon: { 
    width: 18, 
    height: 18, 
    tintColor: '#252B5C' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: '700', 
    color: '#252B5C', 
    marginHorizontal: 24, 
    marginTop: 8 
  },
  subtitle: { 
    fontSize: 14, 
    color: '#7B7B93', 
    marginHorizontal: 24, 
    marginBottom: 12 
  },
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F5F5F7', 
    borderRadius: 16, 
    marginHorizontal: 24, 
    paddingHorizontal: 12, 
    marginBottom: 12, 
    height: 48 
  },
  searchIcon: { 
    width: 20, 
    height: 20, 
    tintColor: '#BFC5D2', 
    marginRight: 8 
  },
  searchInput: { 
    flex: 1, 
    fontSize: 16, 
    color: '#252B5C' 
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  clearButtonText: {
    color: '#7B7B93',
    fontSize: 12,
    fontWeight: '600',
  },
  searchQueryText: {
    color: '#7B7B93',
    fontSize: 16,
    marginLeft: 4,
  },
  clearSearchButton: {
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 16,
  },
  clearSearchButtonText: {
    color: '#252B5C',
    fontSize: 14,
    fontWeight: '600',
  },
  propertiesRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginHorizontal: 24, 
    marginBottom: 8 
  },
  propertiesCount: { 
    fontSize: 18, 
    color: '#252B5C' 
  },
  cardsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    paddingHorizontal: 24, 
    paddingBottom: 24 
  },
  card: { 
    width: (width-72)/2, 
    backgroundColor: '#fff', 
    borderRadius: 18, 
    marginBottom: 18, 
    shadowColor: '#000', 
    shadowOpacity: 0.06, 
    shadowRadius: 8, 
    elevation: 2, 
    padding: 10 
  },
  cardImage: { 
    width: '100%', 
    height: 120, 
    borderRadius: 14 
  },
  heartCircle: { 
    position: 'absolute', 
    top: 10, 
    right: 10, 
    backgroundColor: '#7ED957', 
    borderRadius: 16, 
    width: 32, 
    height: 32, 
    alignItems: 'center', 
    justifyContent: 'center', 
    zIndex: 2 
  },
  heartIcon: { 
    width: 18, 
    height: 18, 
    tintColor: '#fff' 
  },
  badgesRow: { 
    position: 'absolute', 
    left: 10, 
    right: 10, 
    bottom: 10, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    zIndex: 2 
  },
  badgeForSale: { 
    backgroundColor: '#117C3E', 
    borderRadius: 8, 
    paddingHorizontal: 6, 
    paddingVertical: 2, 
    marginRight: 8 
  },
  badgeFeatured: { 
    backgroundColor: '#B89B2B', 
    borderRadius: 8, 
    paddingHorizontal: 6, 
    paddingVertical: 2 
  },
  badgeText: { 
    color: '#fff', 
    fontSize: 11, 
    fontWeight: '600' 
  },
  cardPrice: { 
    fontWeight: '700', 
    color: '#252B5C', 
    fontSize: 15, 
    marginTop: 4, 
    marginBottom: 2 
  },
  cardLocation: { 
    color: '#7B7B93', 
    fontSize: 13 
  },
  cardForSale: { 
    color: '#117C3E', 
    fontSize: 12, 
    fontWeight: '600' 
  },
  cardDetailsRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 4 
  },
  cardDetailIcon: { 
    width: 16, 
    height: 16, 
    tintColor: '#B89B2B', 
    marginRight: 4 
  },
  cardDetailText: { 
    color: '#B89B2B', 
    fontSize: 12, 
    fontWeight: '600' 
  },
  emptyStateWrapper: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 32, 
    marginTop: 32 
  },
  emptyStateEmoji: { 
    fontSize: 60, 
    marginBottom: 16 
  },
  emptyStateTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#252B5C', 
    marginBottom: 8, 
    textAlign: 'center' 
  },
  featuredGrid: { 
    flexDirection: 'row', 
    marginHorizontal: 24, 
    marginBottom: 16 
  },
  mainImage: { 
    width: width*0.52, 
    height: width*0.52, 
    borderRadius: 18, 
    marginRight: 8 
  },
  sideImages: { 
    flexDirection: 'column', 
    justifyContent: 'space-between' 
  },
  sideImage: { 
    width: width*0.32, 
    height: width*0.25, 
    borderRadius: 18, 
    marginBottom: 8 
  },
});

export default LocationListings; 