import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants/colors';
import { LogOut, Clock as ClockIcon } from 'lucide-react-native';
import BackButton from '../../components/BackButton';
import StoreInfoCard from '../../components/StoreInfoCard';

const ConfirmClockOutScreen = ({ route, navigation }) => {
  const { store, status, startTime } = route.params;
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await AsyncStorage.removeItem('active_session');
      navigation.reset({
        index: 0,
        routes: [{ name: 'ClockOutSuccess', params: { store, status, startTime } }],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date();
  const dateString = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeString = today.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

  const diffMs = Date.now() - startTime;
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffMins = Math.floor((diffMs % 3600000) / 60000);
  const totalHours = `${diffHrs}h ${diffMins}m`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Attendance</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>

        {/* Center Hero Icon */}
        <View style={styles.heroSection}>
          <View style={styles.heroIconBox}>
            <LogOut size={42} color="#FFFFFF" strokeWidth={1.5} style={{ marginLeft: 4 }} />
          </View>
          <Text style={styles.heroTitle}>Confirm Clock Out</Text>
          <Text style={styles.heroSubtitle}>Ending your shift</Text>
        </View>

        <StoreInfoCard
          storeName={store.name}
          status={status}
          dateString={dateString}
          timeString={timeString}
          totalHours={totalHours}
        />

        {/* Custom Action Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.confirmBtn}
          onPress={handleConfirm}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <ClockIcon size={18} color="#FFFFFF" style={{ marginRight: 8, marginTop: 1 }} />
              <Text style={styles.confirmBtnText}>Confirm Clock Out</Text>
            </>
          )}
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15 },
  backButton: { flexDirection: 'row', alignItems: 'center', width: 60 },
  backText: { fontSize: 14, color: '#6B7280', marginLeft: 4, fontWeight: '500' },
  headerTitle: { fontSize: 16, fontWeight: '500', color: '#111827' },
  content: { padding: 20, flex: 1 },
  contentScroll: { padding: 20, flexGrow: 1 },

  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20
  },
  heroIconBox: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#6B7280'
  },

  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
    height: 52,
    borderRadius: 26,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmBtnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF'
  }
});

export default ConfirmClockOutScreen;
