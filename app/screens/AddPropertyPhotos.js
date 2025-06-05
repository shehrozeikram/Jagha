import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, FlatList, Dimensions, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';

const { width } = Dimensions.get('window');

const AddPropertyPhotos = () => {
  const navigation = useNavigation();
  const [photos, setPhotos] = useState([]);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 5 - photos.length }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Could not pick image');
        return;
      }
      if (response.assets) {
        setPhotos([...photos, ...response.assets]);
      }
    });
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const renderPhoto = ({ item, index }) => (
    <View style={styles.photoWrapper} key={item.uri || index}>
      <Image source={{ uri: item.uri }} style={styles.photo} />
      <TouchableOpacity style={styles.removeBtn} onPress={() => removePhoto(index)}>
        <View style={styles.removeCircle}>
          <Text style={styles.crossText}>×</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back_arrow.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Listing</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.contentWrap}>
        <Text style={styles.title}>
          Add <Text style={styles.titleHighlight}>photos</Text> to your{"\n"}listing
        </Text>
        <View style={styles.photosGrid}>
          {/* Show selected photos */}
          {photos.map((item, idx) => renderPhoto({ item, index: idx }))}
          {/* Add photo button (max 5) */}
          {photos.length < 5 && (
            <TouchableOpacity style={styles.addPhotoBtn} onPress={pickImage}>
              <Text style={styles.addPhotoPlus}>+</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* Bottom Navigation */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back_arrow.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextBtn} onPress={() => navigation.navigate('AddPropertyFeatures')}>
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
  contentWrap: {
    padding: 24,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#252B5C',
    marginBottom: 24,
  },
  titleHighlight: {
    color: '#117C3E',
    fontWeight: '700',
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 8,
  },
  photoWrapper: {
    width: (width - 80) / 2,
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    marginRight: 16,
    backgroundColor: '#F5F5F7',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  removeBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 10,
  },
  removeCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#7ED957',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  crossText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
  },
  addPhotoBtn: {
    width: (width - 80) / 2,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#F5F5F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addPhotoPlus: {
    fontSize: 40,
    color: '#B89B2B',
    fontWeight: '700',
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
});

export default AddPropertyPhotos; 