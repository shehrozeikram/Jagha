import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;

const agent = {
  name: 'Sohail Qazi',
  email: 'sohail.qazi@email.com',
  image: 'https://randomuser.me/api/portraits/men/32.jpg',
  rating: 5.0,
  reviews: 235,
  sold: 112,
  badge: '#1',
};

const listings = [
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
  {
    id: 5,
    image: require('../assets/real_estate_residential.png'),
    price: '1.5 Crore PKR',
    location: 'Karachi',
    type: 'For Sale',
    size: '6 Marla',
    featured: false,
  },
  {
    id: 6,
    image: require('../assets/real_estate_commercial.png'),
    price: '2.5 Crore PKR',
    location: 'Faisalabad',
    type: 'For Sale',
    size: '8 Marla',
    featured: false,
  },
];

const sold = [
  {
    id: 3,
    image: require('../assets/real_estate_industrial.png'),
    price: '1.2 Crore PKR',
    location: 'Islamabad',
    type: 'Sold',
    size: '8 Marla',
    featured: false,
  },
  {
    id: 4,
    image: require('../assets/real_estate_land.png'),
    price: '2.1 Crore PKR',
    location: 'Lahore',
    type: 'Sold',
    size: '12 Marla',
    featured: false,
  },
  {
    id: 7,
    image: require('../assets/real_estate_industrial.png'),
    price: '1.8 Crore PKR',
    location: 'Multan',
    type: 'Sold',
    size: '10 Marla',
    featured: false,
  },
  {
    id: 8,
    image: require('../assets/real_estate_land.png'),
    price: '2.3 Crore PKR',
    location: 'Peshawar',
    type: 'Sold',
    size: '15 Marla',
    featured: false,
  },
];

const TopAgentProfile = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Listings');

  const renderListing = ({ item }) => (
    <View style={styles.listingCard}>
      <View style={styles.listingImgWrapper}>
        <Image source={item.image} style={styles.listingImg} />
        {item.type === 'For Sale' && <View style={styles.badgeGreen}><Text style={styles.badgeGreenText}>For Sale</Text></View>}
        {item.featured && <View style={styles.badgeGold}><Text style={styles.badgeGoldText}>Featured</Text></View>}
        <TouchableOpacity style={styles.heartBtn}><Image source={require('../assets/heart.png')} style={styles.heartIcon} /></TouchableOpacity>
      </View>
      <Text style={styles.listingPrice}>{item.price}</Text>
      <View style={styles.listingRow}><Image source={require('../assets/location.png')} style={styles.listingLocIcon} /><Text style={styles.listingLocText}>{item.location}</Text></View>
      <Text style={styles.listingType}>{item.type}</Text>
      <View style={styles.listingRow}><Image source={require('../assets/size_icon.png')} style={styles.listingSizeIcon} /><Text style={styles.listingSizeText}>{item.size}</Text></View>
    </View>
  );

  const renderHeader = () => (
    <>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <View style={styles.headerCircle}><Image source={require('../assets/back_arrow.png')} style={styles.headerIcon} /></View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.headerBtn}><View style={styles.headerCircle}><Image source={require('../assets/vector.png')} style={styles.headerIcon} /></View></TouchableOpacity>
      </View>
      {/* Agent Info */}
      <View style={styles.agentInfoSection}>
        <View style={styles.agentImgWrapper}>
          <Image source={{ uri: agent.image }} style={styles.agentImg} />
          <View style={styles.agentBadge}><Text style={styles.agentBadgeText}>{agent.badge}</Text></View>
        </View>
        <Text style={styles.agentName}>{agent.name}</Text>
        <Text style={styles.agentEmail}>{agent.email}</Text>
      </View>
      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statCardActive}>
          <Text style={styles.statValue}>{agent.rating.toFixed(1)}</Text>
          <View style={styles.starsRow}>
            {[...Array(5)].map((_, i) => <Text key={i} style={styles.star}>★</Text>)}
          </View>
        </View>
        <View style={styles.statCard}><Text style={styles.statValue}>{agent.reviews}</Text><Text style={styles.statLabel}>Reviews</Text></View>
        <View style={styles.statCard}><Text style={styles.statValue}>{agent.sold}</Text><Text style={styles.statLabel}>Sold</Text></View>
      </View>
      {/* Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity style={[styles.tab, activeTab === 'Listings' && styles.tabActive]} onPress={() => setActiveTab('Listings')}>
          <Text style={activeTab === 'Listings' ? styles.tabActiveText : styles.tabText}>Listings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'Sold' && styles.tabActive]} onPress={() => setActiveTab('Sold')}>
          <Text style={activeTab === 'Sold' ? styles.tabActiveText : styles.tabText}>Sold</Text>
        </TouchableOpacity>
      </View>
      {/* Listings Count & Toggle */}
      <View style={styles.listingsHeaderRow}>
        <Text style={styles.listingsCount}>{activeTab === 'Listings' ? '140 listings' : '12 sold'}</Text>
        <View style={styles.toggleBtnsRow}>
          <View style={styles.toggleBtnActive}><Image source={require('../assets/group_search.png')} style={styles.toggleIcon} /></View>
          <View style={styles.toggleBtn}><Image source={require('../assets/vector.png')} style={styles.toggleIcon} /></View>
        </View>
      </View>
    </>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Sticky Header (Profile back button) */}
      <SafeAreaView style={{ backgroundColor: '#fff' }}>
         <View style={styles.headerRow}>
            <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
               <View style={styles.headerCircle}><Image source={require('../assets/back_arrow.png')} style={styles.headerIcon} /></View>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity style={styles.headerBtn}><View style={styles.headerCircle}><Image source={require('../assets/share.png')} style={styles.headerIcon} /></View></TouchableOpacity>
         </View>
      </SafeAreaView>
      {/* Scrollable Content (Agent Info, Tabs, Listings/Sold Cards, Start Chat Button) */}
      <FlatList
         data={activeTab === 'Listings' ? listings : sold}
         renderItem={renderListing}
         keyExtractor={item => item.id.toString()}
         numColumns={2}
         contentContainerStyle={styles.listingsGrid}
         showsVerticalScrollIndicator={false}
         ListHeaderComponent={() => (
           <View style={{ paddingTop: 8, paddingBottom: 8, marginTop: 16 }}>
             {/* Agent Info */}
             <View style={styles.agentInfoSection}>
               <View style={styles.agentImgWrapper}>
                 <Image source={{ uri: agent.image }} style={styles.agentImg} />
                 <View style={styles.agentBadge}><Text style={styles.agentBadgeText}>{agent.badge}</Text></View>
               </View>
               <Text style={styles.agentName}>{agent.name}</Text>
               <Text style={styles.agentEmail}>{agent.email}</Text>
             </View>
             {/* Stats Row */}
             <View style={styles.statsRow}>
               <View style={styles.statCardActive}>
                 <Text style={styles.statValue}>{agent.rating.toFixed(1)}</Text>
                 <View style={styles.starsRow}>
                   {[...Array(5)].map((_, i) => <Text key={i} style={styles.star}>★</Text>)}
                 </View>
               </View>
               <View style={styles.statCard}><Text style={styles.statValue}>{agent.reviews}</Text><Text style={styles.statLabel}>Reviews</Text></View>
               <View style={styles.statCard}><Text style={styles.statValue}>{agent.sold}</Text><Text style={styles.statLabel}>Sold</Text></View>
             </View>
             {/* Tabs */}
             <View style={styles.tabsRow}>
               <TouchableOpacity style={[styles.tab, activeTab === 'Listings' && styles.tabActive]} onPress={() => setActiveTab('Listings')}>
                 <Text style={activeTab === 'Listings' ? styles.tabActiveText : styles.tabText}>Listings</Text>
               </TouchableOpacity>
               <TouchableOpacity style={[styles.tab, activeTab === 'Sold' && styles.tabActive]} onPress={() => setActiveTab('Sold')}>
                 <Text style={activeTab === 'Sold' ? styles.tabActiveText : styles.tabText}>Sold</Text>
               </TouchableOpacity>
             </View>
             {/* Listings Count & Toggle */}
             <View style={styles.listingsHeaderRow}>
               <Text style={styles.listingsCount}>{activeTab === 'Listings' ? '140 listings' : '12 sold'}</Text>
               <View style={styles.toggleBtnsRow}>
                 {/* <View style={styles.toggleBtnActive}><Image source={require('../assets/group_search.png')} style={styles.toggleIcon} /></View>
                 <View style={styles.toggleBtn}><Image source={require('../assets/vector.png')} style={styles.toggleIcon} /></View> */}
               </View>
             </View>
           </View>
         )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 8, marginBottom: 8 },
  headerBtn: { },
  headerCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F5F4F8', alignItems: 'center', justifyContent: 'center' },
  headerIcon: { width: 22, height: 22, tintColor: '#252B5C' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#252B5C', textAlign: 'center' },
  agentInfoSection: { alignItems: 'center', marginTop: 8, marginBottom: 8 },
  agentImgWrapper: { position: 'relative', marginBottom: 8 },
  agentImg: { width: 90, height: 90, borderRadius: 45, borderWidth: 4, borderColor: '#fff', backgroundColor: '#eee' },
  agentBadge: { position: 'absolute', bottom: 4, right: 4, backgroundColor: '#A6E13B', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  agentBadgeText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  agentName: { color: '#252B5C', fontWeight: '700', fontSize: 18, marginBottom: 2, textAlign: 'center' },
  agentEmail: { color: '#7B7B93', fontSize: 14, marginBottom: 8, textAlign: 'center' },
  statsRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  statCardActive: { backgroundColor: '#F5F4F8', borderRadius: 16, padding: 16, alignItems: 'center', marginHorizontal: 6, minWidth: 90 },
  statCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, alignItems: 'center', marginHorizontal: 6, minWidth: 90, borderWidth: 1, borderColor: '#F5F4F8' },
  statValue: { color: '#252B5C', fontWeight: '700', fontSize: 18, marginBottom: 2 },
  statLabel: { color: '#7B7B93', fontSize: 14 },
  starsRow: { flexDirection: 'row', marginTop: 2 },
  star: { color: '#FFD225', fontSize: 18, marginRight: 2 },
  tabsRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#F5F4F8', borderRadius: 24, marginHorizontal: 16, marginBottom: 12, marginTop: 8, padding: 4, alignSelf: 'center', width: '86%' },
  tabActive: { backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 32, paddingVertical: 10, marginRight: 4 },
  tab: { backgroundColor: 'transparent', borderRadius: 20, paddingHorizontal: 32, paddingVertical: 10 },
  tabActiveText: { color: '#252B5C', fontWeight: '700', fontSize: 15 },
  tabText: { color: '#7B7B93', fontWeight: '700', fontSize: 15 },
  listingsHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 16, marginBottom: 8, marginTop: 16 },
  listingsCount: { color: '#7B7B93', fontWeight: '600', fontSize: 14, letterSpacing: 0.5 },
  toggleBtnsRow: { flexDirection: 'row', alignItems: 'center' },
  toggleBtnActive: { backgroundColor: '#F5F4F8', borderRadius: 10, padding: 8, marginRight: 8 },
  toggleBtn: { backgroundColor: '#fff', borderRadius: 10, padding: 8 },
  toggleIcon: { width: 20, height: 20, tintColor: '#252B5C' },
  listingsGrid: { paddingHorizontal: 8 },
  listingCard: { backgroundColor: '#F5F4F8', borderRadius: 18, width: CARD_WIDTH, margin: 8, padding: 10, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, elevation: 1 },
  listingImgWrapper: { position: 'relative' },
  listingImg: { width: '100%', height: 110, borderRadius: 14 },
  badgeGreen: { position: 'absolute', bottom: 8, left: 8, backgroundColor: '#117C3E', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 2, zIndex: 2 },
  badgeGreenText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  badgeGold: { position: 'absolute', bottom: 8, right: 8, backgroundColor: '#FFD225', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 2, zIndex: 2 },
  badgeGoldText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  heartBtn: { position: 'absolute', top: 8, right: 8, backgroundColor: '#fff', borderRadius: 16, width: 28, height: 28, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  heartIcon: { width: 18, height: 18, tintColor: '#E57373' },
  listingPrice: { color: '#252B5C', fontWeight: '700', fontSize: 15, marginTop: 8, marginBottom: 2 },
  listingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  listingLocIcon: { width: 14, height: 14, tintColor: '#117C3E', marginRight: 4 },
  listingLocText: { color: '#7B7B93', fontSize: 13 },
  listingType: { color: '#117C3E', fontSize: 13, fontWeight: '600', marginBottom: 2 },
  listingSizeIcon: { width: 16, height: 16, tintColor: '#B89B2B', marginRight: 4 },
  listingSizeText: { color: '#B89B2B', fontSize: 13, fontWeight: '600' },
  chatBtn: { position: 'absolute', left: 24, right: 24, bottom: 24, backgroundColor: 'linear-gradient(90deg, #FFE066 0%, #FFD60A 50%, #B89B2B 100%)', borderRadius: 16, paddingVertical: 18, alignItems: 'center', justifyContent: 'center', shadowColor: '#FFD225', shadowOpacity: 0.12, shadowRadius: 8, elevation: 2 },
  chatBtnText: { color: '#fff', fontWeight: '700', fontSize: 18, letterSpacing: 1 },
});

export default TopAgentProfile; 