import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const types = [
  {
    key: 'residential',
    label: 'Residential',
    image: require('../assets/real_estate_residential.png'),
  },
  {
    key: 'commercial',
    label: 'Commercial',
    image: require('../assets/real_estate_commercial.png'),
  },
  {
    key: 'industrial',
    label: 'industrial',
    image: require('../assets/real_estate_industrial.png'),
  },
  {
    key: 'land',
    label: 'Land',
    image: require('../assets/real_estate_land.png'),
  },
];

const RealEstateType = () => {
  const [selected, setSelected] = useState([]);

  const toggleType = (key) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const renderCard = ({ item }) => {
    const isSelected = selected.includes(item.key);
    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.cardSelected]}
        onPress={() => toggleType(item.key)}
        activeOpacity={0.85}
      >
        <View style={styles.cardImageWrapper}>
          <Image source={item.image} style={styles.cardImage} />
          {isSelected && (
            <View style={styles.checkCircle}>
              <Image source={require('../assets/checkmark.png')} style={styles.checkIcon} />
            </View>
          )}
        </View>
        <Text style={[styles.cardLabel, isSelected && styles.cardLabelSelected]}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton}>
        <View style={styles.backCircle}>
          <Image source={require('../assets/back_arrow.png')} style={styles.backArrowImage} />
        </View>
      </TouchableOpacity>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton}>
        <View style={styles.skipCircle}>
          <Text style={styles.skipText}>skip</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>
          Select your preferable{''}
          <Text style={styles.goldText}>real estate type</Text>
        </Text>
        <Text style={styles.subtitle}>You can edit this later on your account setting.</Text>
        {/* Cards Grid */}
        <View style={styles.grid}>
          {types.map((item, idx) => renderCard({ item, index: idx }))}
        </View>
        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton}>
          <LinearGradient
            colors={["#FFE066", "#FFD60A", "#B89B2B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextButtonGradient}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const CARD_SIZE = (width - 24 * 2 - 16) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 72,
    left: 24,
    zIndex: 10,
  },
  backCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrowImage: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: '#252B5C',
  },
  skipButton: {
    position: 'absolute',
    top: 72,
    right: 24,
    zIndex: 10,
  },
  skipCircle: {
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  skipText: {
    color: '#252B5C',
    fontWeight: '600',
    fontSize: 16,
    textTransform: 'lowercase',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 120,
  },
  title: {
    fontSize: 26,
    color: '#252B5C',
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 34,
  },
  goldText: {
    color: '#B89B2B',
    fontWeight: 'bold',
    fontSize: 26,
  },
  subtitle: {
    fontSize: 15,
    color: '#7B7B93',
    marginBottom: 18,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  card: {
    width: CARD_SIZE,
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    backgroundColor: '#117C3E22',
    borderColor: '#117C3E',
  },
  cardImageWrapper: {
    width: '100%',
    height: CARD_SIZE * 0.7,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  checkCircle: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    borderWidth: 2,
    borderColor: '#B89B2B',
  },
  checkIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#B89B2B',
  },
  cardLabel: {
    fontSize: 16,
    color: '#252B5C',
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 14,
    textTransform: 'capitalize',
  },
  cardLabelSelected: {
    color: '#117C3E',
    fontWeight: 'bold',
  },
  nextButton: {
    borderRadius: 14,
    overflow: 'hidden',
    width: '100%',
    alignSelf: 'center',
    height: 56,
  },
  nextButtonGradient: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 56,
  },
  nextButtonText: {
    color: '#117C3E',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
});

export default RealEstateType; 