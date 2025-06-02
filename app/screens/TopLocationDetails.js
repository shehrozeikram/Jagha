import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const mainImgSize = width * 0.6;
const galleryImgSize = (mainImgSize - 16) / 3;

const galleryImages = [
  require('../assets/real_estate_residential.png'),
  require('../assets/real_estate_commercial.png'),
  require('../assets/real_estate_industrial.png'),
];

const propertyData = {
  image: require('../assets/real_estate_residential.png'),
  price: '1 Crore 78 Lac PKR',
  location: 'Islamabad',
  type: 'For Sale',
  size: '10 Marla',
  tag: 'House',
};

const TopLocationDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { location, index } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Gallery Row */}
      <View style={styles.galleryRow}>
        <View style={styles.mainImageContainer}>
          <Image source={location?.image} style={styles.mainImage} />
          {/* Back Button */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <View style={styles.backCircle}>
              <Image source={require('../assets/back_arrow.png')} style={styles.backIcon} />
            </View>
          </TouchableOpacity>
          {/* Badge */}
          <View style={styles.badge}><Text style={styles.badgeText}>{`#${index + 1}`}</Text></View>
        </View>
        <View style={styles.galleryCol}>
          <Image source={galleryImages[0]} style={styles.galleryImg} />
          <Image source={galleryImages[1]} style={styles.galleryImg} />
          <View style={{position:'relative'}}>
            <Image source={galleryImages[2]} style={styles.galleryImg} />
            {/* Filter Button */}
            <TouchableOpacity style={styles.filterBtn}>
              <Image source={require('../assets/group_search.png')} style={styles.filterIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Title & Subtitle */}
      <Text style={styles.title}>{location?.name}</Text>
      <Text style={styles.subtitle}>Our recommended real estates in {location?.name?.replace(' / ', '/')}</Text>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Modern House"
          placeholderTextColor="#7B7B93"
        />
        <Image source={require('../assets/search.png')} style={styles.searchIcon} />
      </View>
      {/* Property Count & View Toggle */}
      <View style={styles.countRow}>
        <Text style={styles.foundText}>Found <Text style={styles.boldText}>128</Text> Properties</Text>
        <View style={styles.toggleBtns}>
          <View style={styles.toggleBtnActive} />
          <View style={styles.toggleBtn} />
        </View>
      </View>
      {/* Filter Chips */}
      <View style={styles.chipsRow}>
        <View style={styles.chip}><Text style={styles.chipText}>House</Text><TouchableOpacity style={styles.chipClose}><Text style={styles.chipCloseText}>×</Text></TouchableOpacity></View>
        <View style={styles.chip}><Text style={styles.chipText}>150 Lac - 2 Crore</Text><TouchableOpacity style={styles.chipClose}><Text style={styles.chipCloseText}>×</Text></TouchableOpacity></View>
      </View>
      {/* Property Card */}
      <View style={styles.propertyCardWrapper}>
        <View style={styles.propertyCardRow}>
          <View style={styles.propertyImgWrapperRow}>
            <Image source={propertyData.image} style={styles.propertyImgRow} />
            {/* Heart Icon (top left) */}
            <TouchableOpacity style={styles.heartBtnRow}>
              <Image source={require('../assets/heart.png')} style={styles.heartIcon} />
            </TouchableOpacity>
            {/* House Tag (bottom left) */}
            <View style={styles.propertyTagRow}><Text style={styles.propertyTagText}>House</Text></View>
          </View>
          <View style={styles.propertyInfoRow}>
            <Text style={styles.propertyPrice}>{propertyData.price}</Text>
            <Text style={styles.propertyLocation}>{propertyData.location}</Text>
            <Text style={styles.propertyType}>{propertyData.type}</Text>
            <View style={styles.propertyDetailsRow}>
              <Image source={require('../assets/location.png')} style={styles.propertyDetailIcon} />
              <Text style={styles.propertyDetailText}>{propertyData.size}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, alignItems: 'center' },
  galleryRow: { flexDirection: 'row', marginTop: 8, marginBottom: 12, alignSelf: 'center' },
  mainImageContainer: { position: 'relative', width: mainImgSize, height: mainImgSize, borderRadius: 18, overflow: 'hidden', marginRight: 12 },
  mainImage: { width: '100%', height: '100%', borderRadius: 18, resizeMode: 'cover' },
  backBtn: { position: 'absolute', top: 12, left: 12, zIndex: 2, },
  backCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  backIcon: { width: 22, height: 22, tintColor: '#252B5C' },
  badge: { position: 'absolute', bottom: 12, left: 12, backgroundColor: '#A6E13B', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 6, zIndex: 2 },
  badgeText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  galleryCol: { justifyContent: 'space-between', alignItems: 'center', height: mainImgSize, },
  galleryImg: { width: galleryImgSize, height: galleryImgSize, borderRadius: 10, marginBottom: 6, resizeMode: 'cover' },
  filterBtn: { position: 'absolute', top: 6, right: 6, width: 32, height: 32, borderRadius: 16, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  filterIcon: { width: 20, height: 20, tintColor: '#252B5C' },
  title: { fontSize: 24, fontWeight: '700', color: '#252B5C', marginTop: 8, textAlign: 'center', alignSelf: 'center' },
  subtitle: { fontSize: 15, color: '#7B7B93', marginBottom: 12, marginTop: 2, textAlign: 'center', alignSelf: 'center' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F4F8', borderRadius: 16, paddingHorizontal: 16, height: 48, marginBottom: 16, width: '90%', maxWidth: 400, alignSelf: 'center' },
  searchInput: { flex: 1, fontSize: 16, color: '#252B5C' },
  searchIcon: { width: 20, height: 20, tintColor: '#7B7B93', marginLeft: 8 },
  countRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 8, alignSelf: 'center' },
  foundText: { fontSize: 16, color: '#252B5C', textAlign: 'center' },
  boldText: { fontWeight: '700', color: '#252B5C' },
  toggleBtns: { flexDirection: 'row', alignItems: 'center', marginLeft: 12 },
  toggleBtnActive: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#F5F4F8', marginRight: 8, borderWidth: 2, borderColor: '#252B5C' },
  toggleBtn: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#F5F4F8' },
  chipsRow: { flexDirection: 'row', marginBottom: 16, alignSelf: 'center' },
  chip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E6F4C7', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, marginRight: 8 },
  chipText: { color: '#7B7B93', fontWeight: '700', fontSize: 15, marginRight: 6 },
  chipClose: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#D1E7B6', alignItems: 'center', justifyContent: 'center' },
  chipCloseText: { color: '#7B7B93', fontWeight: '700', fontSize: 16, lineHeight: 18 },
  propertyCardWrapper: {
    backgroundColor: '#F5F4F8',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    padding: 16,
    marginBottom: 24,
    alignSelf: 'center',
    width: '90%',
    maxWidth: 360,
  },
  propertyCardRow: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1, overflow: 'hidden', alignSelf: 'center', width: '100%', maxWidth: 400, minHeight: 140 },
  propertyImgWrapperRow: { position: 'relative', width: 120, height: 120, borderTopLeftRadius: 16, borderBottomLeftRadius: 16, overflow: 'hidden', backgroundColor: '#eee', margin: 10 },
  propertyImgRow: { width: '100%', height: '100%', borderRadius: 12, resizeMode: 'cover' },
  heartBtnRow: { position: 'absolute', top: 8, left: 8, backgroundColor: '#fff', borderRadius: 16, width: 28, height: 28, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  propertyTagRow: { position: 'absolute', bottom: 8, left: 8, backgroundColor: '#FFD225', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  propertyInfoRow: { flex: 1, padding: 14, justifyContent: 'center' },
  propertyPrice: { color: '#252B5C', fontWeight: '700', fontSize: 18, marginBottom: 2 },
  propertyLocation: { color: '#7B7B93', fontSize: 14, marginBottom: 2 },
  propertyType: { color: '#117C3E', fontSize: 14, fontWeight: '600', marginBottom: 2 },
  propertyDetailsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  propertyDetailIcon: { width: 16, height: 16, tintColor: '#B89B2B', marginRight: 4 },
  propertyDetailText: { color: '#B89B2B', fontSize: 13, fontWeight: '600' },
  propertyTagText: { color: '#252B5C', fontWeight: '700', fontSize: 14 },
});

export default TopLocationDetails; 