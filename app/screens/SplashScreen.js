import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ImageBackground
        source={require('../assets/splash_bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['#117C3E00', '#117C3E']}
          style={styles.gradientOverlay}
          locations={[0.3, 1]}
        />
        <View style={styles.overlay}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/splash_logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          {/* <TouchableOpacity style={styles.button}>
            <LinearGradient
              colors={['#FFE066', '#FFD60A']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>let's start</Text>
            </LinearGradient>
          </TouchableOpacity> */}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 24,
    zIndex: 2,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  logo: {
    width: width * 0.45,
    height: width * 0.45,
    maxWidth: 260,
    maxHeight: 260,
    marginBottom: 20,
  },
  // button: {
  //   width: 220,
  //   paddingVertical: 40,
  //   borderRadius: 16,
  //   overflow: 'hidden',
  // },
  // buttonGradient: {
  //   borderRadius: 16,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   paddingVertical: 40,
  // },
  // buttonText: {
  //   color: '#117C3E',
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   letterSpacing: 1,
  //   textTransform: 'lowercase',
  // },
});

export default SplashScreen;