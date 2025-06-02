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

const locations = [
  {
    id: 1,
    name: 'Islamabad / Rawalpindi',
    image: require('../assets/real_estate_land.png'),
  },
  {
    id: 2,
    name: 'Lahore',
    image: require('../assets/real_estate_residential.png'),
  },
  {
    id: 3,
    name: 'Karachi',
    image: require('../assets/real_estate_commercial.png'),
  },
  {
    id: 4,
    name: 'Quetta',
    image: require('../assets/real_estate_industrial.png'),
  },
  {
    id: 5,
    name: 'Peshawar',
    image: require('../assets/real_estate_land.png'),
  },
  {
    id: 6,
    name: 'Swat',
    image: require('../assets/real_estate_residential.png'),
  },
];

const TopLocation = () => {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => navigation.navigate('TopLocationDetails', { location: item, index })} style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{`#${index + 1}`}</Text>
        </View>
      </View>
      <Text style={styles.cityName} numberOfLines={1}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back_arrow.png')} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>
      {/* Title & Subtitle */}
      <Text style={styles.title}>Top Locations</Text>
      <Text style={styles.subtitle}>Find the best recommendations place to live</Text>
      {/* Grid List */}
      <FlatList
        data={locations}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const CARD_WIDTH = (width - 64) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 8,
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    width: 20,
    height: 20,
    tintColor: '#252B5C',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#252B5C',
    marginLeft: 16,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#7B7B93',
    marginLeft: 16,
    marginBottom: 16,
    marginTop: 4,
  },
  grid: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    marginRight: 16,
    width: CARD_WIDTH,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
    alignItems: 'center',
    paddingBottom: 12,
  },
  imageWrapper: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    marginBottom: 8,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#A6E13B',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    zIndex: 2,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  cityName: {
    color: '#252B5C',
    fontWeight: '700',
    fontSize: 16,
    marginTop: 4,
    marginHorizontal: 8,
    alignSelf: 'flex-start',
  },
});

export default TopLocation; 