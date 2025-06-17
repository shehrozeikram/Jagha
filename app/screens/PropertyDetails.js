import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const galleryImages = [
  require('../assets/real_estate_residential.png'),
  require('../assets/real_estate_commercial.png'),
  require('../assets/real_estate_land.png'),
];

const agent = {
  name: 'Ali Khan',
  image: 'https://randomuser.me/api/portraits/men/32.jpg',
  role: 'Real Estate Agent',
};

const reviews = [
  {
    id: 1,
    name: 'Asim Chaudhary',
    image: 'https://randomuser.me/api/portraits/men/34.jpg',
    rating: 5,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    name: 'Faisal Khan',
    image: 'https://randomuser.me/api/portraits/men/35.jpg',
    rating: 4,
    text: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
  },
];

const nearbyListings = [
  {
    id: 1,
    image: require('../assets/real_estate_residential.png'),
    price: '45.5 Lac to 2 Crore PKR',
    location: 'Rawalpindi',
    type: 'For Sale',
    size: '5 - 10 Marla',
    featured: true,
  },
  {
    id: 2,
    image: require('../assets/real_estate_commercial.png'),
    price: '45.5 Lac to 2 Crore PKR',
    location: 'Rawalpindi',
    type: 'For Sale',
    size: '5 - 10 Marla',
    featured: true,
  },
];

const PropertyDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { propertyId } = route.params || {};
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (propertyId) {
      fetchPropertyDetails();
    }
  }, [propertyId]);

  const fetchPropertyDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem('authToken');
      console.log('Fetching property details for ID:', propertyId);
      console.log('Using token:', token ? 'Token exists' : 'No token');
      
      const response = await fetch(`http://jagha.com/api/properties/${propertyId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });

      console.log('API Response Status:', response.status);
      console.log('API Response Headers:', response.headers);

      if (!response.ok) {
        if (response.status === 401) {
          await AsyncStorage.removeItem('authToken');
          navigation.navigate('Login');
          throw new Error('Please login again');
        }
        throw new Error('Failed to fetch property details');
      }

      const result = await response.json();
      console.log('API Response Data:', JSON.stringify(result, null, 2));
      
      if (result.success && result.data && result.data.property) {
        console.log('Property data:', JSON.stringify(result.data.property, null, 2));
        setProperty(result.data.property);
      } else if (result.success && result.data) {
        // Fallback: if property is not nested, use data directly
        console.log('Property data (fallback):', JSON.stringify(result.data, null, 2));
        setProperty(result.data);
      } else {
        console.log('Invalid response format:', result);
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.log('Fetch error:', err);
      setError(err.message);
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFD225" />
          <Text style={styles.loadingText}>Loading property details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !property) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorEmoji}>😕</Text>
          <Text style={styles.errorText}>{error || 'Property not found'}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchPropertyDetails}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Helper to get image source
  const getImageSource = (images) => {
    if (images && images.length > 0) {
      const img = images[0];
      if (typeof img === 'string') {
        return { uri: img };
      } else if (img && typeof img === 'object' && typeof img.url === 'string') {
        return { uri: img.url };
      }
    }
    return require('../assets/real_estate_residential.png');
  };

  // Helper to parse features object into key-value pairs
  const parseFeatures = (features) => {
    if (!features) return [];
    
    // If it's already an array, return as is
    if (Array.isArray(features)) {
      return features.map(feature => ({ key: feature, value: true }));
    }
    
    // If it's a string, split by comma
    if (typeof features === 'string') {
      return features.split(',').map(feature => ({ key: feature.trim(), value: true }));
    }
    
    // If it's an object, convert to key-value pairs
    if (typeof features === 'object') {
      return Object.entries(features).map(([key, value]) => ({
        key: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // Convert snake_case to Title Case
        value: value === "" || value === null || value === undefined ? "0" : value
      }));
    }
    
    return [];
  };

  // Get parsed features
  const parsedFeatures = parseFeatures(property.features);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Image Gallery */}
        <View style={styles.topImageWrapper}>
          <Image source={getImageSource(property.images)} style={styles.topImage} />
          {/* Overlay Buttons */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <View style={styles.circleBtn}><Image source={require('../assets/back_arrow.png')} style={styles.iconBtn} /></View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.circleBtn, styles.shareBtn]}>
            <Image source={require('../assets/group.png')} style={styles.iconBtn} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.circleBtn, styles.heartBtn]}>
            <Image source={require('../assets/heart.png')} style={[styles.iconBtn, {tintColor:'#7ED957'}]} />
          </TouchableOpacity>
          {/* Gallery Thumbnails */}
          <View style={styles.galleryThumbs}>
            {property.images && property.images.slice(0, 3).map((img, idx) => (
              <Image key={idx} source={getImageSource([img])} style={styles.galleryThumb} />
            ))}
          </View>
        </View>
        {/* Title, Price, Location */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>{property.title || 'Property Details'}</Text>
          <Text style={styles.price}>{property.price ? `PKR ${property.price}` : 'Price on Request'}</Text>
        </View>
        <Text style={styles.locationText}>{property.location || property.city_id || 'Location not specified'}</Text>
        
        {/* Reference Number */}
        {property.reference && (
          <Text style={styles.referenceText}>Reference: {property.reference}</Text>
        )}
        
        {/* Rent/Buy Tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity style={styles.tabActive}>
            <Text style={styles.tabTextActive}>{property.purpose || 'Sale'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>{property.type || 'Property'}</Text>
          </TouchableOpacity>
          {property.sub_type && (
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>{property.sub_type}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.tabIcon}>
            <Image source={require('../assets/group.png')} style={styles.tabIconImg} />
          </TouchableOpacity>
        </View>
        
        {/* Agent Card */}
        <View style={styles.agentCard}>
          <Image source={{ uri: agent.image }} style={styles.agentImg} />
          <View style={{flex:1}}>
            <Text style={styles.agentName}>{property.contact_person || agent.name}</Text>
            <Text style={styles.agentRole}>{agent.role}</Text>
            {property.phone && (
              <Text style={styles.agentPhone}>📞 {property.phone}</Text>
            )}
            {property.cell && (
              <Text style={styles.agentPhone}>📱 {property.cell}</Text>
            )}
          </View>
        </View>
        
        {/* Features */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Property Features</Text>
          
          {/* Property Details */}
          <View style={styles.propertyDetails}>
            {property.purpose && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Purpose:</Text>
                <Text style={styles.detailValue}>{property.purpose}</Text>
              </View>
            )}
            {property.type && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Type:</Text>
                <Text style={styles.detailValue}>{property.type}</Text>
              </View>
            )}
            {property.sub_type && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Sub Type:</Text>
                <Text style={styles.detailValue}>{property.sub_type}</Text>
              </View>
            )}
            {property.contact_person && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Contact:</Text>
                <Text style={styles.detailValue}>{property.contact_person}</Text>
              </View>
            )}
          </View>
        </View>
        
        {/* Property Status Badges */}
        <View style={styles.statusRow}>
          {property.premium_listing && (
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Premium</Text>
            </View>
          )}
          {property.super_hot_listing && (
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Super Hot</Text>
            </View>
          )}
          {property.hot_listing && (
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Hot</Text>
            </View>
          )}
          {property.platinum_listing && (
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Platinum</Text>
            </View>
          )}
        </View>
        
        {/* Description */}
        {property.description && (
          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionAddress}>{property.description}</Text>
          </View>
        )}
        
        {/* Location & Public Facilities */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Location & Public Facilities</Text>
          <Text style={styles.sectionAddress}>
            {property.location || property.city_id ? `${property.location || property.city_id}` : 'Location not specified'}
          </Text>
          {property.location_id && (
            <Text style={styles.sectionAddress}>
              Location ID: {property.location_id}
            </Text>
          )}
          {property.latitude && property.longitude && (
            <View style={styles.distanceRow}>
              <Text style={styles.distanceText}>
                Coordinates: {property.latitude}, {property.longitude}
              </Text>
            </View>
          )}
          <View style={styles.facilitiesRow}>
            <View style={styles.facilityBadge}><Text style={styles.facilityText}>🏥 Hospital</Text></View>
            <View style={styles.facilityBadge}><Text style={styles.facilityText}>⛽ Gas Station</Text></View>
            <View style={styles.facilityBadge}><Text style={styles.facilityText}>🏫 Schools</Text></View>
          </View>
        </View>
        
        {/* Nearby Listings */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Nearby From this Location</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.nearbyScroll}>
            {nearbyListings.map(listing => (
              <TouchableOpacity
                key={listing.id}
                style={styles.nearbyCard}
                onPress={() => navigation.replace('PropertyDetails', { propertyId: listing.id })}
              >
                <Image source={listing.image} style={styles.nearbyImg} />
                <View style={styles.nearbyBadgesRow}>
                  <View style={styles.nearbyBadge}><Text style={styles.nearbyBadgeText}>{listing.type}</Text></View>
                  {listing.featured && <View style={styles.nearbyBadgeFeatured}><Text style={styles.nearbyBadgeText}>Featured</Text></View>}
                </View>
                <Text style={styles.nearbyPrice}>{listing.price}</Text>
                <Text style={styles.nearbyLocation}>{listing.location}</Text>
                <Text style={styles.nearbyType}>{listing.type}</Text>
                <View style={styles.nearbyDetailsRow}>
                  <Text style={styles.nearbyDetailIcon}>📏</Text>
                  <Text style={styles.nearbyDetailText}>{listing.size}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topImageWrapper: { position: 'relative', width: '100%', height: width*0.7, marginBottom: 12 },
  topImage: { width: '100%', height: '100%', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  backBtn: { position: 'absolute', top: 18, left: 18, zIndex: 2 },
  shareBtn: { position: 'absolute', top: 18, right: 64, zIndex: 2 },
  heartBtn: { position: 'absolute', top: 18, right: 18, zIndex: 2 },
  circleBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  iconBtn: { width: 18, height: 18, tintColor: '#252B5C' },
  galleryThumbs: { position: 'absolute', bottom: 16, right: 16, flexDirection: 'row', gap: 8 },
  galleryThumb: { width: 60, height: 60, borderRadius: 12, borderWidth: 2, borderColor: '#fff' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginHorizontal: 24, marginTop: 16, marginBottom: 8 },
  title: { fontSize: 24, fontWeight: '700', color: '#252B5C', flex: 1, marginRight: 16 },
  price: { fontSize: 20, fontWeight: '700', color: '#B89B2B' },
  locationText: { fontSize: 14, color: '#7B7B93', marginHorizontal: 24, marginBottom: 16 },
  tabRow: { flexDirection: 'row', marginHorizontal: 24, marginBottom: 16 },
  tabActive: { backgroundColor: '#B89B2B', borderRadius: 12, paddingHorizontal: 20, paddingVertical: 8, marginRight: 12 },
  tab: { backgroundColor: '#F5F5F7', borderRadius: 12, paddingHorizontal: 20, paddingVertical: 8, marginRight: 12 },
  tabTextActive: { color: '#fff', fontWeight: '600', fontSize: 14 },
  tabText: { color: '#252B5C', fontWeight: '600', fontSize: 14 },
  tabIcon: { backgroundColor: '#F5F5F7', borderRadius: 12, padding: 8 },
  tabIconImg: { width: 20, height: 20, tintColor: '#252B5C' },
  agentCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F4F8', borderRadius: 16, marginHorizontal: 24, padding: 16, marginBottom: 16 },
  agentImg: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  agentName: { fontSize: 16, fontWeight: '600', color: '#252B5C', marginBottom: 4 },
  agentRole: { fontSize: 14, color: '#7B7B93' },
  agentPhone: { fontSize: 14, color: '#7B7B93', marginTop: 4 },
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  featureGridItem: { backgroundColor: '#F5F4F8', borderRadius: 12, padding: 8 },
  featureGridLabel: { color: '#252B5C', fontSize: 14, fontWeight: '600' },
  featureGridValue: { color: '#7B7B93', fontSize: 14, fontWeight: '600' },
  basicFeaturesRow: { flexDirection: 'row', marginHorizontal: 24, marginBottom: 16 },
  featureBadge: { backgroundColor: '#F5F4F8', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6, marginRight: 8 },
  featureText: { color: '#252B5C', fontSize: 14, fontWeight: '600' },
  sectionBox: { backgroundColor: '#F5F4F8', borderRadius: 16, marginHorizontal: 24, padding: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#252B5C', marginBottom: 12 },
  sectionAddress: { fontSize: 14, color: '#7B7B93', lineHeight: 20, marginBottom: 8 },
  distanceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  distanceText: { fontSize: 14, fontWeight: '600', color: '#252B5C' },
  distanceSubText: { fontSize: 14, color: '#7B7B93' },
  facilitiesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  facilityBadge: { backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6 },
  facilityText: { color: '#252B5C', fontSize: 14, fontWeight: '600' },
  mapBox: { backgroundColor: '#F5F4F8', borderRadius: 16, marginHorizontal: 24, padding: 16, marginBottom: 16 },
  mapImg: { width: '100%', height: 120, borderRadius: 12, marginBottom: 8 },
  mapText: { fontSize: 14, fontWeight: '600', color: '#252B5C', textAlign: 'center' },
  reviewsSummary: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  starBox: { backgroundColor: '#FFD225', borderRadius: 12, padding: 8, marginRight: 12 },
  star: { fontSize: 20, color: '#252B5C' },
  ratingText: { fontSize: 18, fontWeight: '700', color: '#252B5C' },
  ratingSubText: { fontSize: 14, color: '#7B7B93' },
  reviewersRow: { flexDirection: 'row' },
  reviewerImg: { width: 32, height: 32, borderRadius: 16, marginLeft: -8, borderWidth: 2, borderColor: '#fff' },
  reviewCard: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 12 },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  reviewUserImg: { width: 32, height: 32, borderRadius: 16, marginRight: 8 },
  reviewUserName: { fontSize: 14, fontWeight: '600', color: '#252B5C', flex: 1 },
  reviewRating: { fontSize: 14, color: '#FFD225' },
  reviewText: { fontSize: 14, color: '#7B7B93', lineHeight: 20 },
  viewAllBtn: { backgroundColor: '#B89B2B', borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  viewAllBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  nearbyScroll: { marginLeft: 24 },
  nearbyCard: { width: 200, backgroundColor: '#fff', borderRadius: 16, marginRight: 16, padding: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  nearbyImg: { width: '100%', height: 100, borderRadius: 12, marginBottom: 8 },
  nearbyBadgesRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  nearbyBadge: { backgroundColor: '#117C3E', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  nearbyBadgeFeatured: { backgroundColor: '#B89B2B', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  nearbyBadgeText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  nearbyPrice: { fontSize: 14, fontWeight: '700', color: '#252B5C', marginBottom: 4 },
  nearbyLocation: { fontSize: 12, color: '#7B7B93', marginBottom: 2 },
  nearbyType: { fontSize: 12, color: '#117C3E', fontWeight: '600', marginBottom: 4 },
  nearbyDetailsRow: { flexDirection: 'row', alignItems: 'center' },
  nearbyDetailIcon: { fontSize: 12, marginRight: 4 },
  nearbyDetailText: { color: '#B89B2B', fontSize: 12, fontWeight: '600' },
  // Loading and error states
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
  statusRow: { flexDirection: 'row', marginHorizontal: 24, marginBottom: 16 },
  statusBadge: { backgroundColor: '#B89B2B', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6, marginRight: 8 },
  statusText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  referenceText: { fontSize: 14, color: '#7B7B93', marginHorizontal: 24, marginBottom: 16 },
  additionalDetails: { marginBottom: 16 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  detailLabel: { fontSize: 14, fontWeight: '600', color: '#252B5C' },
  detailValue: { fontSize: 14, color: '#7B7B93' },
  propertyDetails: { marginBottom: 16 },
});

export default PropertyDetails; 