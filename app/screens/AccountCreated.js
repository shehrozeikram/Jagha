import React from 'react';
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
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const AccountCreated = () => {
  const navigation = useNavigation();

  const handleFinish = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Blurred Background (placeholder, use BlurView in real app) */}
      <View style={styles.blurBg} />
      {/* Bottom Sheet */}
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <View style={styles.checkmarkWrapper}>
          <View style={styles.checkmarkCircle}>
            <Image source={require('../assets/vector.png')} style={styles.checkmarkIcon} />
          </View>
        </View>
        <Text style={styles.title}>
          Account <Text style={styles.goldText}>successfully</Text> created
        </Text>
        <Text style={styles.subtitle}>Lorem ipsum dolor sit amet, consectetur.</Text>
        <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
          <LinearGradient
            colors={["#FFE066", "#FFD60A", "#B89B2B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.finishButtonGradient}
          >
            <Text style={styles.finishButtonText}>Finish</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const SHEET_HEIGHT = height * 0.6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  blurBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
    zIndex: 0,
  },
  sheet: {
    width: '100%',
    height: SHEET_HEIGHT,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    alignItems: 'center',
    paddingTop: 24,
    paddingHorizontal: 24,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  handle: {
    width: 64,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#252B5C',
    opacity: 0.18,
    marginBottom: 32,
  },
  checkmarkWrapper: {
    alignItems: 'center',
    marginBottom: 32,
  },
  checkmarkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0F7C3D',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2ECC71',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    marginBottom: 8,
  },
  checkmarkIcon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  title: {
    fontSize: 26,
    color: '#252B5C',
    fontWeight: '700',
    textAlign: 'center',
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
    textAlign: 'center',
    marginBottom: 32,
  },
  finishButton: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
    alignSelf: 'center',
    height: 54,
  },
  finishButtonGradient: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 54,
  },
  finishButtonText: {
    color: '#117C3E',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
});

export default AccountCreated; 