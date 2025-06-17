import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  SafeAreaView,
  Modal,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const CARD_WIDTH = (width - 48) / 2;

// NOTE: This screen fetches agents from http://jagha.com/api/top-agents
// The expected response is { data: [ { id, name, image/avatar_url, rating/reviews_avg, sold }, ... ] }
// Adjust the renderItem mapping if the API response changes.

const TopAgent = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://jagha.com/api/top-agents');
        if (!response.ok) throw new Error('Failed to fetch agents');
        const data = await response.json();
        setAgents(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        setError('Could not load agents.');
        setAgents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  const handleLogout = () => {
    setModalVisible(false);
    // TODO: Clear user data/token here
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const handleDeleteAccount = () => {
    setModalVisible(false);
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', style: 'destructive', onPress: () => {
            // TODO: Call delete account API here
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          }
        }
      ]
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <View style={styles.badge}><Text style={styles.badgeText}>{`#${index + 1}`}</Text></View>
      <Image source={{ uri: item.image || item.avatar_url || '' }} style={styles.agentImg} />
      <Text style={styles.agentName}>{item.name || item.first_name + ' ' + (item.last_name || '')}</Text>
      <View style={styles.agentStatsRow}>
        <Text style={styles.agentStar}>★</Text>
        <Text style={styles.agentRating}>{item.rating ? item.rating : (item.reviews_avg || 'N/A')}</Text>
        <Text style={styles.agentSold}>{item.sold ? `${item.sold} Sold` : ''}</Text>
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
      {/* Loading/Error/Empty State */}
      {loading ? (
        <Text style={{ textAlign: 'center', marginTop: 32 }}>Loading...</Text>
      ) : error ? (
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 32 }}>{error}</Text>
      ) : agents.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 32 }}>No agents found.</Text>
      ) : (
        <FlatList
          data={agents}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 0, alignItems: 'stretch' },
  headerBtn: { marginTop: 0, marginBottom: 0, marginLeft: 8, alignSelf: 'flex-start' },
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