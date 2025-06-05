import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from './app/screens/SplashScreen';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import Location from './app/screens/Location';
import RealEstateType from './app/screens/RealEstateType';
import PaymentMethod from './app/screens/PaymentMethod';
import ProfileInfo from './app/screens/ProfileInfo';
import AccountCreated from './app/screens/AccountCreated';
import Home from './app/screens/Home';
import FeaturedEstate from './app/screens/FeaturedEstate';
import TopLocation from './app/screens/TopLocation';
import TopLocationDetails from './app/screens/TopLocationDetails';
import TopAgent from './app/screens/TopAgent';
import TopAgentProfile from './app/screens/TopAgentProfile';
import Favorites from './app/screens/Favorites';
import Investors from './app/screens/Investors';
import Search from './app/screens/Search';
import LocationListings from './app/screens/LocationListings';
import PropertyDetails from './app/screens/PropertyDetails';
import AddProperty from './app/screens/AddProperty';
import AddPropertyLocation from './app/screens/AddPropertyLocation';
import AddPropertyPhotos from './app/screens/AddPropertyPhotos';
import AddPropertyFeatures from './app/screens/AddPropertyFeatures';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          height: 70,
          backgroundColor: '#fff',
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 8,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#B89B2B',
        tabBarInactiveTintColor: '#7B7B93',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Image 
              source={require('./app/assets/house-active.png')} 
              style={{ width: 24, height: 24, tintColor: color }} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="InvestorsTab" 
        component={Investors}
        options={{
          tabBarLabel: 'Investors',
          tabBarIcon: ({ color }) => (
            <Image 
              source={require('./app/assets/nav_icon.png')} 
              style={{ width: 24, height: 24, tintColor: color }} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="SearchTab" 
        component={Search}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <View style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: '#B79C35',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -24,
            }}>
              <Image 
                source={require('./app/assets/zoom.png')} 
                style={{ width: 28, height: 28, tintColor: '#fff' }} 
              />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="FavoritesTab" 
        component={Favorites}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color }) => (
            <Image 
              source={require('./app/assets/heart.png')} 
              style={{ width: 24, height: 24, tintColor: color }} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={TopAgentProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Image 
              source={require('./app/assets/profile.png')} 
              style={{ width: 24, height: 24, tintColor: color }} 
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate splash screen
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  if (isLoading) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SplashScreen />
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            presentation: 'card',
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Location" component={Location} />
          <Stack.Screen name="RealEstateType" component={RealEstateType} />
          <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
          <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="FeaturedEstate" component={FeaturedEstate} />
          <Stack.Screen name="TopLocation" component={TopLocation} />
          <Stack.Screen name="TopLocationDetails" component={TopLocationDetails} />
          <Stack.Screen name="TopAgent" component={TopAgent} />
          <Stack.Screen name="TopAgentProfile" component={TopAgentProfile} />
          <Stack.Screen 
            name="AccountCreated" 
            component={AccountCreated}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
              gestureEnabled: true,
              gestureDirection: 'vertical',
            }}
          />
          <Stack.Screen name="LocationListings" component={LocationListings} />
          <Stack.Screen name="PropertyDetails" component={PropertyDetails} />
          <Stack.Screen name="AddProperty" component={AddProperty} />
          <Stack.Screen name="AddPropertyLocation" component={AddPropertyLocation} />
          <Stack.Screen name="AddPropertyPhotos" component={AddPropertyPhotos} />
          <Stack.Screen name="AddPropertyFeatures" component={AddPropertyFeatures} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

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
