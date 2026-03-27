import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { clockIn } from '../../services/attendanceService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants/colors';
import { LogIn, Building2, Clock as ClockIcon } from 'lucide-react-native';
import BackButton from '../../components/BackButton';

const ConfirmClockInScreen = ({ route, navigation }) => {
  const { store, status } = route.params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    setLoading(true);
    setError('');
    try {
      await clockIn({ storeId: store.id, status });
      await AsyncStorage.setItem('active_session', JSON.stringify({ store, status, startTime: Date.now() }));
      navigation.reset({
        index: 0,
        routes: [{ name: 'ActiveSession', params: { store, status } }],
      });
    } catch (err) {
      setError('Failed to clock in securely. Please try reconnecting.');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date();
  const dateString = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeString = today.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

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
            <LogIn size={42} color="#FFFFFF" strokeWidth={1.5} style={{ marginLeft: 4 }} />
          </View>
          <Text style={styles.heroTitle}>Confirm Clock In</Text>
          <Text style={styles.heroSubtitle}>Starting {status.toLowerCase()} shift</Text>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.cardTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardLabel}>Store</Text>
              <Text style={styles.storeName}>{store.name}</Text>
            </View>
            <View style={styles.buildingIconBox}>
              <Building2 size={20} color="#FFFFFF" />
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Type:</Text>
            <Text style={styles.detailValue}>{status}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date:</Text>
            <Text style={styles.detailValue}>{dateString}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time:</Text>
            <Text style={styles.detailValue}>{timeString}</Text>
          </View>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
              <Text style={styles.confirmBtnText}>Confirm Clock In</Text>
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
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#4F46E5',
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

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 20,
    marginBottom: 32
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  cardLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4
  },
  storeName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827'
  },
  buildingIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 16
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  detailLabel: {
    fontSize: 13,
    color: '#6B7280'
  },
  detailValue: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '500'
  },

  errorText: { color: COLORS.error, marginBottom: 16, textAlign: 'center' },

  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    height: 52,
    borderRadius: 26,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4
  },
  confirmBtnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF'
  }
});

export default ConfirmClockInScreen;
