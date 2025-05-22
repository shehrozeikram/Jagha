import React from 'react';
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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const Home = () => {
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.locationBtn}>
            <Image source={require('../assets/location.png')} style={styles.locationIcon} />
            <Text style={styles.locationText}>Islamabad, Pakistan</Text>
            <Image source={require('../assets/chevron_down.png')} style={styles.chevronIcon} />
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            {/* <TouchableOpacity style={styles.iconBtn}>
              <Image source={require('../assets/bell_icon.png')} style={styles.headerIcon} />
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.profileBtn}>
              <Image source={{uri: 'https://randomuser.me/api/portraits/men/32.jpg'}} style={styles.profileImg} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.greetingBox}>
          <Text style={styles.greeting1}>Hey, <Text style={styles.goldText}>Ali Khan</Text></Text>
          <Text style={styles.greeting2}>Let's start exploring</Text>
        </View>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Image source={require('../assets/search.png')} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search House, Apartment, etc"
            placeholderTextColor="#7B7B93"
          />
        </View>
        {/* Category Tabs */}
        <View style={styles.tabsRow}>
          <TouchableOpacity style={styles.tabActive}><Text style={styles.tabActiveText}>All</Text></TouchableOpacity>
          <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>House</Text></TouchableOpacity>
          <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Apartment</Text></TouchableOpacity>
          <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Farm House</Text></TouchableOpacity>
        </View>
        {/* Featured Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
          <View style={styles.featuredCard}>
            <Image source={require('../assets/real_estate_land.png')} style={styles.featuredImg} />
            {/* Overlay content */}
            <View style={styles.featuredOverlay}>
              <Text style={styles.featuredTitleOverlay}>Farm House</Text>
              <Text style={styles.featuredDescOverlay}>Recently Added in Islamabad</Text>
              <View style={styles.featuredBadgeOverlay}><Text style={styles.featuredBadgeTextOverlay}>Featured</Text></View>
              <TouchableOpacity style={styles.detailsBtnOverlay}><Text style={styles.detailsBtnTextOverlay}>Details</Text></TouchableOpacity>
            </View>
          </View>
          <View style={styles.featuredCard}>
            <Image source={require('../assets/real_estate_land.png')} style={styles.featuredImg} />
            {/* Overlay content */}
            <View style={styles.featuredOverlay}>
              <Text style={styles.featuredTitleOverlay}>Land</Text>
              <Text style={styles.featuredDescOverlay}>Recently Added Land in Islamabad</Text>
              <View style={styles.featuredBadgeOverlay}><Text style={styles.featuredBadgeTextOverlay}>Land</Text></View>
              <TouchableOpacity style={styles.detailsBtnOverlay}><Text style={styles.detailsBtnTextOverlay}>Details</Text></TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {/* Featured Estates */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Featured Estates</Text>
          <TouchableOpacity><Text style={styles.sectionLink}>view all</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginLeft: 24, marginBottom: 12}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{
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
                <Image source={require('../assets/real_estate_land.png')} style={{width: 100, height: 136, borderRadius: 10}} />
                <View style={{position: 'absolute', top: 8, left: 8, backgroundColor: '#7ED957', borderRadius: 16, width: 28, height: 28, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>♥</Text>
                </View>
                <View style={{position: 'absolute', bottom: 8, left: 8, backgroundColor: '#252B5C', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2}}>
                  <Text style={{color: 'white', fontSize: 11, fontWeight: '600'}}>Apartment</Text>
                </View>
              </View>
              {/* Details */}
              <View style={{flex: 1, marginLeft: 12, justifyContent: 'center'}}>
                <Text style={{color: '#252B5C', fontWeight: '700', fontSize: 16, marginBottom: 2}}>50 Lac to 1 Crore</Text>
                <Text style={{color: '#7B7B93', fontSize: 13, marginBottom: 2}}>Gallery</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 2}}>
                  <Text style={{color: '#117C3E', fontSize: 13}}>📍</Text>
                  <Text style={{color: '#7B7B93', fontSize: 13, marginLeft: 4}}>Islamabad</Text>
                </View>
                <Text style={{color: '#252B5C', fontWeight: '700', fontSize: 13, marginTop: 8}}>0.5-2 Marla</Text>
              </View>
            </View>
            <View style={{
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
                <Image source={{uri: 'https://source.unsplash.com/400x300/?apartment,2'}} style={{width: 100, height: 136, borderRadius: 10}} />
                <View style={{position: 'absolute', top: 8, left: 8, backgroundColor: '#7ED957', borderRadius: 16, width: 28, height: 28, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>♥</Text>
                </View>
                <View style={{position: 'absolute', bottom: 8, left: 8, backgroundColor: '#252B5C', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2}}>
                  <Text style={{color: 'white', fontSize: 11, fontWeight: '600'}}>Apartment</Text>
                </View>
              </View>
              {/* Details */}
              <View style={{flex: 1, marginLeft: 12, justifyContent: 'center'}}>
                <Text style={{color: '#252B5C', fontWeight: '700', fontSize: 16, marginBottom: 2}}>60 Lac to 1.2 Crore</Text>
                <Text style={{color: '#7B7B93', fontSize: 13, marginBottom: 2}}>Gallery</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 2}}>
                  <Text style={{color: '#117C3E', fontSize: 13}}>📍</Text>
                  <Text style={{color: '#7B7B93', fontSize: 13, marginLeft: 4}}>Lahore</Text>
                </View>
                <Text style={{color: '#252B5C', fontWeight: '700', fontSize: 13, marginTop: 8}}>1-3 Marla</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        {/* Top Locations */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Top Locations</Text>
          <TouchableOpacity><Text style={styles.sectionLink}>explore</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginHorizontal: 24, marginBottom: 12}}>
          <View style={styles.locationPill}>
            <Image source={{uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80'}} style={styles.locationPillImg} />
            <Text style={styles.locationPillText}>Islamabad</Text>
          </View>
          <View style={styles.locationPill}>
            <Image source={{uri: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=80&q=80'}} style={styles.locationPillImg} />
            <Text style={styles.locationPillText}>Lahore</Text>
          </View>
          <View style={styles.locationPill}>
            <Image source={{uri: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=80&q=80'}} style={styles.locationPillImg} />
            <Text style={styles.locationPillText}>Karachi</Text>
          </View>
          <View style={styles.locationPill}>
            <Image source={require('../assets/real_estate_land.png')} style={styles.locationPillImg} />
            <Text style={styles.locationPillText}>Land</Text>
          </View>
        </ScrollView>
        {/* Top Agent */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Top Agent</Text>
          <TouchableOpacity><Text style={styles.sectionLink}>explore</Text></TouchableOpacity>
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
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navBtnActive}>
          <Image source={require('../assets/house-active.png')} style={styles.navIconActive} />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn}>
          <Image source={require('../assets/nav_icon.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Investors</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtnCenter}>
          <View style={styles.navCenterCircle}>
            <Image source={require('../assets/zoom.png')} style={styles.navCenterIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn}>
          <Image source={require('../assets/heart.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn}>
          <Image source={require('../assets/profile.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
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
  bottomNav: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 70, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, borderTopLeftRadius: 18, borderTopRightRadius: 18, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 8 },
  navBtn: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  navBtnActive: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  navIcon: { width: 24, height: 24, tintColor: '#7B7B93' },
  navIconActive: { width: 24, height: 24, tintColor: '#B89B2B' },
  navText: { color: '#7B7B93', fontSize: 12, fontWeight: '600', marginTop: 2 },
  navTextActive: { color: '#B89B2B', fontSize: 12, fontWeight: '700', marginTop: 2 },
  navBtnCenter: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  navCenterCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#B79C35', alignItems: 'center', justifyContent: 'center', marginTop: -24 },
  navCenterIcon: { width: 28, height: 28, tintColor: '#fff' },
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
});

export default Home; 