import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const Location = () => {
  const [locationDetail, setLocationDetail] = useState('');

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
        <Text style={styles.locationTitle}>
          Add your <Text style={styles.goldText}>location</Text>
        </Text>
        <Text style={styles.subtitle}>You can edit this later on your account setting.</Text>
        {/* Map Image Placeholder */}
        <View style={styles.mapContainer}>
          <Image source={require('../assets/map.png')} style={styles.mapImage} />
          <TouchableOpacity style={styles.selectOnMapButton}>
            <Text style={styles.selectOnMapText}>select on map</Text>
          </TouchableOpacity>
        </View>
        {/* Location Detail Input */}
        <View style={styles.inputContainer}>
          <Image source={require('../assets/location_icon.png')} style={styles.inputIcon} />
          <Text style={styles.inputLabel}>Location detail</Text>
          <Image source={require('../assets/chevron_right.png')} style={styles.chevronIcon} />
        </View>
        {/* Progress Indicator */}
        <View style={styles.progressBarContainer}>
          <Image source={require('../assets/next.png')} style={styles.progressBarNextIcon} />
        </View>
        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton}>
          <LinearGradient
            colors={["#FFE066", "#FFD60A", "#B89B2B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextButtonGradient}
          >
            <View style={styles.nextButtonContent}>
              <Text style={styles.nextButtonText}>Next</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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
  locationTitle: {
    fontSize: 28,
    color: '#252B5C',
    fontWeight: '600',
    marginBottom: 8,
  },
  goldText: {
    color: '#B89B2B',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    color: '#7B7B93',
    marginBottom: 18,
  },
  mapContainer: {
    width: '100%',
    height: 260,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 18,
    backgroundColor: '#E5E5EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  selectOnMapButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: 'center',
    paddingVertical: 10,
  },
  selectOnMapText: {
    color: '#7B7B93',
    fontWeight: '600',
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 32,
    height: 54,
  },
  inputIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
    tintColor: '#252B5C',
    opacity: 0.7,
  },
  inputLabel: {
    flex: 1,
    fontSize: 16,
    color: '#252B5C',
    opacity: 0.7,
  },
  chevronIcon: {
    width: 18,
    height: 18,
    marginLeft: 8,
    tintColor: '#252B5C',
    opacity: 0.7,
  },
  progressBarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  progressBarNextIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
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
  nextButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#117C3E',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
  nextIcon: {
    width: 22,
    height: 22,
    marginLeft: 10,
    resizeMode: 'contain',
  },
});

export default Location; 