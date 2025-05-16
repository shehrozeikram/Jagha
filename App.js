import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SplashScreen from './app/screens/SplashScreen';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import Location from './app/screens/Location';
import RealEstateType from './app/screens/RealEstateType';
import PaymentMethod from './app/screens/PaymentMethod';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Show splash for 2 seconds
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    // <Login />
    // <Register />
    // <Location />
    // <RealEstateType />
    <PaymentMethod />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
});

export default App;
