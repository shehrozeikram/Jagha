import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView, Modal, Animated, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const amenitiesList = [
  'Parking Lot',
  'Pet Allowed',
  'Garden',
  'Gym',
  'Park',
  'Home theatre',
  
  "Kid's Friendly",
];

const AddPropertyFeatures = () => {
  const navigation = useNavigation();
  const [features, setFeatures] = useState({
    Bedroom: 2,
    Bathroom: 2,
    Kitchen: 1,
  });
  const [totalRooms, setTotalRooms] = useState(6);
  const [selectedAmenities, setSelectedAmenities] = useState(['Parking Lot', 'Pet Allowed', 'Garden']);
  const [showSuccess, setShowSuccess] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;

  const handleFeature = (type, op) => {
    setFeatures((prev) => {
      let value = prev[type];
      if (op === 'inc') value++;
      if (op === 'dec' && value > 0) value--;
      return { ...prev, [type]: value };
    });
  };

  const handleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = () => {
    setShowSuccess(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const handleDone = () => {
    // Compose new listing data
    const newListing = {
      id: Date.now(),
      image: require('../assets/real_estate_residential.png'), // Placeholder, replace with actual image if available
      price: 'Custom Price', // You can pass actual price if available
      location: 'Custom Location', // You can pass actual location if available
      type: 'Custom Type', // You can pass actual type if available
      size: `${totalRooms} Rooms`,
      featured: true,
    };
    setShowSuccess(false);
    navigation.reset({
      index: 0,
      routes: [
        { name: 'MainTabs', params: { screen: 'HomeTab', params: { newListing } } },
      ],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back_arrow.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Listing</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          Add <Text style={styles.titleBlue}>Features</Text> and <Text style={styles.titleGreen}>Amenities</Text>
        </Text>
        {/* Property Features */}
        <Text style={styles.sectionTitle}>Property Features</Text>
        <View style={styles.featuresBox}>
          {['Bedroom', 'Bathroom', 'Kitchen'].map((type) => (
            <View style={styles.featureRow} key={type}>
              <Text style={styles.featureLabel}>{type}</Text>
              <View style={styles.featureCounter}>
                <TouchableOpacity style={styles.counterBtn} onPress={() => handleFeature(type, 'dec')}>
                  <Text style={styles.counterBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterValue}>{features[type]}</Text>
                <TouchableOpacity style={styles.counterBtn} onPress={() => handleFeature(type, 'inc')}>
                  <Text style={styles.counterBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        {/* Total Rooms */}
        <Text style={styles.sectionTitle}>Total Rooms</Text>
        <View style={styles.roomsRow}>
          {["< 4", 4, 6, 8].map((num, idx) => (
            <TouchableOpacity
              key={num}
              style={[styles.roomBtn, totalRooms === num && styles.roomBtnActive]}
              onPress={() => setTotalRooms(num)}
            >
              <Image source={require('../assets/room.png')} style={styles.roomIcon} />
              <Text style={[styles.roomBtnText, totalRooms === num && styles.roomBtnTextActive]}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Amenities / Facilities */}
        <Text style={styles.sectionTitle}>Amenities / Facilities</Text>
        <View style={styles.amenitiesWrap}>
          {amenitiesList.map((amenity) => (
            <TouchableOpacity
              key={amenity}
              style={[styles.amenityChip, selectedAmenities.includes(amenity) && styles.amenityChipActive]}
              onPress={() => handleAmenity(amenity)}
            >
              <Text style={[styles.amenityText, selectedAmenities.includes(amenity) && styles.amenityTextActive]}>{amenity}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {/* Bottom Navigation */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back_arrow.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextBtn} onPress={handleSubmit}>
          <LinearGradient
            colors={["#FFD225", "#B89B2B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.nextBtnGradient}
          >
            <Text style={styles.nextBtnText}>Submit for Review</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {/* Success Modal */}
      <Modal visible={showSuccess} transparent animationType="none">
        <Animated.View style={[styles.successModalWrap, { transform: [{ translateY: slideAnim }] }]}> 
          <View style={styles.successModalCard}>
            <View style={styles.successBar} />
            <View style={styles.successCircle}>
              <Text style={styles.successCheck}>✓</Text>
            </View>
            <Text style={styles.successTitle}>Your listing just</Text>
            <Text style={styles.successTitleBold}>successfully updated</Text>
            <Text style={styles.successDesc}>Lorem ipsum dolor sit amet, consectetur.</Text>
            <TouchableOpacity style={styles.successDoneBtn} onPress={handleDone}>
              <Text style={styles.successDoneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F7',
  },
  headerBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F5F5F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  headerIcon: {
    width: 18,
    height: 18,
    tintColor: '#252B5C',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#252B5C',
    textAlign: 'center',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#252B5C',
    marginBottom: 18,
  },
  titleBlue: {
    color: '#234567',
    fontWeight: '700',
  },
  titleGreen: {
    color: '#117C3E',
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#252B5C',
    marginBottom: 10,
    marginTop: 18,
  },
  featuresBox: {
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  featureLabel: {
    fontSize: 15,
    color: '#252B5C',
    fontWeight: '600',
  },
  featureCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9EAF0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  counterBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#BFC5D2',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  counterBtnText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '700',
  },
  counterValue: {
    fontSize: 18,
    color: '#252B5C',
    fontWeight: '700',
    marginHorizontal: 8,
  },
  roomsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: 10,
  },
  roomBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  roomBtnActive: {
    backgroundColor: '#B89B2B',
  },
  roomIcon: {
    width: 22,
    height: 22,
    marginRight: 6,
    tintColor: '#252B5C',
  },
  roomBtnText: {
    fontSize: 15,
    color: '#252B5C',
    fontWeight: '600',
  },
  roomBtnTextActive: {
    color: '#fff',
  },
  amenitiesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
  },
  amenityChip: {
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  amenityChipActive: {
    backgroundColor: '#B89B2B',
  },
  amenityText: {
    fontSize: 15,
    color: '#252B5C',
    fontWeight: '600',
  },
  amenityTextActive: {
    color: '#fff',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
    gap: 16,
  },
  nextBtn: {
    width: 220,
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#FFD225',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 8,
    marginLeft: 0,
  },
  nextBtnGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  nextBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.2,
  },
  successModalWrap: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  successModalCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  successBar: {
    width: 60,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E9EAF0',
    marginBottom: 32,
  },
  successCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#117C3E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  successCheck: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: 20,
    color: '#252B5C',
    fontWeight: '600',
    marginBottom: 0,
    marginTop: 8,
  },
  successTitleBold: {
    fontSize: 22,
    color: '#252B5C',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  successDesc: {
    color: '#7B7B93',
    fontSize: 14,
    marginBottom: 32,
    textAlign: 'center',
  },
  successDoneBtn: {
    width: '100%',
    height: 48,
    backgroundColor: '#FFD225',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  successDoneText: {
    color: '#252B5C',
    fontWeight: '700',
    fontSize: 18,
  },
});

export default AddPropertyFeatures; 