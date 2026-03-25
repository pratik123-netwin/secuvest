import React, { useState, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Geolocation from 'react-native-geolocation-service';
import { getStoreDetails, logLocationCheck } from '../../services/attendanceService';
import { COLORS } from '../../constants/colors';
import { MapPin } from 'lucide-react-native';
import BackButton from '../../components/BackButton';

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const LocationVerificationScreen = ({ route, navigation }) => {
  const { storeId } = route.params;
  const [storeName, setStoreName] = useState('...');
  const [errorMsg, setErrorMsg] = useState(null);

  const progressAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      startVerification();
      return () => {
        progressAnim.stopAnimation();
      };
    }, [storeId])
  );

  const startVerification = () => {
    setErrorMsg(null);
    progressAnim.setValue(0);
    Animated.timing(progressAnim, { toValue: 0.95, duration: 10000, useNativeDriver: false }).start();
    initVerification();
  };

  const initVerification = async () => {
    try {
      const store = await getStoreDetails(storeId);
      setStoreName(store.name);

      let hasPermission = false;
      if (Platform.OS === 'ios') {
        const auth = await Geolocation.requestAuthorization('whenInUse');
        hasPermission = auth === 'granted';
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission Request",
            message: "Secuvest requires access to your location to securely verify your store attendance constraints.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
      }

      if (!hasPermission) {
        navigation.replace('StoreActionOptions', { storeId, status: 'Away' });
        return;
      }

      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const distanceKm = getDistanceFromLatLonInKm(latitude, longitude, store.lat, store.lng);
          const distanceMeters = distanceKm * 1000;

          let status = 'Away';
          if (distanceMeters <= 500) {
            status = 'On-site';
          }
          await logLocationCheck(storeId, { latitude, longitude }, status);
          navigation.replace('StoreActionOptions', { storeId, status });
        },
        (error) => {
          console.log(error.code, error.message);
          setErrorMsg('Failed to verify location. Please ensure location services are enabled and try again.');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
      );

    } catch (error) {
      console.log('-------> err', error)
      setErrorMsg('An unexpected error occurred while verifying location. Please try again.');
    }
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['15%', '100%']
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Attendance</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.iconBox}>
          <MapPin size={46} color="#FFFFFF" strokeWidth={1.5} />
        </View>

        <Text style={styles.title}>Checking Location</Text>
        <Text style={styles.subtitle}>Verifying your proximity to{"\n"}{storeName}</Text>

        {errorMsg ? (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={{ color: '#DC2626', textAlign: 'center', marginBottom: 20, fontSize: 13, paddingHorizontal: 20 }}>{errorMsg}</Text>
            <TouchableOpacity onPress={startVerification} style={{ backgroundColor: '#4F46E5', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 24 }}>
              <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Retry Verification</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.progressBarContainer}>
            <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15 },
  backBtn: { flexDirection: 'row', alignItems: 'center', width: 60 },
  backText: { fontSize: 14, color: '#6B7280', marginLeft: 4, fontWeight: '500' },
  headerTitle: { fontSize: 16, fontWeight: '500', color: '#111827' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 120 },
  contentScroll: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 120 },
  iconBox: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#6B7280', textAlign: 'center', lineHeight: 22, paddingHorizontal: 40, marginBottom: 40 },
  progressBarContainer: {
    width: '85%',
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 3
  }
});

export default LocationVerificationScreen;
