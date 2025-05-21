import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const PaymentMethod = () => {
  const navigation = useNavigation();
  const [tab, setTab] = useState('card');
  const [name, setName] = useState('Ali Khan');
  const [number, setNumber] = useState('1222 3443 9881 1222');
  const [expiry, setExpiry] = useState('11/05/2023');
  const [cvv, setCvv] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSkip = () => {
    navigation.navigate('ProfileInfo');
  };

  const handleNext = () => {
    navigation.navigate('ProfileInfo');
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
          Add your{' '}
          <Text style={styles.goldText}>payment method</Text>
        </Text>
        <Text style={styles.subtitle}>You can edit this later on your account setting.</Text>
        {/* Card Mockup */}
        <LinearGradient
          colors={["#FFE066", "#FFD60A", "#B89B2B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardMockup}
        >
          <View style={styles.cardRow}>
            <Image source={require('../assets/chip.png')} style={styles.cardIcon} />
            <View style={styles.cardIconsRow}>
              <Image source={require('../assets/nfc.png')} style={styles.nfcIcon} />
              <Image source={require('../assets/applepay.png')} style={styles.applePayIcon} />
              <Image source={require('../assets/googlepay.png')} style={styles.googlePayIcon} />
            </View>
          </View>
          <Text style={styles.cardNumber}>****  ****  ****  1234</Text>
          <View style={styles.cardRowBottom}>
            <View>
              <Text style={styles.cardValidLabel}>VALID THRU</Text>
              <Text style={styles.cardValidValue}>01/30</Text>
              <Text style={styles.cardName}>Ali Khan</Text>
            </View>
            {/* <View style={styles.cardToggle}> */}
              <Image source={require('../assets/mastercard.png')} style={styles.mastercardIcon} />
            {/* </View> */}
          </View>
        </LinearGradient>
        {/* Tabs */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tab, tab === 'card' && styles.tabActive]}
            onPress={() => setTab('card')}
          >
            <Text style={[styles.tabText, tab === 'card' && styles.tabTextActive]}>Credit/Debit Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, tab === 'transfer' && styles.tabActive]}
            onPress={() => setTab('transfer')}
          >
            <Text style={[styles.tabText, tab === 'transfer' && styles.tabTextActive]}>Online Transfer</Text>
          </TouchableOpacity>
        </View>
        {/* Input Fields */}
        <View style={styles.inputContainer}>
          {/* <Image source={require('../assets/user_icon.png')} style={styles.inputIcon} /> */}
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#7B7B93"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          {/* <Image source={require('../assets/card_icon.png')} style={styles.inputIcon} /> */}
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            placeholderTextColor="#7B7B93"
            value={number}
            onChangeText={setNumber}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.inputRow}>
          <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
            {/* <Image source={require('../assets/calendar_icon.png')} style={styles.inputIcon} /> */}
            <TextInput
              style={styles.input}
              placeholder="MM/YY"
              placeholderTextColor="#7B7B93"
              value={expiry}
              onChangeText={setExpiry}
            />
          </View>
          <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
            <TextInput
              style={styles.input}
              placeholder="CVV"
              placeholderTextColor="#7B7B93"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="number-pad"
              secureTextEntry
            />
          </View>
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
    paddingTop: 80,
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
  cardMockup: {
    width: CARD_WIDTH,
    height: 220,
    borderRadius: 24,
    marginBottom: 24,
    padding: 20,
    shadowColor: '#B89B2B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
    position: 'relative',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 155,
    height: 24,
    position: 'absolute',
    top: 2,
    left: 127,
    gap: 8,
  },
  cardIcon: {
    width: 36,
    height: 28,
    resizeMode: 'contain',
    marginRight: 8,
  },
  nfcIcon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  applePayIcon: {
    height: 24,
    width: 40,
    resizeMode: 'contain',
    marginLeft: 4,
  },
  googlePayIcon: {
    height: 24,
    width: 56,
    resizeMode: 'contain',
    marginLeft: 4,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 16,
    marginTop: 8,
  },
  cardRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  cardValidLabel: {
    color: '#fff',
    fontSize: 10,
    opacity: 0.7,
    marginBottom: 2,
  },
  cardValidValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cardName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardToggle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#B89B2B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 42,
  },
  mastercardIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 42,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  tab: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  tabActive: {
    backgroundColor: '#117C3E',
  },
  tabText: {
    color: '#7B7B93',
    fontWeight: '600',
    fontSize: 16,
  },
  tabTextActive: {
    color: '#fff',
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
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
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

export default PaymentMethod; 