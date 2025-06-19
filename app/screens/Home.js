import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Modal,
  FlatList,
  Animated,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const categoryTabs = ['All', 'House', 'Plots', 'Apartment', 'Farm House'];

const topCards = [
  {
    id: 'farmhouse',
    image: require('../assets/real_estate_land.png'),
    title: 'Farm House',
    desc: 'Recently Added in Islamabad',
    badge: 'Featured',
    type: 'Farm House',
  },
  {
    id: 'land',
    image: require('../assets/real_estate_land.png'),
    title: 'Land',
    desc: 'Recently Added Land in Islamabad',
    badge: 'Land',
    type: 'Land',
  },
  {
    id: 'house1',
    image: require('../assets/real_estate_residential.png'),
    title: 'House',
    desc: 'Modern House in Lahore',
    badge: 'House',
    type: 'House',
  },
  {
    id: 'apartment1',
    image: require('../assets/real_estate_commercial.png'),
    title: 'Apartment',
    desc: 'Luxury Apartment in Karachi',
    badge: 'Apartment',
    type: 'Apartment',
  },
];

const cityOptions = [
  'Islamabad',
  'Lahore',
  'Karachi',
  'Rawalpindi',
  'Quetta',
  'Peshawar',
  'Swat',
];

const initialListings = [
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

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('Islamabad');
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const fabScale = useState(new Animated.Value(1))[0];

  // API states
  const [listings, setListings] = useState(initialListings);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Featured agencies state
  const [featuredAgencies, setFeaturedAgencies] = useState([]);
  const [featuredAgenciesLoading, setFeaturedAgenciesLoading] = useState(false);
  const [featuredAgenciesError, setFeaturedAgenciesError] = useState(null);

  // Popular properties state
  const [popularProperties, setPopularProperties] = useState([]);
  const [popularPropertiesLoading, setPopularPropertiesLoading] = useState(false);
  const [popularPropertiesError, setPopularPropertiesError] = useState(null);

  // Prepend new listing if passed from AddPropertyFeatures
  useEffect(() => {
    if (route.params?.newListing) {
      setListings(prev => [route.params.newListing, ...prev]);
      navigation.setParams({ newListing: undefined });
    }
  }, [route.params?.newListing]);

  // Fetch properties from API
  useEffect(() => {
    fetchProperties();
  }, []);

  // Fetch featured agencies from API
  useEffect(() => {
    fetchFeaturedAgencies();
  }, []);

  // Fetch popular properties from API
  useEffect(() => {
    fetchPopularProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch('http://jagha.com/api/all-properties?per_page=10', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          await AsyncStorage.removeItem('authToken');
          navigation.navigate('Login');
          throw new Error('Please login again');
        }
        throw new Error('Failed to fetch properties');
      }
      const result = await response.json();
      if (result.success && result.data?.data) {
        setProperties(result.data.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedAgencies = async () => {
    setFeaturedAgenciesLoading(true);
    setFeaturedAgenciesError(null);
    try {
      console.log('Fetching featured agencies...');
      const token = await AsyncStorage.getItem('authToken');
      console.log('Using token for featured agencies:', token ? 'Token exists' : 'No token');
      
      const response = await fetch('http://jagha.com/api/featured-agencies', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
      
      console.log('Featured agencies response status:', response.status);
      console.log('Featured agencies response headers:', response.headers);
      
      if (!response.ok) {
        if (response.status === 401) {
          console.log('Unauthorized - token might be invalid');
          await AsyncStorage.removeItem('authToken');
          navigation.navigate('Login');
          throw new Error('Please login again');
        }
        const errorText = await response.text();
        console.log('Featured agencies error response:', errorText);
        throw new Error(`Failed to fetch featured agencies: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('Featured agencies API response:', result);
      
      if (result.data) {
        setFeaturedAgencies(result.data);
        console.log('Featured agencies set:', result.data.length, 'items');
      } else {
        console.log('No data in featured agencies response');
        setFeaturedAgencies([]);
      }
    } catch (err) {
      console.error('Error fetching featured agencies:', err);
      console.error('Error details:', err.message);
      setFeaturedAgenciesError(err.message);
      setFeaturedAgencies([]);
    } finally {
      setFeaturedAgenciesLoading(false);
    }
  };

  const fetchPopularProperties = async () => {
    setPopularPropertiesLoading(true);
    setPopularPropertiesError(null);
    try {
      console.log('Fetching popular properties...');
      const token = await AsyncStorage.getItem('authToken');
      console.log('Using token for popular properties:', token ? 'Token exists' : 'No token');
      
      const response = await fetch('http://jagha.com/api/popular-properties', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
      
      console.log('Popular properties response status:', response.status);
      
      if (!response.ok) {
        if (response.status === 401) {
          console.log('Unauthorized - token might be invalid');
          await AsyncStorage.removeItem('authToken');
          navigation.navigate('Login');
          throw new Error('Please login again');
        }
        const errorText = await response.text();
        console.log('Popular properties error response:', errorText);
        throw new Error(`Failed to fetch popular properties: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('Popular properties API response:', result);
      
      // Extract data from popular_cities_commercial_on_sale
      let propertiesData = [];
      if (result.data && result.data.popular_cities_commercial_on_sale && Array.isArray(result.data.popular_cities_commercial_on_sale)) {
        propertiesData = result.data.popular_cities_commercial_on_sale.map(item => ({
          id: item.id || Math.random().toString(),
          city_name: item.city_name || 'N/A',
          property_purpose: item.property_purpose || 'N/A',
          property_type: item.property_type || 'N/A',
          property_sub_type: item.property_sub_type || 'N/A',
          location_name: item.location_name || 'N/A',
          // Add fallback values for other fields used in the UI
          price: item.price || item.property_sub_type || 'N/A',
          land_area: item.land_area || 'N/A',
          area_unit: item.area_unit || '',
          premium_listing: item.premium_listing || false,
          images: item.images || [],
          title: item.title || item.property_type || 'Property'
        }));
      }
      
      console.log('Properties data extracted from popular_cities_commercial_on_sale:', propertiesData);
      setPopularProperties(propertiesData);
      console.log('Popular properties set:', propertiesData.length, 'items');
      
    } catch (err) {
      console.error('Error fetching popular properties:', err);
      console.error('Error details:', err.message);
      setPopularPropertiesError(err.message);
      setPopularProperties([]);
    } finally {
      setPopularPropertiesLoading(false);
    }
  };

  // Use API properties for listings if available
  const apiListings = properties.length > 0 ? properties.map(item => ({
    id: item.id,
    image: getImageSource(item),
    price: item.price ? `Rs. ${item.price}` : 'Price on Request',
    location: item.city_id ? String(item.city_id) : 'N/A',
    type: item.type || 'Property',
    size: item.land_area ? `${item.land_area} ${item.area_unit}` : 'N/A',
    featured: item.premium_listing || false,
  })) : listings;

  // Compute top row cards from API
  const topRowProperties = selectedCategory === 'All'
    ? properties
    : selectedCategory === 'House'
    ? properties.filter(item => item.type === 'Houses')
    : properties.filter(item => item.type === selectedCategory);

  // Filter listings based on selected category
  const filteredListings = selectedCategory === 'All'
    ? apiListings
    : selectedCategory === 'House'
    ? apiListings.filter(l => l.type === 'Houses')
    : apiListings.filter(l => l.type === selectedCategory);

  const handleFabPressIn = () => {
    Animated.spring(fabScale, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  };

  const handleFabPressOut = () => {
    Animated.spring(fabScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
    navigation.navigate('AddProperty');
  };

  // Render property card
  const renderPropertyCard = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => navigation.navigate('FeaturedEstate', { property: item })}
      style={styles.propertyCard}
    >
      <View style={{position: 'relative'}}>
        <Image 
          source={getImageSource(item)} 
          style={styles.propertyImage} 
        />
        <View style={styles.heartCircle}>
          <Text style={styles.heartIcon}>♥</Text>
        </View>
        <View style={styles.badgesRow}>
          <View style={styles.badgeType}>
            <Text style={styles.badgeText}>{item.type || 'Property'}</Text>
          </View>
          {item.featured && (
            <View style={styles.badgePremium}>
              <Text style={styles.badgeText}>Featured</Text>
            </View>
          )}
        </View>
      </View>
      <Text style={styles.propertyPrice}>{item.price}</Text>
      <View style={styles.propertyLocationRow}>
        <Image source={require('../assets/location.png')} style={styles.locationIcon} />
        <Text style={styles.propertyLocation}>{item.location}</Text>
      </View>
      <Text style={styles.propertyType}>{item.type || 'Property'}</Text>
      <View style={styles.propertySizeRow}>
        <Image source={require('../assets/size_icon.png')} style={styles.sizeIcon} />
        <Text style={styles.propertySize}>{item.size || 'Size N/A'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          position: 'absolute',
          width: 362,
          height: 356,
          top: -140,
          left: -110,
          opacity: 0.2,
          backgroundColor: '#FFD225',
          borderRadius: 362,
          zIndex: 0,
        }}
      />
      {/* City Selection Modal */}
      <Modal
        visible={cityModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCityModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select City</Text>
            <FlatList
              data={cityOptions}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.cityOption}
                  onPress={() => {
                    setSelectedCity(item);
                    setCityModalVisible(false);
                  }}
                >
                  <Text style={styles.cityOptionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setCityModalVisible(false)} style={styles.modalCloseBtn}>
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.locationBtn} onPress={() => setCityModalVisible(true)}>
          <Image source={require('../assets/location.png')} style={styles.locationIcon} />
          <Text style={styles.locationText}>{selectedCity}, Pakistan</Text>
          <Image source={require('../assets/chevron_down.png')} style={styles.chevronIcon} />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          {/* <TouchableOpacity style={styles.iconBtn}>
            <Image source={require('../assets/bell_icon.png')} style={styles.headerIcon} />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate('TopAgentProfile')}>
            <Image source={{uri: 'https://randomuser.me/api/portraits/men/32.jpg'}} style={styles.profileImg} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.greetingBox}>
        <Text style={styles.greeting1}>Hey, <Text style={styles.goldText}>Ali Khan</Text></Text>
        <Text style={styles.greeting2}>Let's start exploring</Text>
      </View>
      {/* Search Bar (always visible) */}
      <View style={styles.searchBar}>
        <Image source={require('../assets/search.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search House, Apartment, etc"
          placeholderTextColor="#7B7B93"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {/* Main Content: Search results or Home content */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFD225" />
          <Text style={styles.loadingText}>Loading properties...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorEmoji}>😕</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchProperties}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : searchQuery.trim().length > 0 ? (
        // SEARCH MODE: Only show search results grid
        filteredListings.length === 0 ? (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 48}}>
            <Text style={{fontSize: 60, marginBottom: 16}}>😕</Text>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#252B5C', marginBottom: 8, textAlign: 'center'}}>No properties found</Text>
          </View>
        ) : (
          <View style={{flex: 1, paddingHorizontal: 8, paddingBottom: 16}}>
            <Text style={{fontSize: 20, fontWeight: '700', color: '#252B5C', marginVertical: 16}}>
              Found {filteredListings.length} result{filteredListings.length > 1 ? 's' : ''}
            </Text>
            <FlatList
              data={filteredListings}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'flex-start'}}
              renderItem={renderPropertyCard}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 32}}
            />
          </View>
        )
      ) : (
        // HOME MODE: Show all original sections
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Category Tabs */}
          <View style={styles.tabsRow}>
            {categoryTabs.map(tab => (
              <TouchableOpacity
                key={tab}
                style={selectedCategory === tab ? styles.tabActive : styles.tab}
                onPress={() => setSelectedCategory(tab)}
              >
                <Text style={selectedCategory === tab ? styles.tabActiveText : styles.tabText}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Top Card Section: Static for All, filtered listings for other tabs, both searchable */}
          {selectedCategory === 'All' ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
              {topRowProperties.length === 0 ? (
                <View style={styles.emptyTopRowContainer}>
                  <Text style={styles.emptyTopRowText}>No properties found for {selectedCategory}</Text>
                </View>
              ) : (
                topRowProperties.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => navigation.navigate('PropertyDetails', { propertyId: item.id })}
                  >
                    <View style={styles.featuredCard}>
                      <Image source={getImageSource(item)} style={styles.featuredImg} />
                      {/* Overlay content */}
                      <View style={styles.featuredOverlay}>
                        <Text style={styles.featuredTitleOverlay}>{item.title || item.type || 'Property'}</Text>
                        <Text style={styles.featuredDescOverlay}>{item.description ? item.description.slice(0, 40) + '...' : 'No description'}</Text>
                        <View style={styles.featuredBadgeOverlay}><Text style={styles.featuredBadgeTextOverlay}>{item.type || 'Featured'}</Text></View>
                        <TouchableOpacity style={styles.detailsBtnOverlay}><Text style={styles.detailsBtnTextOverlay}>Details</Text></TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
              {topRowProperties.length === 0 ? (
                <View style={styles.emptyTopRowContainer}>
                  <Text style={styles.emptyTopRowText}>No properties found for {selectedCategory}</Text>
                </View>
              ) : (
                topRowProperties.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => navigation.navigate('PropertyDetails', { propertyId: item.id })}
                  >
                    <View style={styles.featuredCard}>
                      <Image source={getImageSource(item)} style={styles.featuredImg} />
                      {/* Overlay content */}
                      <View style={styles.featuredOverlay}>
                        <Text style={styles.featuredTitleOverlay}>{item.title || item.type || 'Property'}</Text>
                        <Text style={styles.featuredDescOverlay}>{item.description ? item.description.slice(0, 40) + '...' : 'No description'}</Text>
                        <View style={styles.featuredBadgeOverlay}><Text style={styles.featuredBadgeTextOverlay}>{item.type || 'Featured'}</Text></View>
                        <TouchableOpacity style={styles.detailsBtnOverlay}><Text style={styles.detailsBtnTextOverlay}>Details</Text></TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          )}
          {/* Featured Estates Section: Show featured agencies from API */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Featured Agencies</Text>
            <TouchableOpacity><Text style={styles.sectionLink}>view all</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginLeft: 24, marginBottom: 16}}>
            <View style={{flexDirection: 'row'}}>
              {featuredAgenciesLoading ? (
                <View style={{width: 268, height: 156, borderRadius: 10, backgroundColor: '#F5F4F8', alignItems: 'center', justifyContent: 'center', marginRight: 16}}>
                  <ActivityIndicator size="small" color="#FFD225" />
                  <Text style={{color: '#7B7B93', fontSize: 14, marginTop: 8}}>Loading...</Text>
                </View>
              ) : featuredAgenciesError ? (
                <View style={{width: 268, height: 156, borderRadius: 10, backgroundColor: '#F5F4F8', alignItems: 'center', justifyContent: 'center', marginRight: 16, padding: 16}}>
                  <Text style={{color: '#7B7B93', fontSize: 14, textAlign: 'center', marginBottom: 12}}>Failed to load featured estates</Text>
                  <TouchableOpacity 
                    style={{backgroundColor: '#FFD225', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8}}
                    onPress={fetchFeaturedAgencies}
                  >
                    <Text style={{color: '#252B5C', fontSize: 12, fontWeight: '600'}}>Retry</Text>
                  </TouchableOpacity>
                </View>
              ) : featuredAgencies.length === 0 ? (
                <View style={{width: 268, height: 156, borderRadius: 10, backgroundColor: '#F5F4F8', alignItems: 'center', justifyContent: 'center', marginRight: 16}}>
                  <Text style={{color: '#7B7B93', fontSize: 14, textAlign: 'center'}}>No featured estates available</Text>
                </View>
              ) : (
                featuredAgencies.map(agency => (
                  <TouchableOpacity
                    key={agency.id}
                    onPress={() => navigation.navigate('FeaturedEstate', { agency })}
                    style={{
                      width: 268,
                      height: 156,
                      borderRadius: 10,
                      backgroundColor: '#F5F4F8',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginRight: 16,
                      padding: 10,
                      shadowColor: '#000',
                      shadowOpacity: 0.04,
                      shadowRadius: 4,
                      elevation: 1,
                    }}>
                    {/* Image and heart icon */}
                    <View style={{position: 'relative'}}>
                      <Image 
                        source={agency.logo ? {uri: agency.logo} : require('../assets/real_estate_residential.png')} 
                        style={{width: 100, height: 136, borderRadius: 10}} 
                      />
                      <View style={{position: 'absolute', top: 8, left: 8, backgroundColor: '#7ED957', borderRadius: 16, width: 28, height: 28, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>♥</Text>
                      </View>
                      <View style={{position: 'absolute', bottom: 8, left: 8, backgroundColor: '#252B5C', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2}}>
                        <Text style={{color: 'white', fontSize: 11, fontWeight: '600'}}>{agency.type || 'Agency'}</Text>
                      </View>
                    </View>
                    {/* Details */}
                    <View style={{flex: 1, marginLeft: 12, justifyContent: 'center'}}>
                      <Text style={{color: '#252B5C', fontWeight: '700', fontSize: 16, marginBottom: 2}}>{agency.title || agency.name || 'Agency Name'}</Text>
                      <Text style={{color: '#7B7B93', fontSize: 13, marginBottom: 2}}>{agency.description ? agency.description.slice(0, 20) + '...' : 'Featured Agency'}</Text>
                      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 2}}>
                        <Text style={{color: '#117C3E', fontSize: 13}}>📍</Text>
                        <Text style={{color: '#7B7B93', fontSize: 13, marginLeft: 4}}>{agency.city || agency.location || 'Location'}</Text>
                      </View>
                      <Text style={{color: '#252B5C', fontWeight: '700', fontSize: 13, marginTop: 8}}>{agency.rating ? `${agency.rating} ★` : 'Featured'}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </ScrollView>
          {/* Top Locations */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Top Locations</Text>
            <TouchableOpacity onPress={() => navigation.navigate('TopLocation')}>
              <Text style={styles.sectionLink}>explore</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginHorizontal: 24, marginBottom: 12}}>
            <TouchableOpacity style={styles.locationPill} onPress={() => navigation.navigate('LocationListings', { location: 'Islamabad' })}>
              <Image source={{uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80'}} style={styles.locationPillImg} />
              <Text style={styles.locationPillText}>Islamabad</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.locationPill} onPress={() => navigation.navigate('LocationListings', { location: 'Lahore' })}>
              <Image source={{uri: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=80&q=80'}} style={styles.locationPillImg} />
              <Text style={styles.locationPillText}>Lahore</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.locationPill} onPress={() => navigation.navigate('LocationListings', { location: 'Karachi' })}>
              <Image source={{uri: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=80&q=80'}} style={styles.locationPillImg} />
              <Text style={styles.locationPillText}>Karachi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.locationPill} onPress={() => navigation.navigate('LocationListings', { location: 'Swat' })}>
              <Image source={{uri: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=80&q=80'}} style={styles.locationPillImg} />
              <Text style={styles.locationPillText}>Swat</Text>
            </TouchableOpacity>
          </ScrollView>
          {/* Top Agent */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Top Agent</Text>
            <TouchableOpacity onPress={() => navigation.navigate('TopAgent')}><Text style={styles.sectionLink}>explore</Text></TouchableOpacity>
          </View>
          <View style={styles.agentsRow}>
            <View style={styles.agentCircle}><Image source={{uri: 'https://randomuser.me/api/portraits/women/44.jpg'}} style={styles.agentImg} /><Text style={styles.agentName}>Ayesha K.</Text></View>
            <View style={styles.agentCircle}><Image source={{uri: 'https://randomuser.me/api/portraits/men/45.jpg'}} style={styles.agentImg} /><Text style={styles.agentName}>Fawad A.</Text></View>
            <View style={styles.agentCircle}><Image source={{uri: 'https://randomuser.me/api/portraits/women/46.jpg'}} style={styles.agentImg} /><Text style={styles.agentName}>Suman J.</Text></View>
            <View style={styles.agentCircle}><Image source={{uri: 'https://randomuser.me/api/portraits/men/47.jpg'}} style={styles.agentImg} /><Text style={styles.agentName}>Faisal W.</Text></View>
          </View>
          {/* Popular Properties */}
          <View style={{marginHorizontal: 24}}>
            <Text style={styles.sectionTitle}>Popular Properties</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginHorizontal: 24, marginBottom: 24}}>
            {popularPropertiesLoading ? (
              <View style={styles.nearbyCardV2}>
                <View style={{width: '100%', height: 110, backgroundColor: '#F5F4F8', borderRadius: 12, alignItems: 'center', justifyContent: 'center'}}>
                  <ActivityIndicator size="small" color="#FFD225" />
                  <Text style={{color: '#7B7B93', fontSize: 12, marginTop: 8}}>Loading...</Text>
                </View>
              </View>
            ) : popularPropertiesError ? (
              <View style={styles.nearbyCardV2}>
                <View style={{width: '100%', height: 110, backgroundColor: '#F5F4F8', borderRadius: 12, alignItems: 'center', justifyContent: 'center', padding: 16}}>
                  <Text style={{color: '#7B7B93', fontSize: 12, textAlign: 'center', marginBottom: 8}}>Failed to load</Text>
                  <TouchableOpacity 
                    style={{backgroundColor: '#FFD225', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6}}
                    onPress={fetchPopularProperties}
                  >
                    <Text style={{color: '#252B5C', fontSize: 10, fontWeight: '600'}}>Retry</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : popularProperties.length === 0 ? (
              <View style={styles.nearbyCardV2}>
                <View style={{width: '100%', height: 110, backgroundColor: '#F5F4F8', borderRadius: 12, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: '#7B7B93', fontSize: 12, textAlign: 'center'}}>No popular properties</Text>
                </View>
              </View>
            ) : (
              (popularProperties && Array.isArray(popularProperties) ? popularProperties : []).map(property => (
                <TouchableOpacity
                  key={property.id}
                  style={styles.nearbyCardV2}
                  onPress={() => navigation.navigate('PropertyDetails', { propertyId: property.id })}
                >
                  <View style={{position: 'relative'}}>
                    <Image source={getImageSource(property)} style={styles.nearbyImgV2} />
                    <View style={styles.nearbyHeart}>
                      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>♥</Text>
                    </View>
                    <View style={styles.nearbyBadgesRow}>
                      <View style={styles.nearbyBadgeV2}>
                        <Text style={{color: '#fff', fontSize: 11, fontWeight: '600'}}>{property.property_type || 'Property'}</Text>
                      </View>
                      {property.premium_listing && (
                        <View style={styles.nearbyBadgeFeaturedV2}>
                          <Text style={{color: '#fff', fontSize: 11, fontWeight: '600'}}>Featured</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <Text style={styles.nearbyPriceV2}>
                    {property.property_sub_type || 'N/A'}
                  </Text>
                  <View style={styles.nearbyLocationRow}>
                    <Image source={require('../assets/location.png')} style={styles.nearbyLocationIcon} />
                    <Text style={styles.nearbyLocationText}>{property.city_name || 'N/A'}</Text>
                    <Text style={styles.nearbyForSaleText}>{property.property_purpose || 'Property'}</Text>
                  </View>
                  <View style={styles.nearbySizeRow}>
                    <Image source={require('../assets/size_icon.png')} style={styles.nearbySizeIcon} />
                    <Text style={styles.nearbySizeText}>
                      {property.location_name || 'Location N/A'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </ScrollView>
      )}
      {/* Floating Add Property Button */}
      <Animated.View style={[styles.fab, { transform: [{ scale: fabScale }] }]}> 
        <TouchableOpacity
          activeOpacity={0.85}
          onPressIn={handleFabPressIn}
          onPressOut={handleFabPressOut}
        >
          <LinearGradient
            colors={["#FFD225", "#B89B2B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fabCircle}
          >
            <Text style={styles.fabPlus}>＋</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 140,
    backgroundColor: '#FFF9E5',
    borderBottomRightRadius: 80,
    zIndex: 0,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    marginBottom: 8,
    zIndex: 2,
  },
  locationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 171,
    height: 40,
    position: 'relative',
    paddingTop: 13,
    paddingRight: 16,
    paddingBottom: 17.5,
    paddingLeft: 16,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  locationIcon: { width: 15, height: 15, marginRight: 6, tintColor: '#117C3E' },
  locationText: {
    color: '#252B5C',
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 10,
    letterSpacing: 0.03,
    backgroundColor: 'transparent',
  },
  chevronIcon: { width: 14, height: 14,marginLeft: -6, tintColor: '#252B5C' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { marginRight: 12 },
  headerIcon: { width: 22, height: 22 },
  profileBtn: { borderRadius: 16, overflow: 'hidden' },
  profileImg: { width: 32, height: 32, borderRadius: 16 },
  greetingBox: { paddingHorizontal: 24, marginTop: 8, marginBottom: 8 },
  greeting1: { fontSize: 22, color: '#252B5C', fontWeight: '700' },
  goldText: { color: '#B89B2B', fontWeight: 'bold' },
  greeting2: { fontSize: 18, color: '#252B5C', fontWeight: '400', marginTop: 2 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    marginHorizontal: 24,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 48,
  },
  searchIcon: { width: 20, height: 20, tintColor: '#7B7B93', marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: '#252B5C' },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 12,
  },
  tab: {
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginRight: 8,
  },
  tabActive: {
    backgroundColor: '#B89B2B',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginRight: 8,
  },
  tabText: { color: '#252B5C', fontWeight: '600', fontSize: 15 },
  tabActiveText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  featuredScroll: { marginLeft: 24, marginBottom: 16 },
  featuredCard: {
    width: 270,
    height: 156,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  featuredImg: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
  featuredOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    padding: 16,
    justifyContent: 'flex-start',
  },
  featuredTitleOverlay: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    marginTop: 8,
  },
  featuredDescOverlay: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 8,
  },
  featuredBadgeOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#117C3E',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  featuredBadgeTextOverlay: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  detailsBtnOverlay: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#B89B2B',
    borderTopLeftRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  detailsBtnTextOverlay: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 24, marginTop: 8, marginBottom: 4 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#252B5C',
    marginTop: 24,
    marginBottom: 12,
  },
  sectionLink: { color: '#117C3E', fontWeight: '600', fontSize: 14 },
  locationsRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 24, marginBottom: 12 },
  locationCircle: { backgroundColor: '#F5F5F7', borderRadius: 32, width: 70, height: 70, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  locationCircleText: { color: '#252B5C', fontWeight: '600', fontSize: 13 },
  agentsRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 24, marginBottom: 12 },
  agentCircle: { alignItems: 'center', marginRight: 16 },
  agentImg: { width: 48, height: 48, borderRadius: 24, marginBottom: 4 },
  agentName: { fontSize: 12, color: '#252B5C', fontWeight: '600' },
  nearbyCardV2: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    width: 220,
    alignSelf: 'center',
  },
  nearbyImgV2: {
    width: '100%',
    height: 110,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  nearbyHeart: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#7ED957',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  nearbyBadgesRow: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  nearbyBadgeV2: {
    backgroundColor: '#117C3E',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: 8,
  },
  nearbyBadgeFeaturedV2: {
    backgroundColor: '#B89B2B',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  nearbyPriceV2: {
    fontWeight: '700',
    color: '#252B5C',
    fontSize: 15,
    marginTop: 4,
    marginBottom: 2,
  },
  nearbyLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  nearbyLocationIcon: {
    width: 14,
    height: 14,
    tintColor: '#117C3E',
    marginRight: 4,
  },
  nearbyLocationText: {
    color: '#7B7B93',
    fontSize: 13,
    marginRight: 8,
  },
  nearbyForSaleText: {
    color: '#117C3E',
    fontSize: 12,
    fontWeight: '600',
  },
  nearbySizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  nearbySizeIcon: {
    width: 16,
    height: 16,
    tintColor: '#B89B2B',
    marginRight: 4,
  },
  nearbySizeText: {
    color: '#B89B2B',
    fontSize: 12,
    fontWeight: '600',
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    borderRadius: 32,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  locationPillImg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  locationPillText: {
    color: '#252B5C',
    fontWeight: '600',
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxHeight: '70%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#252B5C',
    marginBottom: 16,
  },
  cityOption: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  cityOptionText: {
    fontSize: 16,
    color: '#252B5C',
  },
  modalCloseBtn: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#FFD225',
    borderRadius: 12,
  },
  modalCloseText: {
    color: '#252B5C',
    fontWeight: '700',
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 80,
    zIndex: 100,
    elevation: 12,
  },
  fabCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 16,
  },
  fabPlus: {
    color: '#252B5C',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: -2,
    textAlign: 'center',
    textShadowColor: '#fff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  propertyCard: {
    backgroundColor: '#F5F4F8',
    borderRadius: 18,
    width: (width - 40) / 2,
    margin: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  propertyImage: {
    width: '100%',
    height: 110,
    borderRadius: 14,
  },
  heartCircle: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#7ED957',
    borderRadius: 16,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  badgesRow: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeType: {
    backgroundColor: '#117C3E',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: 8,
  },
  badgePremium: {
    backgroundColor: '#FFD225',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  propertyPrice: {
    color: '#252B5C',
    fontWeight: '700',
    fontSize: 15,
    marginTop: 8,
    marginBottom: 2,
  },
  propertyLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  locationIcon: {
    width: 14,
    height: 14,
    tintColor: '#117C3E',
    marginRight: 4,
  },
  propertyLocation: {
    color: '#7B7B93',
    fontSize: 13,
  },
  propertyType: {
    color: '#117C3E',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  propertySizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sizeIcon: {
    width: 16,
    height: 16,
    tintColor: '#B89B2B',
    marginRight: 4,
  },
  propertySize: {
    color: '#B89B2B',
    fontSize: 13,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#252B5C',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  errorEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#252B5C',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#FFD225',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: '#252B5C',
    fontWeight: '600',
    fontSize: 16,
  },
  emptyTopRowContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
    minHeight: 156,
    backgroundColor: '#F5F4F8',
    borderRadius: 14,
    marginRight: 16,
  },
  emptyTopRowText: {
    fontSize: 16,
    color: '#7B7B93',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default Home; 