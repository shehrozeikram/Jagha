import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const estateImages = [
  require('../assets/real_estate_land.png'),
  require('../assets/real_estate_residential.png'),
  require('../assets/real_estate_commercial.png'),
  require('../assets/real_estate_industrial.png'),
];

const FeaturedEstate = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
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
        <Image source={estateImages[0]} style={styles.mainImage} />
        <View style={styles.sideImages}>
          <Image source={estateImages[1]} style={styles.sideImage} />
          <Image source={estateImages[2]} style={styles.sideImage} />
        </View>
      </View>
      {/* Title & Subtitle */}
      <Text style={styles.title}>Featured Properties</Text>
      <Text style={styles.subtitle}>Our recommended real estates exclusive for you.</Text>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Image source={require('../assets/search.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search featured properties"
          placeholderTextColor="#BFC5D2"
        />
        {/* <Image source={require('../assets/microphone.png')} style={styles.micIcon} /> */}
      </View>
      {/* Properties Count & View Toggle */}
      <View style={styles.propertiesRow}>
        <Text style={styles.propertiesCount}><Text style={{fontWeight:'700'}}>70</Text> Properties</Text>
        {/* <View style={styles.toggleBtns}>
          <Image source={require('../assets/group_search.png')} style={styles.toggleIcon} />
          <Image source={require('../assets/vector.png')} style={styles.toggleIcon} />
        </View> */}
      </View>
      {/* Properties Grid */}
      <ScrollView contentContainerStyle={styles.cardsGrid} showsVerticalScrollIndicator={false}>
        {[0,1,2,3].map((i) => (
          <TouchableOpacity
            key={i}
            style={styles.card}
            onPress={() => navigation.navigate('PropertyDetails', {
              property: {
                image: estateImages[i%estateImages.length],
                price: '45.5 Lac to 2 Crore PKR',
                location: 'Rawalpindi',
                type: 'For Sale',
                size: '5 - 10 Marla',
                featured: true,
                title: 'Featured Property',
              }
            })}
          >
            <View style={{position:'relative'}}>
              <Image source={estateImages[i%estateImages.length]} style={styles.cardImage} />
              <View style={styles.heartCircle}><Image source={require('../assets/heart.png')} style={styles.heartIcon} /></View>
              <View style={styles.badgesRow}>
                <View style={styles.badgeForSale}><Text style={styles.badgeText}>For Sale</Text></View>
                <View style={styles.badgeFeatured}><Text style={styles.badgeText}>Featured</Text></View>
              </View>
            </View>
            <Text style={styles.cardPrice}>45.5 Lac to 2 Crore PKR</Text>
            <Text style={styles.cardLocation}>Rawalpindi</Text>
            <Text style={styles.cardForSale}>For Sale</Text>
            <View style={styles.cardDetailsRow}>
              <Image source={require('../assets/location.png')} style={styles.cardDetailIcon} />
              <Text style={styles.cardDetailText}>5 - 10 Marla</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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
});

export default FeaturedEstate; 