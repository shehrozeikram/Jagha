import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Dimensions, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const categories = ['House', 'Apartment', 'Farm House', 'Hotel', 'Villa', 'Cottage'];

const AddProperty = () => {
  const navigation = useNavigation();
  const [listingPrice, setListingPrice] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [rentType, setRentType] = useState('Monthly');
  const [listingType, setListingType] = useState('Rent');
  const [selectedCategory, setSelectedCategory] = useState('House');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerBtn} 
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../assets/back_arrow.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Property</Text>
        <View style={{width: 40}} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome Back!</Text>
          <Text style={styles.welcomeSubtitle}>Let's add your property details</Text>
        </View>

        {/* Price Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Price</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={listingPrice}
              onChangeText={setListingPrice}
              placeholder="Enter listing price"
              placeholderTextColor="#BFC5D2"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Rent Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rental Price</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={rentPrice}
              onChangeText={setRentPrice}
              placeholder="Enter rent price"
              placeholderTextColor="#BFC5D2"
              keyboardType="numeric"
            />
          </View>
          {/* Rent Type Toggle */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, rentType === 'Monthly' && styles.toggleButtonActive]}
              onPress={() => setRentType('Monthly')}
            >
              <Text style={[styles.toggleText, rentType === 'Monthly' && styles.toggleTextActive]}>
                Monthly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, rentType === 'Yearly' && styles.toggleButtonActive]}
              onPress={() => setRentType('Yearly')}
            >
              <Text style={[styles.toggleText, rentType === 'Yearly' && styles.toggleTextActive]}>
                Yearly
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Listing Type Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Listing Type</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, listingType === 'Rent' && styles.toggleButtonActive]}
              onPress={() => setListingType('Rent')}
            >
              <Text style={[styles.toggleText, listingType === 'Rent' && styles.toggleTextActive]}>
                For Rent
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, listingType === 'Sell' && styles.toggleButtonActive]}
              onPress={() => setListingType('Sell')}
            >
              <Text style={[styles.toggleText, listingType === 'Sell' && styles.toggleTextActive]}>
                For Sale
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Property Category Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Category</Text>
          <View style={styles.categoryContainer}>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.headerBtn}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../assets/back_arrow.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextBtn} onPress={() => navigation.navigate('AddPropertyLocation')}>
          <LinearGradient
            colors={["#FFD225", "#B89B2B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.nextBtnGradient}
          >
            <Text style={styles.nextBtnText}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Helper function to get category icons
const getCategoryIcon = (category) => {
  switch(category) {
    case 'House': return 'home';
    case 'Apartment': return 'apartment';
    case 'Farm House': return 'landscape';
    case 'Hotel': return 'hotel';
    case 'Villa': return 'villa';
    case 'Cottage': return 'house';
    default: return 'home';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F7',
  },
  headerBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F5F5F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  headerIcon: {
    width: 18,
    height: 18,
    tintColor: '#252B5C',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#252B5C',
    textAlign: 'center',
  },
  scrollContent: {
    padding: 24,
  },
  welcomeSection: {
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#252B5C',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#7B7B93',
    lineHeight: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#252B5C',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#252B5C',
    height: '100%',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    padding: 4,
    marginTop: 8,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  toggleButtonActive: {
    backgroundColor: '#B89B2B',
  },
  toggleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#252B5C',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    margin: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#B89B2B',
  },
  categoryIcon: {
    marginRight: 8,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#252B5C',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
    gap: 16,
  },
  nextBtn: {
    width: 220,
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#FFD225',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 8,
    marginLeft: 0,
  },
  nextBtnGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  nextBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
    letterSpacing: 0.2,
  },
  inputIconEnd: {
    marginLeft: 8,
  },
});

export default AddProperty;