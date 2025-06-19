import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  TextInput, 
  ScrollView, 
  Dimensions, 
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const estateImages = [
  require('../assets/real_estate_land.png'),
  require('../assets/real_estate_residential.png'),
  require('../assets/real_estate_commercial.png'),
  require('../assets/real_estate_industrial.png'),
];

// Helper to get image URL from API property
function getImageSource(item) {
  if (item.images && item.images.length > 0) {
    const img = item.images[0];
    if (typeof img === 'string') {
      return { uri: img };
    } else if (img && typeof img === 'object' && typeof img.url === 'string') {
      return { uri: img.url };
    }
  }
  return require('../assets/real_estate_residential.png');
}

const FeaturedEstate = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { agency } = route.params || {};

  // API states
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch agency properties from API
  useEffect(() => {
    console.log('FeaturedEstate mounted with agency:', agency);
    if (agency && agency.id) {
      console.log('Agency ID found:', agency.id, 'Type:', typeof agency.id);
      fetchAgencyProperties(agency.id);
    } else {
      console.log('No agency or agency.id found:', agency);
      setError('No agency information provided');
      setLoading(false);
    }
  }, [agency]);

  const fetchAgencyProperties = async (agencyId) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching agency properties for agency ID:', agencyId);
      const token = await AsyncStorage.getItem('authToken');
      console.log('Using token:', token ? 'Token exists' : 'No token');
      
      // Use GET method with query parameters since API only supports GET
      const response = await fetch(`http://jagha.com/api/agency-properties?agency_id=${agencyId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response body:', errorText);
        
        if (response.status === 401) {
          await AsyncStorage.removeItem('authToken');
          navigation.navigate('Login');
          throw new Error('Please login again');
        }
        throw new Error(`Failed to fetch agency properties: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('API response:', result);
      
      if (result.success && result.data) {
        setProperties(result.data);
        console.log('Properties set:', result.data.length, 'items');
      } else if (result.data) {
        // Handle case where success might not be in response
        setProperties(result.data);
        console.log('Properties set:', result.data.length, 'items');
      } else {
        console.log('Invalid response format:', result);
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching agency properties:', err);
      console.error('Error details:', err.message);
      setError(err.message);
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter properties based on search query
  const filteredProperties = searchQuery.trim().length > 0 
    ? properties.filter(property => 
        (property.title && property.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (property.type && property.type.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (property.city_id && String(property.city_id).toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : properties;

  // Render property card
  const renderPropertyCard = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      onPress={() => navigation.navigate('PropertyDetails', {
        propertyId: item.id,
        property: {
          image: getImageSource(item),
          price: item.price ? `Rs. ${item.price}` : 'Price on Request',
          location: item.city_id ? String(item.city_id) : 'N/A',
          type: item.type || 'Property',
          size: item.land_area ? `${item.land_area} ${item.area_unit}` : 'N/A',
          featured: item.premium_listing || false,
          title: item.title || 'Property',
        }
      })}
    >
      <View style={{position:'relative'}}>
        <Image source={getImageSource(item)} style={styles.cardImage} />
        <View style={styles.heartCircle}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>♥</Text>
        </View>
        <View style={styles.badgesRow}>
          <View style={styles.badgeForSale}>
            <Text style={styles.badgeText}>{item.type || 'Property'}</Text>
          </View>
          {item.premium_listing && (
            <View style={styles.badgeFeatured}>
              <Text style={styles.badgeText}>Featured</Text>
            </View>
          )}
        </View>
      </View>
      <Text style={styles.cardPrice}>
        {item.price ? `Rs. ${item.price}` : 'Price on Request'}
      </Text>
      <Text style={styles.cardLocation}>{item.city_id ? String(item.city_id) : 'N/A'}</Text>
      <Text style={styles.cardForSale}>{item.type || 'Property'}</Text>
      <View style={styles.cardDetailsRow}>
        <Image source={require('../assets/size_icon.png')} style={styles.cardDetailIcon} />
        <Text style={styles.cardDetailText}>
          {item.land_area ? `${item.land_area} ${item.area_unit}` : 'Size N/A'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back_arrow.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerBtn}>
          <Image source={require('../assets/group.png')} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>

      {/* Agency Info */}
      {agency && (
        <View style={styles.agencyInfo}>
          <Image 
            source={agency.logo ? {uri: agency.logo} : require('../assets/real_estate_residential.png')} 
            style={styles.agencyLogo} 
          />
          <View style={styles.agencyDetails}>
            <Text style={styles.agencyName}>{agency.title || agency.name || 'Agency Name'}</Text>
            <Text style={styles.agencyLocation}>{agency.city || agency.location || 'Location'}</Text>
          </View>
        </View>
      )}

      {/* Title & Subtitle */}
      <Text style={styles.title}>Agency Properties</Text>
      <Text style={styles.subtitle}>
        {agency ? `${agency.title || agency.name || 'Agency'}'s properties` : 'Properties from this agency'}
      </Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Image source={require('../assets/search.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search agency properties"
          placeholderTextColor="#BFC5D2"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Properties Count & View Toggle */}
      <View style={styles.propertiesRow}>
        <Text style={styles.propertiesCount}>
          <Text style={{fontWeight:'700'}}>{filteredProperties.length}</Text> Properties
        </Text>
      </View>

      {/* Loading State */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFD225" />
          <Text style={styles.loadingText}>Loading agency properties...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorEmoji}>😕</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={() => agency && agency.id ? fetchAgencyProperties(agency.id) : null}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : filteredProperties.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>😕</Text>
          <Text style={styles.emptyText}>
            {searchQuery.trim().length > 0 ? 'No properties found matching your search' : 'No properties available from this agency'}
          </Text>
        </View>
      ) : (
        /* Properties Grid */
        <FlatList
          data={filteredProperties}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.cardsGrid}
          renderItem={renderPropertyCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.cardsContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 64 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 24, marginBottom: 12 },
  headerBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F5F5F7', alignItems: 'center', justifyContent: 'center' },
  headerIcon: { width: 18, height: 18, tintColor: '#252B5C' },
  featuredGrid: { flexDirection: 'row', marginHorizontal: 24, marginBottom: 16 },
  mainImage: { width: width*0.52, height: width*0.52, borderRadius: 18, marginRight: 8 },
  sideImages: { flexDirection: 'column', justifyContent: 'space-between' },
  sideImage: { width: width*0.32, height: width*0.25, borderRadius: 18, marginBottom: 8 },
  title: { fontSize: 24, fontWeight: '700', color: '#252B5C', marginHorizontal: 24, marginTop: 8 },
  subtitle: { fontSize: 14, color: '#7B7B93', marginHorizontal: 24, marginBottom: 12 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F7', borderRadius: 16, marginHorizontal: 24, paddingHorizontal: 12, marginBottom: 12, height: 48 },
  searchIcon: { width: 20, height: 20, tintColor: '#BFC5D2', marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: '#252B5C' },
  micIcon: { width: 20, height: 20, tintColor: '#BFC5D2', marginLeft: 8 },
  propertiesRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 24, marginBottom: 8 },
  propertiesCount: { fontSize: 18, color: '#252B5C' },
  toggleBtns: { flexDirection: 'row', gap: 8 },
  toggleIcon: { width: 28, height: 28, tintColor: '#BFC5D2', marginLeft: 8 },
  cardsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 24, paddingBottom: 24 },
  card: { width: (width-72)/2, backgroundColor: '#fff', borderRadius: 18, marginBottom: 18, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2, padding: 10 },
  cardImage: { width: '100%', height: 120, borderRadius: 14 },
  heartCircle: { position: 'absolute', top: 10, right: 10, backgroundColor: '#7ED957', borderRadius: 16, width: 32, height: 32, alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  heartIcon: { width: 18, height: 18, tintColor: '#fff' },
  badgesRow: { position: 'absolute', left: 10, right: 10, bottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 },
  badgeForSale: { backgroundColor: '#117C3E', borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2, marginRight: 8 },
  badgeFeatured: { backgroundColor: '#B89B2B', borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  cardPrice: { fontWeight: '700', color: '#252B5C', fontSize: 15, marginTop: 4, marginBottom: 2 },
  cardLocation: { color: '#7B7B93', fontSize: 13 },
  cardForSale: { color: '#117C3E', fontSize: 12, fontWeight: '600' },
  cardDetailsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  cardDetailIcon: { width: 16, height: 16, tintColor: '#B89B2B', marginRight: 4 },
  cardDetailText: { color: '#B89B2B', fontSize: 12, fontWeight: '600' },
  agencyInfo: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 24, marginBottom: 12 },
  agencyLogo: { width: 40, height: 40, borderRadius: 20, marginRight: 8 },
  agencyDetails: { flexDirection: 'column' },
  agencyName: { fontSize: 18, fontWeight: '700', color: '#252B5C' },
  agencyLocation: { fontSize: 14, color: '#7B7B93' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16, fontWeight: '700', color: '#252B5C', marginTop: 12 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorEmoji: { fontSize: 24, fontWeight: '700', color: '#252B5C', marginBottom: 12 },
  errorText: { fontSize: 16, fontWeight: '700', color: '#252B5C', marginBottom: 12 },
  retryButton: { backgroundColor: '#FFD225', borderRadius: 8, padding: 12 },
  retryButtonText: { fontSize: 16, fontWeight: '700', color: '#252B5C' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyEmoji: { fontSize: 24, fontWeight: '700', color: '#252B5C', marginBottom: 12 },
  emptyText: { fontSize: 16, fontWeight: '700', color: '#252B5C', marginBottom: 12 },
  cardsContainer: { paddingBottom: 24 },
});

export default FeaturedEstate; 