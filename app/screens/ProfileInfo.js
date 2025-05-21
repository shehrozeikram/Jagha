import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ProfileInfo = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('Ali Khan');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('jonathan@email.com');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSkip = () => {
    navigation.navigate('AccountCreated');
  };

  const handleNext = () => {
    navigation.navigate('AccountCreated');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <View style={styles.backCircle}>
          <Image source={require('../assets/back_arrow.png')} style={styles.backArrowImage} />
        </View>
      </TouchableOpacity>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <View style={styles.skipCircle}>
          <Text style={styles.skipText}>skip</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>
          Fill your <Text style={styles.goldText}>information</Text> below
        </Text>
        <Text style={styles.subtitle}>You can edit this later on your account setting.</Text>
        {/* Profile Image with Edit */}
        <View style={styles.profileWrapper}>
          <Image source={require('../assets/component.png')} style={styles.profileImage} />
          <TouchableOpacity style={styles.editButton}>
            <Image source={require('../assets/pencil.png')} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <Image source={require('../assets/user_icon.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Ali Khan"
            placeholderTextColor="#252B5C"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require('../assets/phone_icon.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="mobile number"
            placeholderTextColor="#7B7B93"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require('../assets/email_icon.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="jonathan@email.com"
            placeholderTextColor="#7B7B93"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
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

const PROFILE_SIZE = 120;
const EDIT_SIZE = 36;
const CARD_WIDTH = width - 48;

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
    fontSize: 28,
    color: '#252B5C',
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 34,
  },
  goldText: {
    color: '#B89B2B',
    fontWeight: 'bold',
    fontSize: 28,
  },
  subtitle: {
    fontSize: 15,
    color: '#7B7B93',
    marginBottom: 32,
  },
  profileWrapper: {
    alignSelf: 'center',
    marginBottom: 32,
  },
  profileImage: {
    width: PROFILE_SIZE,
    height: PROFILE_SIZE,
    borderRadius: PROFILE_SIZE / 2,
    backgroundColor: '#F5F5F7',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 8,
    width: EDIT_SIZE,
    height: EDIT_SIZE,
    borderRadius: EDIT_SIZE / 2,
    backgroundColor: '#252B5C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  editIcon: {
    width: 18,
    height: 18,
    tintColor: '#fff',
    resizeMode: 'contain',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 54,
  },
  inputIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
    tintColor: '#252B5C',
    opacity: 0.7,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#252B5C',
  },
  nextButton: {
    borderRadius: 14,
    overflow: 'hidden',
    width: '100%',
    alignSelf: 'center',
    height: 56,
    marginTop: 16,
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

export default ProfileInfo; 