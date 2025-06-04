import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
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
  const { property } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Image Gallery */}
        <View style={styles.topImageWrapper}>
          <Image source={property?.image || galleryImages[0]} style={styles.topImage} />
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
            {galleryImages.map((img, idx) => (
              <Image key={idx} source={img} style={styles.galleryThumb} />
            ))}
          </View>
        </View>
        {/* Title, Price, Location */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>{property?.title || 'Taj Suites'}</Text>
          <Text style={styles.price}>{property?.price || 'PKR 2.5 Crore'}</Text>
        </View>
        <Text style={styles.locationText}>Adjacent Sector I-14, Rawalpindi, Punjab</Text>
        {/* Rent/Buy Tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity style={styles.tabActive}><Text style={styles.tabTextActive}>Rent</Text></TouchableOpacity>
          <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Buy</Text></TouchableOpacity>
          <TouchableOpacity style={styles.tabIcon}><Image source={require('../assets/group.png')} style={styles.tabIconImg} /></TouchableOpacity>
        </View>
        {/* Agent Card */}
        <View style={styles.agentCard}>
          <Image source={{ uri: agent.image }} style={styles.agentImg} />
          <View style={{flex:1}}>
            <Text style={styles.agentName}>{agent.name}</Text>
            <Text style={styles.agentRole}>{agent.role}</Text>
          </View>
        </View>
        {/* Features */}
        <View style={styles.featuresRow}>
          <View style={styles.featureBadge}><Text style={styles.featureText}>2 Bedroom</Text></View>
          <View style={styles.featureBadge}><Text style={styles.featureText}>1 Bathroom</Text></View>
        </View>
        {/* Location & Public Facilities */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Location & Public Facilities</Text>
          <Text style={styles.sectionAddress}>Adjacent to ECA Sector I-14, I-15, Rawalpindi, Punjab</Text>
          <View style={styles.distanceRow}><Text style={styles.distanceText}>2.5 km</Text><Text style={styles.distanceSubText}> from your location</Text></View>
          <View style={styles.facilitiesRow}>
            <View style={styles.facilityBadge}><Text style={styles.facilityText}>🏥 Hospital</Text></View>
            <View style={styles.facilityBadge}><Text style={styles.facilityText}>⛽ Gas Station</Text></View>
            <View style={styles.facilityBadge}><Text style={styles.facilityText}>🏫 Schools</Text></View>
          </View>
        </View>
        {/* Map */}
        <View style={styles.mapBox}>
          <Image source={require('../assets/map.png')} style={styles.mapImg} />
          <Text style={styles.mapText}>View all on map</Text>
        </View>
        {/* Reviews */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <View style={styles.reviewsSummary}>
            <View style={styles.starBox}><Text style={styles.star}>★</Text></View>
            <View style={{flex:1}}>
              <Text style={styles.ratingText}>4.9</Text>
              <Text style={styles.ratingSubText}>From 126 reviews</Text>
            </View>
            <View style={styles.reviewersRow}>
              {reviews.slice(0,3).map(r => (
                <Image key={r.id} source={{uri:r.image}} style={styles.reviewerImg} />
              ))}
            </View>
          </View>
          {reviews.map(r => (
            <View key={r.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image source={{uri:r.image}} style={styles.reviewUserImg} />
                <Text style={styles.reviewUserName}>{r.name}</Text>
                <Text style={styles.reviewRating}>{'★'.repeat(r.rating)}</Text>
              </View>
              <Text style={styles.reviewText}>{r.text}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.viewAllBtn}><Text style={styles.viewAllBtnText}>View all reviews</Text></TouchableOpacity>
        </View>
        {/* Nearby Listings */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Nearby From this Location</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.nearbyScroll}>
            {nearbyListings.map(listing => (
              <TouchableOpacity
                key={listing.id}
                style={styles.nearbyCard}
                onPress={() => navigation.replace('PropertyDetails', { property: listing })}
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
  iconBtn: { width: 22, height: 22, tintColor: '#252B5C' },
  galleryThumbs: { position: 'absolute', bottom: 18, right: 18, flexDirection: 'row', gap: 8, zIndex: 2 },
  galleryThumb: { width: 48, height: 48, borderRadius: 12, marginLeft: 8, borderWidth: 2, borderColor: '#fff' },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 24, marginTop: 8 },
  title: { fontSize: 22, fontWeight: '700', color: '#252B5C' },
  price: { fontSize: 20, fontWeight: '700', color: '#B89B2B' },
  locationText: { color: '#7B7B93', fontSize: 14, marginHorizontal: 24, marginTop: 2, marginBottom: 8 },
  tabRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 24, marginBottom: 12, gap: 8 },
  tab: { backgroundColor: '#F5F5F7', borderRadius: 12, paddingHorizontal: 24, paddingVertical: 8 },
  tabActive: { backgroundColor: '#FFD225', borderRadius: 12, paddingHorizontal: 24, paddingVertical: 8 },
  tabText: { color: '#7B7B93', fontWeight: '700', fontSize: 15 },
  tabTextActive: { color: '#252B5C', fontWeight: '700', fontSize: 15 },
  tabIcon: { backgroundColor: '#F5F5F7', borderRadius: 12, padding: 8, marginLeft: 8 },
  tabIconImg: { width: 22, height: 22, tintColor: '#252B5C' },
  agentCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F7', borderRadius: 16, marginHorizontal: 24, padding: 12, marginBottom: 12 },
  agentImg: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  agentName: { fontWeight: '700', color: '#252B5C', fontSize: 16 },
  agentRole: { color: '#7B7B93', fontSize: 13 },
  featuresRow: { flexDirection: 'row', gap: 12, marginHorizontal: 24, marginBottom: 12 },
  featureBadge: { backgroundColor: '#F5F5F7', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8 },
  featureText: { color: '#252B5C', fontWeight: '700', fontSize: 14 },
  sectionBox: { backgroundColor: '#fff', borderRadius: 16, marginHorizontal: 24, marginBottom: 16, padding: 16, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, elevation: 1 },
  sectionTitle: { fontWeight: '700', color: '#252B5C', fontSize: 16, marginBottom: 8 },
  sectionAddress: { color: '#7B7B93', fontSize: 13, marginBottom: 8 },
  distanceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  distanceText: { color: '#117C3E', fontWeight: '700', fontSize: 14 },
  distanceSubText: { color: '#7B7B93', fontSize: 13, marginLeft: 4 },
  facilitiesRow: { flexDirection: 'row', gap: 8 },
  facilityBadge: { backgroundColor: '#F5F5F7', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 },
  facilityText: { color: '#252B5C', fontWeight: '600', fontSize: 13 },
  mapBox: { backgroundColor: '#F5F5F7', borderRadius: 16, marginHorizontal: 24, marginBottom: 16, padding: 8, alignItems: 'center' },
  mapImg: { width: '100%', height: 120, borderRadius: 12, marginBottom: 8 },
  mapText: { color: '#117C3E', fontWeight: '700', fontSize: 14 },
  reviewsSummary: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#B89B2B', borderRadius: 12, padding: 12, marginBottom: 12 },
  starBox: { backgroundColor: '#fff', borderRadius: 8, width: 36, height: 36, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  star: { fontSize: 22, color: '#FFD225', fontWeight: '700' },
  ratingText: { color: '#fff', fontWeight: '700', fontSize: 22 },
  ratingSubText: { color: '#fff', fontSize: 13 },
  reviewersRow: { flexDirection: 'row', marginLeft: 12 },
  reviewerImg: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#fff', marginLeft: -10 },
  reviewCard: { backgroundColor: '#F5F5F7', borderRadius: 12, padding: 12, marginBottom: 10 },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  reviewUserImg: { width: 28, height: 28, borderRadius: 14, marginRight: 8 },
  reviewUserName: { fontWeight: '700', color: '#252B5C', fontSize: 14, marginRight: 8 },
  reviewRating: { color: '#FFD225', fontWeight: '700', fontSize: 14 },
  reviewText: { color: '#7B7B93', fontSize: 13 },
  viewAllBtn: { alignSelf: 'flex-end', marginTop: 8 },
  viewAllBtnText: { color: '#117C3E', fontWeight: '700', fontSize: 14 },
  nearbyScroll: { marginTop: 8 },
  nearbyCard: { width: 180, backgroundColor: '#fff', borderRadius: 14, marginRight: 12, padding: 10, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  nearbyImg: { width: '100%', height: 80, borderRadius: 10, marginBottom: 6 },
  nearbyBadgesRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  nearbyBadge: { backgroundColor: '#117C3E', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, marginRight: 6 },
  nearbyBadgeFeatured: { backgroundColor: '#FFD225', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  nearbyBadgeText: { color: '#fff', fontWeight: '700', fontSize: 11 },
  nearbyPrice: { color: '#252B5C', fontWeight: '700', fontSize: 15, marginBottom: 2 },
  nearbyLocation: { color: '#7B7B93', fontSize: 13 },
  nearbyType: { color: '#117C3E', fontSize: 12, fontWeight: '600' },
  nearbyDetailsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  nearbyDetailIcon: { fontSize: 16, color: '#B89B2B', marginRight: 4 },
  nearbyDetailText: { color: '#B89B2B', fontSize: 12, fontWeight: '600' },
});

export default PropertyDetails; 