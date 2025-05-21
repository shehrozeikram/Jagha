import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Register = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cnic, setCnic] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRegister = () => {
    navigation.navigate('Location');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <View style={styles.backCircle}>
          <Image source={require('../assets/back_arrow.png')} style={styles.backArrowImage} />
        </View>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.registerTitle}>
          Create your <Text style={styles.goldText}>account</Text>
        </Text>
        <Text style={styles.subtitle}>quis nostrud exercitation ullamco laboris nisi ut</Text>
        {/* Full Name */}
        <View style={styles.inputContainer}>
          <Image source={require('../assets/user_icon.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Full name"
            placeholderTextColor="#7B7B93"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
        {/* Email */}
        <View style={styles.inputContainer}>
          <Image source={require('../assets/email_icon.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#7B7B93"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {/* Phone */}
        <View style={styles.inputContainer}>
          <Image source={require('../assets/phone_icon.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor="#7B7B93"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>
        {/* CNIC Number */}
        <View style={styles.inputContainer}>
          <Image source={require('../assets/idcard_icon.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="CNIC Number"
            placeholderTextColor="#7B7B93"
            value={cnic}
            onChangeText={setCnic}
            keyboardType="numeric"
          />
        </View>
        {/* City of Residence (Dropdown placeholder) */}
        <View style={styles.inputContainer}>
          <Image source={require('../assets/city_icon.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="City of Residence"
            placeholderTextColor="#7B7B93"
            value={city}
            onChangeText={setCity}
          />
          <Image source={require('../assets/chevron_down.png')} style={styles.chevronIcon} />
        </View>
        {/* Password */}
        <View style={styles.inputContainer}>
          <Image source={require('../assets/lock_icon.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#7B7B93"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
        </View>
        {/* Terms and Show Password Row */}
        <View style={styles.linksRow}>
          <TouchableOpacity>
            <Text style={styles.linkText}>Terms of service</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.linkText}>Show password</Text>
          </TouchableOpacity>
        </View>
        {/* Register Button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <LinearGradient
            colors={["#FFE066", "#FFD60A", "#B89B2B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.registerButtonGradient}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </LinearGradient>
        </TouchableOpacity>
        {/* Login Link */}
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
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
    top: Platform.select({ ios: 72, android: (StatusBar.currentHeight ? StatusBar.currentHeight + 32 : 56) }),
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 90,
  },
  registerTitle: {
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
  chevronIcon: {
    width: 18,
    height: 18,
    marginLeft: 8,
    tintColor: '#252B5C',
    opacity: 0.7,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#252B5C',
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  linkText: {
    color: '#252B5C',
    fontWeight: '600',
    fontSize: 14,
  },
  registerButton: {
    marginBottom: 24,
    borderRadius: 14,
    overflow: 'hidden',
    width: '100%',
    alignSelf: 'center',
    marginTop: 16,
    height: 64,
  },
  registerButtonGradient: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 64,
  },
  registerButtonText: {
    color: '#117C3E',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginText: {
    color: '#7B7B93',
    fontSize: 15,
  },
  loginLink: {
    color: '#252B5C',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default Register; 