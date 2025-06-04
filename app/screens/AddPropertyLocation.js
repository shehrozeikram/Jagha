import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Modal, FlatList, Dimensions, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const cityOptions = [
  'Islamabad',
  'Lahore',
  'Karachi',
  'Rawalpindi',
  'Quetta',
  'Peshawar',
  'Swat',
];

const AddPropertyLocation = () => {
  const navigation = useNavigation();
  const [selectedCity, setSelectedCity] = useState('Islamabad');
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [address, setAddress] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back_arrow.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Listing</Text>
        <View style={{width: 40}} />
      </View>
      <View style={styles.contentWrap}>
        <Text style={styles.greeting}>Where is your <Text style={styles.greetingHighlight}>property located?</Text></Text>
        {/* City Picker */}
        <Text style={styles.label}>City</Text>
        <TouchableOpacity style={styles.inputRow} onPress={() => setCityModalVisible(true)}>
          <Text style={styles.input}>{selectedCity}</Text>
        </TouchableOpacity>
        {/* Address Input */}
        <Text style={styles.label}>Address</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter address"
            placeholderTextColor="#BFC5D2"
          />
        </View>
      </View>
      {/* City Modal */}
      <Modal
        visible={cityModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCityModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select City</Text>
            <FlatList
              data={cityOptions}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.cityOption}
                  onPress={() => {
                    setSelectedCity(item);
                    setCityModalVisible(false);
                  }}
                >
                  <Text style={styles.cityOptionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setCityModalVisible(false)} style={styles.modalCloseBtn}>
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Bottom Navigation */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back_arrow.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextBtn} onPress={() => navigation.push('AddPropertyLocation')}>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
    backgroundColor: '#F5F4F8',
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
  contentWrap: { padding: 24, flex: 1 },
  greeting: { fontSize: 22, color: '#252B5C', fontWeight: '700', marginBottom: 18 },
  greetingHighlight: { color: '#117C3E', fontWeight: '700' },
  label: { fontSize: 16, color: '#252B5C', fontWeight: '700', marginTop: 12, marginBottom: 6 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F7', borderRadius: 14, paddingHorizontal: 16, marginBottom: 8, height: 54 },
  input: { flex: 1, fontSize: 16, color: '#252B5C' },
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxHeight: '70%',
    alignItems: 'center',
  },
  modalTitle: {
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
  modalCloseBtn: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#FFD225',
    borderRadius: 12,
  },
  modalCloseText: {
    color: '#252B5C',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default AddPropertyLocation; 