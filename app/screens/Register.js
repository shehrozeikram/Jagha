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
  Modal,
  FlatList,
  ActivityIndicator,
  Alert,
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
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [cityObj, setCityObj] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  // You can set this token dynamically after login, or leave as empty string for now
  const authToken = '';

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRegister = async () => {
    setErrors({});
    if (!fullName || !email || !phone || !cityObj || !password) {
      setErrors({
        name: !fullName ? 'Name is required.' : undefined,
        email: !email ? 'Email is required.' : undefined,
        cell: !phone ? 'Phone is required.' : undefined,
        city_id: !cityObj ? 'City is required.' : undefined,
        password: !password ? 'Password is required.' : undefined,
      });
      return;
    }
    setIsLoading(true);
    try {
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      const response = await fetch('http://jagha.com/api/register', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: fullName,
          email: email,
          password: password,
          password_confirmation: password,
          cell: phone,
          city_id: cityObj.id,
        }),
      });
      const text = await response.text();
      console.log('Register API raw response:', text);
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        setErrors({ general: 'Server returned an invalid response.' });
        setIsLoading(false);
        return;
      }
      if (response.ok) {
        console.log('Register successful:', data);
        Alert.alert('Success', 'Registration successful!');
        navigation.navigate('Login');
      } else {
        console.log('Register failed:', data);
        if (data.errors) {
          // Set field errors
          setErrors(Object.fromEntries(Object.entries(data.errors).map(([k, v]) => [k, v[0]])));
        } else {
          setErrors({ general: data.message || 'Registration failed.' });
        }
      }
    } catch (error) {
      console.error('Register error:', error);
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const fetchCities = async () => {
    setLoadingCities(true);
    setCityModalVisible(true);
    try {
      const response = await fetch('http://jagha.com/api/get-all-cities');
      const data = await response.json();
      console.log('City API response:', data);
      if (Array.isArray(data.data)) {
        setCities(data.data);
      } else {
        setCities([]);
      }
    } catch (error) {
      console.error('City fetch error:', error);
      setCities([]);
    } finally {
      setLoadingCities(false);
    }
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
            onChangeText={text => { setFullName(text); setErrors(e => ({ ...e, name: undefined })); }}
          />
        </View>
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
        {/* Email */}
        <View style={styles.inputContainer}>
          <Image source={require('../assets/email_icon.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#7B7B93"
            value={email}
            onChangeText={text => { setEmail(text); setErrors(e => ({ ...e, email: undefined })); }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        {/* Phone */}
        <View style={styles.inputContainer}>
          <Image source={require('../assets/phone_icon.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor="#7B7B93"
            value={phone}
            onChangeText={text => { setPhone(text); setErrors(e => ({ ...e, cell: undefined })); }}
            keyboardType="phone-pad"
          />
        </View>
        {errors.cell ? <Text style={styles.errorText}>{errors.cell}</Text> : null}
        {/* CNIC Number */}
        {/**
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
        */}
        {/* City of Residence (Dropdown placeholder) */}
        <TouchableOpacity style={styles.inputContainer} onPress={fetchCities} activeOpacity={0.8}>
          <Image source={require('../assets/city_icon.png')} style={styles.inputIcon} />
          <Text style={[styles.input, { color: city ? '#252B5C' : '#7B7B93' }]}>
            {city ? city : 'City of Residence'}
          </Text>
          <Image source={require('../assets/chevron_down.png')} style={styles.chevronIcon} />
        </TouchableOpacity>
        {errors.city_id ? <Text style={styles.errorText}>{errors.city_id}</Text> : null}
        {/* Password */}
        <View style={styles.inputContainer}>
          <Image source={require('../assets/lock_icon.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#7B7B93"
            value={password}
            onChangeText={text => { setPassword(text); setErrors(e => ({ ...e, password: undefined })); }}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
        </View>
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
        {/* General error */}
        {errors.general ? <Text style={styles.errorText}>{errors.general}</Text> : null}
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
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={isLoading}>
          <LinearGradient
            colors={["#FFE066", "#FFD60A", "#B89B2B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.registerButtonGradient}
          >
            {isLoading ? (
              <ActivityIndicator color="#117C3E" size="small" />
            ) : (
              <Text style={styles.registerButtonText}>Register</Text>
            )}
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
      {/* City Modal */}
      <Modal
        visible={cityModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCityModalVisible(false)}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.content}>
            <Text style={modalStyles.title}>Select City</Text>
            {loadingCities ? (
              <ActivityIndicator size="large" color="#252B5C" style={{ marginVertical: 24 }} />
            ) : cities.length === 0 ? (
              <Text style={{ color: '#7B7B93', marginVertical: 24 }}>No cities found.</Text>
            ) : (
              <FlatList
                data={cities}
                keyExtractor={(item, idx) => item.id ? String(item.id) : String(idx)}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={modalStyles.cityOption}
                    onPress={() => {
                      setCity(item.name);
                      setCityObj(item);
                      setCityModalVisible(false);
                    }}
                  >
                    <Text style={modalStyles.cityOptionText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                style={{ width: '100%' }}
              />
            )}
            <TouchableOpacity onPress={() => setCityModalVisible(false)} style={modalStyles.closeBtn}>
              <Text style={modalStyles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxHeight: '70%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#252B5C',
    marginBottom: 16,
  },
  cityOption: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  cityOptionText: {
    fontSize: 16,
    color: '#252B5C',
  },
  closeBtn: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#FFD225',
    borderRadius: 12,
  },
  closeText: {
    color: '#252B5C',
    fontWeight: '700',
    fontSize: 16,
  },
});

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
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 4,
    marginLeft: 8,
  },
});

export default Register; 