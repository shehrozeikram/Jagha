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

const agents = [
  {
    id: 1,
    name: 'Sohail Qazi',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    sold: 112,
  },
  {
    id: 2,
    name: 'Nazir Ahmad',
    image: 'https://randomuser.me/api/portraits/men/33.jpg',
    rating: 4.9,
    sold: 112,
  },
  {
    id: 3,
    name: 'Zobia Fawad',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4.9,
    sold: 112,
  },
  {
    id: 4,
    name: 'Ali Aslam',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 4.9,
    sold: 112,
  },
  {
    id: 5,
    name: 'Bashir Awan',
    image: 'https://randomuser.me/api/portraits/men/46.jpg',
    rating: 4.9,
    sold: 112,
  },
  {
    id: 6,
    name: 'Munir Ul Haq',
    image: 'https://randomuser.me/api/portraits/men/47.jpg',
    rating: 4.9,
    sold: 112,
  },
];

const CARD_WIDTH = (width - 48) / 2;

const TopAgent = () => {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <View style={styles.badge}><Text style={styles.badgeText}>{`#${index + 1}`}</Text></View>
      <Image source={{ uri: item.image }} style={styles.agentImg} />
      <Text style={styles.agentName}>{item.name}</Text>
      <View style={styles.agentStatsRow}>
        <Text style={styles.agentStar}>★</Text>
        <Text style={styles.agentRating}>{item.rating}</Text>
        <Text style={styles.agentSold}>{item.sold} Sold</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
        <View style={styles.backCircle}>
          <Image source={require('../assets/back_arrow.png')} style={styles.backIcon} />
        </View>
      </TouchableOpacity>
      {/* Title & Subtitle */}
      <Text style={styles.title}>Top Real Estate Agent</Text>
      <Text style={styles.subtitle}>Find the best recommendations place to live</Text>
      {/* Grid List */}
      <FlatList
        data={agents}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 0, alignItems: 'stretch' },
  headerBtn: { marginTop: 16, marginBottom: 8, marginLeft: 16, alignSelf: 'flex-start' },
  backCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  backIcon: { width: 22, height: 22, tintColor: '#252B5C' },
  title: { fontSize: 26, fontWeight: '700', color: '#252B5C', marginTop: 8, marginBottom: 2, textAlign: 'left', marginLeft: 16 },
  subtitle: { fontSize: 15, color: '#7B7B93', marginBottom: 18, textAlign: 'left', marginLeft: 16 },
  grid: { paddingBottom: 24, marginLeft: 8 },
  card: { backgroundColor: '#F5F4F8', borderRadius: 18, width: CARD_WIDTH, margin: 8, alignItems: 'center', paddingVertical: 18, paddingHorizontal: 8, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, elevation: 1 },
  badge: { position: 'absolute', top: 12, left: 12, backgroundColor: '#A6E13B', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 2, zIndex: 2 },
  badgeText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  agentImg: { width: 70, height: 70, borderRadius: 35, marginBottom: 10, marginTop: 10, borderWidth: 4, borderColor: '#fff', backgroundColor: '#eee' },
  agentName: { color: '#252B5C', fontWeight: '700', fontSize: 16, marginBottom: 4 },
  agentStatsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  agentStar: { color: '#FFD225', fontSize: 15, marginRight: 2 },
  agentRating: { color: '#252B5C', fontWeight: '700', fontSize: 14, marginRight: 8 },
  agentSold: { color: '#7B7B93', fontSize: 13, fontWeight: '600' },
});

export default TopAgent; 