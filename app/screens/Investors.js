import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;

// Mock data for investment properties
const investmentProperties = [
  {
    id: 1,
    image: require('../assets/real_estate_commercial.png'),
    price: '2.5 Crore PKR',
    location: 'Islamabad',
    type: 'Commercial',
    size: '10 Marla',
    featured: true,
    roi: '12%',
    agent: {
      name: 'Sohail Qazi',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    }
  },
  {
    id: 2,
    image: require('../assets/real_estate_residential.png'),
    price: '1.8 Crore PKR',
    location: 'Lahore',
    type: 'Residential',
    size: '8 Marla',
    featured: true,
    roi: '15%',
    agent: {
      name: 'Ali Khan',
      image: 'https://randomuser.me/api/portraits/men/33.jpg',
    }
  },
  {
    id: 3,
    image: require('../assets/real_estate_commercial.png'),
    price: '3.2 Crore PKR',
    location: 'Karachi',
    type: 'Commercial',
    size: '12 Marla',
    featured: false,
    roi: '18%',
    agent: {
      name: 'Fatima Ali',
      image: 'https://randomuser.me/api/portraits/women/34.jpg',
    }
  },
  {
    id: 4,
    image: require('../assets/real_estate_residential.png'),
    price: '1.5 Crore PKR',
    location: 'Rawalpindi',
    type: 'Residential',
    size: '6 Marla',
    featured: false,
    roi: '14%',
    agent: {
      name: 'Usman Khan',
      image: 'https://randomuser.me/api/portraits/men/35.jpg',
    }
  },
];

const Investors = () => {
  const navigation = useNavigation();

  const renderProperty = ({ item }) => (
    <TouchableOpacity 
      style={styles.listingCard}
      onPress={() => navigation.navigate('PropertyDetails', { property: item })}
    >
      <View style={styles.listingImgWrapper}>
        <Image source={item.image} style={styles.listingImg} />
        <View style={styles.badgeGreen}>
          <Text style={styles.badgeGreenText}>{item.type}</Text>
        </View>
        {item.featured && <View style={styles.badgeGold}><Text style={styles.badgeGoldText}>Featured</Text></View>}
        <View style={styles.roiBadge}>
          <Text style={styles.roiText}>ROI {item.roi}</Text>
        </View>
      </View>
      <Text style={styles.listingPrice}>{item.price}</Text>
      <View style={styles.listingRow}>
        <Text style={styles.locationIcon}>📍</Text>
        <Text style={styles.listingLocText}>{item.location}</Text>
      </View>
      <View style={styles.listingRow}>
        <Text style={styles.sizeIcon}>📏</Text>
        <Text style={styles.listingSizeText}>{item.size}</Text>
      </View>
      <View style={styles.agentRow}>
        <Image source={{ uri: item.agent.image }} style={styles.agentImg} />
        <Text style={styles.agentName}>{item.agent.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerRow}>
          <TouchableOpacity 
            style={styles.headerBtn} 
            onPress={() => navigation.goBack()}
          >
            <View style={styles.headerCircle}>
              <Text style={styles.backIcon}>←</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Investment Properties</Text>
          <TouchableOpacity style={styles.headerBtn}>
            <View style={styles.headerCircle}>
              <Text style={styles.filterIcon}>⚡</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {investmentProperties.length > 0 ? (
        <FlatList
          data={investmentProperties}
          renderItem={renderProperty}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listingsGrid}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateEmoji}>💰</Text>
          <Text style={styles.emptyStateTitle}>No Investment Properties</Text>
          <Text style={styles.emptyStateText}>
            Check back later for new investment opportunities
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('HomeTab')}
          >
            <Text style={styles.browseButtonText}>Browse All Properties</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  headerBtn: {},
  headerCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#252B5C',
  },
  filterIcon: {
    fontSize: 20,
    color: '#252B5C',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#252B5C',
  },
  listingsGrid: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  listingCard: {
    backgroundColor: '#F5F4F8',
    borderRadius: 18,
    width: CARD_WIDTH,
    margin: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  listingImgWrapper: {
    position: 'relative',
  },
  listingImg: {
    width: '100%',
    height: 110,
    borderRadius: 14,
  },
  badgeGreen: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#117C3E',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    zIndex: 2,
  },
  badgeGreenText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  badgeGold: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#FFD225',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    zIndex: 2,
  },
  badgeGoldText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  roiBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#252B5C',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    zIndex: 2,
  },
  roiText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  listingPrice: {
    color: '#252B5C',
    fontWeight: '700',
    fontSize: 15,
    marginTop: 8,
    marginBottom: 2,
  },
  listingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  locationIcon: {
    fontSize: 14,
    color: '#117C3E',
    marginRight: 4,
  },
  sizeIcon: {
    fontSize: 16,
    color: '#B89B2B',
    marginRight: 4,
  },
  listingLocText: {
    color: '#7B7B93',
    fontSize: 13,
  },
  listingSizeText: {
    color: '#B89B2B',
    fontSize: 13,
    fontWeight: '600',
  },
  agentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  agentImg: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  agentName: {
    color: '#252B5C',
    fontSize: 13,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyStateEmoji: {
    fontSize: 80,
    marginBottom: 24,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#252B5C',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#7B7B93',
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#FFD225',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
  },
  browseButtonText: {
    color: '#252B5C',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Investors; 