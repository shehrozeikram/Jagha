import React, { useState } from 'react';
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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

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

const categoryTabs = ['All', 'House', 'Apartment', 'Farm House'];

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

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('Islamabad');
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const fabScale = useState(new Animated.Value(1))[0];

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

  // Filter listings based on selected category
  const filteredListings = selectedCategory === 'All'
    ? listings
    : listings.filter(l => l.type === selectedCategory);

  // Filter top cards based on selected category and search query
  const filteredTopCards = selectedCategory === 'All'
    ? topCards.filter(card => card.type === 'Farm House' || card.type === 'Land')
    : topCards.filter(card => card.type === selectedCategory);

  const searchedTopCards = searchQuery.trim().length === 0
    ? filteredTopCards
    : filteredTopCards.filter(card =>
        (card.title && card.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (card.type && card.type.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (card.desc && card.desc.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  // Filter listings for Featured Estates based on search query
  const searchedListings = searchQuery.trim().length === 0
    ? listings
    : listings.filter(l =>
        l.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.price.toLowerCase().includes(searchQuery.toLowerCase())
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
      {searchQuery.trim().length > 0 ? (
        searchedListings.length === 0 ? (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 48}}>
            <Text style={{fontSize: 60, marginBottom: 16}}>😕</Text>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#252B5C', marginBottom: 8, textAlign: 'center'}}>No properties found</Text>
          </View>
        ) : (
          <View style={{flex: 1, paddingHorizontal: 8, paddingBottom: 16}}>
            <Text style={{fontSize: 20, fontWeight: '700', color: '#252B5C', marginVertical: 16}}>
              Found {searchedListings.length} result{searchedListings.length > 1 ? 's' : ''}
            </Text>
            <FlatList
              data={searchedListings}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'flex-start'}}
              renderItem={({ item: listing }) => (
                <TouchableOpacity
                  key={listing.id}
                  onPress={() => navigation.navigate('FeaturedEstate', { listing })}
                  style={{
                    backgroundColor: '#F5F4F8',
                    borderRadius: 18,
                    width: (width - 40) / 2,
                    margin: 8,
                    padding: 10,
                    shadowColor: '#000',
                    shadowOpacity: 0.03,
                    shadowRadius: 4,
                    elevation: 1,
                  }}>
                  <View style={{position: 'relative'}}>
                    <Image source={listing.image} style={{width: '100%', height: 110, borderRadius: 14}} />
                    <View style={{position: 'absolute', bottom: 8, left: 8, backgroundColor: '#117C3E', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 2, zIndex: 2}}>
                      <Text style={{color: '#fff', fontWeight: '700', fontSize: 12}}>{listing.type}</Text>
                    </View>
                    {listing.featured && <View style={{position: 'absolute', bottom: 8, right: 8, backgroundColor: '#FFD225', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 2, zIndex: 2}}><Text style={{color: '#fff', fontWeight: '700', fontSize: 12}}>Featured</Text></View>}
                    <View style={{position: 'absolute', top: 8, right: 8, backgroundColor: '#fff', borderRadius: 16, width: 28, height: 28, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 2}}>
                      <Image source={require('../assets/heart.png')} style={{width: 18, height: 18, tintColor: '#E57373'}} />
                    </View>
                  </View>
                  <Text style={{color: '#252B5C', fontWeight: '700', fontSize: 15, marginTop: 8, marginBottom: 2}}>{listing.price}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 2}}>
                    <Image source={require('../assets/location.png')} style={{width: 14, height: 14, tintColor: '#117C3E', marginRight: 4}} />
                    <Text style={{color: '#7B7B93', fontSize: 13}}>{listing.location}</Text>
                  </View>
                  <Text style={{color: '#117C3E', fontSize: 13, fontWeight: '600', marginBottom: 2}}>{listing.type}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 2}}>
                    <Image source={require('../assets/size_icon.png')} style={{width: 16, height: 16, tintColor: '#B89B2B', marginRight: 4}} />
                    <Text style={{color: '#B89B2B', fontSize: 13, fontWeight: '600'}}>{listing.size}</Text>
                  </View>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 32}}
          />
        </View>
        )
      ) : (
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
              {searchedTopCards.map(card => (
                <View key={card.id} style={styles.featuredCard}>
                  <Image source={card.image} style={styles.featuredImg} />
            {/* Overlay content */}
            <View style={styles.featuredOverlay}>
                    <Text style={styles.featuredTitleOverlay}>{card.title}</Text>
                    <Text style={styles.featuredDescOverlay}>{card.desc}</Text>
                    <View style={styles.featuredBadgeOverlay}><Text style={styles.featuredBadgeTextOverlay}>{card.badge}</Text></View>
              <TouchableOpacity style={styles.detailsBtnOverlay}><Text style={styles.detailsBtnTextOverlay}>Details</Text></TouchableOpacity>
            </View>
          </View>
              ))}
        </ScrollView>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
              {searchedTopCards.map(listing => (
            <TouchableOpacity
                  key={listing.id}
                  onPress={() => navigation.navigate('FeaturedEstate', { listing })}
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
                    <Image source={listing.image} style={{width: 100, height: 136, borderRadius: 10}} />
                <View style={{position: 'absolute', top: 8, left: 8, backgroundColor: '#7ED957', borderRadius: 16, width: 28, height: 28, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>♥</Text>
                </View>
                <View style={{position: 'absolute', bottom: 8, left: 8, backgroundColor: '#252B5C', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2}}>
                      <Text style={{color: 'white', fontSize: 11, fontWeight: '600'}}>{listing.type}</Text>
                </View>
              </View>
              {/* Details */}
              <View style={{flex: 1, marginLeft: 12, justifyContent: 'center'}}>
                    <Text style={{color: '#252B5C', fontWeight: '700', fontSize: 16, marginBottom: 2}}>{listing.price}</Text>
                <Text style={{color: '#7B7B93', fontSize: 13, marginBottom: 2}}>Gallery</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 2}}>
                  <Text style={{color: '#117C3E', fontSize: 13}}>📍</Text>
                      <Text style={{color: '#7B7B93', fontSize: 13, marginLeft: 4}}>{listing.location}</Text>
                </View>
                    <Text style={{color: '#252B5C', fontWeight: '700', fontSize: 13, marginTop: 8}}>{listing.size}</Text>
              </View>
            </TouchableOpacity>
              ))}
            </ScrollView>
          )}
          {/* Featured Estates Section: Always show all listings */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Featured Estates</Text>
            <TouchableOpacity><Text style={styles.sectionLink}>view all</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginLeft: 24, marginBottom: 16}}>
            <View style={{flexDirection: 'row'}}>
              {searchedListings.map(listing => (
            <TouchableOpacity
                  key={listing.id}
                  onPress={() => navigation.navigate('FeaturedEstate', { listing })}
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
                    <Image source={listing.image} style={{width: 100, height: 136, borderRadius: 10}} />
                <View style={{position: 'absolute', top: 8, left: 8, backgroundColor: '#7ED957', borderRadius: 16, width: 28, height: 28, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>♥</Text>
                </View>
                <View style={{position: 'absolute', bottom: 8, left: 8, backgroundColor: '#252B5C', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2}}>
                      <Text style={{color: 'white', fontSize: 11, fontWeight: '600'}}>{listing.type}</Text>
                </View>
              </View>
              {/* Details */}
              <View style={{flex: 1, marginLeft: 12, justifyContent: 'center'}}>
                    <Text style={{color: '#252B5C', fontWeight: '700', fontSize: 16, marginBottom: 2}}>{listing.price}</Text>
                <Text style={{color: '#7B7B93', fontSize: 13, marginBottom: 2}}>Gallery</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 2}}>
                  <Text style={{color: '#117C3E', fontSize: 13}}>📍</Text>
                      <Text style={{color: '#7B7B93', fontSize: 13, marginLeft: 4}}>{listing.location}</Text>
                </View>
                    <Text style={{color: '#252B5C', fontWeight: '700', fontSize: 13, marginTop: 8}}>{listing.size}</Text>
              </View>
            </TouchableOpacity>
              ))}
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
        {/* Explore Nearby Estates */}
        <View style={{marginHorizontal: 24}}>
          <Text style={styles.sectionTitle}>Explore Nearby Estates</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginHorizontal: 24, marginBottom: 24}}>
          <View style={styles.nearbyCardV2}>
            <View style={{position: 'relative'}}>
              <Image source={require('../assets/real_estate_commercial.png')} style={styles.nearbyImgV2} />
              <View style={styles.nearbyHeart}><Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>♥</Text></View>
              <View style={styles.nearbyBadgesRow}>
                <View style={styles.nearbyBadgeV2}><Text style={{color: '#fff', fontSize: 11, fontWeight: '600'}}>For Sale</Text></View>
                <View style={styles.nearbyBadgeFeaturedV2}><Text style={{color: '#fff', fontSize: 11, fontWeight: '600'}}>Featured</Text></View>
              </View>
            </View>
            <Text style={styles.nearbyPriceV2}>45.5 Lac to 2 Crore PKR</Text>
            <View style={styles.nearbyLocationRow}>
              <Image source={require('../assets/location.png')} style={styles.nearbyLocationIcon} />
              <Text style={styles.nearbyLocationText}>Islamabad</Text>
              <Text style={styles.nearbyForSaleText}>For Sale</Text>
            </View>
            <View style={styles.nearbySizeRow}>
              <Image source={require('../assets/size_icon.png')} style={styles.nearbySizeIcon} />
              <Text style={styles.nearbySizeText}>5 - 10 Marla</Text>
            </View>
          </View>
          <View style={styles.nearbyCardV2}>
            <View style={{position: 'relative'}}>
              <Image source={{uri: 'https://source.unsplash.com/400x300/?villa,3'}} style={styles.nearbyImgV2} />
              <View style={styles.nearbyHeart}><Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>♥</Text></View>
              <View style={styles.nearbyBadgesRow}>
                <View style={styles.nearbyBadgeV2}><Text style={{color: '#fff', fontSize: 11, fontWeight: '600'}}>For Sale</Text></View>
                <View style={styles.nearbyBadgeFeaturedV2}><Text style={{color: '#fff', fontSize: 11, fontWeight: '600'}}>Featured</Text></View>
              </View>
            </View>
            <Text style={styles.nearbyPriceV2}>60 Lac to 1.2 Crore PKR</Text>
            <View style={styles.nearbyLocationRow}>
              <Image source={require('../assets/location.png')} style={styles.nearbyLocationIcon} />
              <Text style={styles.nearbyLocationText}>Lahore</Text>
              <Text style={styles.nearbyForSaleText}>For Sale</Text>
            </View>
            <View style={styles.nearbySizeRow}>
              <Image source={require('../assets/size_icon.png')} style={styles.nearbySizeIcon} />
              <Text style={styles.nearbySizeText}>1 - 3 Marla</Text>
            </View>
          </View>
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
});

export default Home; 