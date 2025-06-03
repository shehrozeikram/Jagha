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

// Mock data for favorites - in a real app, this would come from your backend/state management
const favorites = [
  {
    id: 1,
    image: require('../assets/real_estate_residential.png'),
    price: '45.5 Lac to 2 Crore PKR',
    location: 'Rawalpindi',
    type: 'For Sale',
    size: '5 - 10 Marla',
    featured: true,
    agent: {
      name: 'Sohail Qazi',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    }
  },
  {
    id: 2,
    image: require('../assets/real_estate_commercial.png'),
    price: '45.5 Lac to 2 Crore PKR',
    location: 'Rawalpindi',
    type: 'For Sale',
    size: '5 - 10 Marla',
    featured: true,
    agent: {
      name: 'Ali Khan',
      image: 'https://randomuser.me/api/portraits/men/33.jpg',
    }
  },
  // Add more mock favorites as needed
];

const Favorites = () => {
  const navigation = useNavigation();

  const renderFavorite = ({ item }) => (
    <TouchableOpacity 
      style={styles.listingCard}
      onPress={() => navigation.navigate('PropertyDetails', { property: item })}
    >
      <View style={styles.listingImgWrapper}>
        <Image source={item.image} style={styles.listingImg} />
        {item.type === 'For Sale' && <View style={styles.badgeGreen}><Text style={styles.badgeGreenText}>For Sale</Text></View>}
        {item.featured && <View style={styles.badgeGold}><Text style={styles.badgeGoldText}>Featured</Text></View>}
        <TouchableOpacity style={styles.heartBtn}>
          <Text style={styles.heartIcon}>♥</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.listingPrice}>{item.price}</Text>
      <View style={styles.listingRow}>
        <Text style={styles.locationIcon}>📍</Text>
        <Text style={styles.listingLocText}>{item.location}</Text>
      </View>
      <Text style={styles.listingType}>{item.type}</Text>
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
          <Text style={styles.headerTitle}>Favorites</Text>
          <TouchableOpacity style={styles.headerBtn}>
            <View style={styles.headerCircle}>
              <Text style={styles.filterIcon}>⚡</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderFavorite}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listingsGrid}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateEmoji}>💝</Text>
          <Text style={styles.emptyStateTitle}>No Favorites Yet</Text>
          <Text style={styles.emptyStateText}>
            Save your favorite properties here to view them later
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('HomeTab')}
          >
            <Text style={styles.browseButtonText}>Browse Properties</Text>
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
  heartBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  heartIcon: {
    fontSize: 18,
    color: '#E57373',
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
  listingType: {
    color: '#117C3E',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
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

export default Favorites; 