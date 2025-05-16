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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Illustration Placeholder */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../assets/city_life.png')} 
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Let's <Text style={{fontWeight: 'bold', color: '#252B5C'}}>Sign In</Text></Text>
        <Text style={styles.subtitle}>quis nostrud exercitation ullamco laboris nisi ut</Text>
        {/* Email Input */}
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
        {/* Password Input */}
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
        <View style={styles.linksRow}>
          <TouchableOpacity>
            <Text style={styles.linkText}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.linkText}>Show password</Text>
          </TouchableOpacity>
        </View>
        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton}>
          <LinearGradient
            colors={["#FFE066", "#FFD60A", "#B89B2B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.loginButtonGradient}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
        {/* Divider with OR */}
        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <View style={styles.orContainer}><Text style={styles.orText}>OR</Text></View>
          <View style={styles.divider} />
        </View>
        {/* Social Buttons */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../assets/google_icon.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../assets/facebook_icon.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
        {/* Register Link */}
        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.registerLink}>Register</Text>
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
  illustrationContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 8,
  },
  illustration: {
    width: width - 40,
    height: 140,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  title: {
    fontSize: 28,
    color: '#252B5C',
    fontWeight: '600',
    marginBottom: 8,
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
    tintColor: '#22223B',
    opacity: 0.7,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#22223B',
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  linkText: {
    color: '#22223B',
    fontWeight: '600',
    fontSize: 14,
  },
  loginButton: {
    marginBottom: 24,
    borderRadius: 14,
    overflow: 'hidden',
    width: '100%',
    alignSelf: 'center',
    marginTop: 16,
    height: 64,
  },
  loginButtonGradient: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 64,
  },
  loginButtonText: {
    color: '#117C3E',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5EA',
  },
  orContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  orText: {
    color: '#B0B0B0',
    fontWeight: '600',
    fontSize: 14,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginHorizontal: 8,
  },
  socialIcon: {
    width: 32,
    height: 32,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  registerText: {
    color: '#7B7B93',
    fontSize: 15,
  },
  registerLink: {
    color: '#117C3E',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default Login;

