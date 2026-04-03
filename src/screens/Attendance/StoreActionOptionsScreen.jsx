import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStoreDetails, getActiveSession } from '../../services/attendanceService';
import { COLORS } from '../../constants/colors';
import { MapPin, Building2, Clock as ClockIcon, Calendar, ChevronRight, ChevronLeft } from 'lucide-react-native';
import BackButton from '../../components/BackButton';
import LinearGradient from 'react-native-linear-gradient';

const StoreActionOptionsScreen = ({ route, navigation }) => {
  const { storeId, status } = route.params;
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasActiveSession, setHasActiveSession] = useState(false);
  const [activeSessionInfo, setActiveSessionInfo] = useState(null);

  const isOnSite = status === 'On-site';

  useFocusEffect(
    React.useCallback(() => {
      loadStore();
    }, [storeId, status])
  );

  const loadStore = async () => {
    try {
      const [fetchedStore, session] = await Promise.all([
        getStoreDetails(storeId),
        getActiveSession()
      ]);
      setStore(fetchedStore);
      if (session) {
        setHasActiveSession(true);
        setActiveSessionInfo(session);
      } else {
        setHasActiveSession(false);
        setActiveSessionInfo(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !store) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  const actionCardBg = isOnSite ? '#F0FDF4' : '#FFFBEB';
  const actionCardBorder = isOnSite ? '#BBF7D0' : '#FDE68A';
  const actionIconBg = isOnSite ? '#DCFCE7' : '#FEF3C7';
  const actionIconColor = isOnSite ? '#16A34A' : '#D97706';
  const statusDisplay = isOnSite ? 'At Store' : 'Away from Store';

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Attendance</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>

        {/* Selected Store Blue Card */}
        <LinearGradient
          colors={['#0F3078', '#155DFC']}
          locations={[0.0859, 0.858]} // matches 8.59% and 85.8%
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.6 }}
          style={styles.blueCard}
        >

          <View style={styles.blueCardTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.selectedStoreLabel}>Selected Store</Text>
              <Text style={styles.storeNameWhite}>{store.name}</Text>
            </View>
            <Building2 size={20} color="#FFFFFF" />
          </View>

          <View style={styles.blueCardBottom}>
            <View style={styles.locationRow}>
              <MapPin size={14} color="#FFFFFF" />
              <Text style={styles.locationStatusLabel}>Location Status</Text>
            </View>
            <Text style={styles.statusDisplayValue}>{statusDisplay}</Text>
          </View>
        </LinearGradient>

        {/* Action 1: Clock In / Return to Session */}
        {hasActiveSession ? (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.actionCard, { backgroundColor: '#F0F9FF', borderColor: '#BAE6FD' }]}
            onPress={() => navigation.navigate('ActiveSession', { store, status })}
          >
            <View style={styles.actionLeft}>
              <View style={[styles.actionIconBox, { backgroundColor: '#E0F2FE' }]}>
                <ClockIcon size={20} color="#0284C7" />
              </View>
              <View style={styles.actionTextCol}>
                <Text style={styles.actionTitle}>Return to Shift</Text>
                <Text style={styles.actionSubtitle}>You possess an active shift session</Text>
              </View>
            </View>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.actionCard, { backgroundColor: actionCardBg, borderColor: actionCardBorder }]}
            onPress={() => navigation.navigate('ConfirmClockIn', { store, status })}
          >
            <View style={styles.actionLeft}>
              <View style={[styles.actionIconBox, { backgroundColor: actionIconBg }]}>
                <ClockIcon size={20} color={actionIconColor} />
              </View>
              <View style={styles.actionTextCol}>
                <Text style={styles.actionTitle}>Clock In ({isOnSite ? 'On-Site' : 'Offline Visit'})</Text>
                <Text style={styles.actionSubtitle}>
                  {isOnSite ? 'You are at the store location' : 'Not at store (e.g., working from office)'}
                </Text>
              </View>
            </View>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>
        )}

        {/* Action 3: Change Store */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.changeStoreBtn}
          onPress={() => navigation.navigate('StoreSelection')}
        >
          <ChevronLeft size={16} color="#6B7280" />
          <Text style={styles.changeStoreText}>Change Store</Text>
        </TouchableOpacity>

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
  content: { padding: 20, flex: 1 },
  contentScroll: { padding: 20, flexGrow: 1 },

  blueCard: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6
  },
  blueCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32
  },
  selectedStoreLabel: {
    color: '#E0E7FF',
    fontSize: 13,
    marginBottom: 4
  },
  storeNameWhite: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  blueCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  locationStatusLabel: {
    color: '#E0E7FF',
    fontSize: 13,
    marginLeft: 6
  },
  statusDisplayValue: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold'
  },

  actionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  actionIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  actionTextCol: {
    flex: 1,
    justifyContent: 'center'
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4
  },
  actionSubtitle: {
    fontSize: 13,
    color: '#6B7280'
  },

  changeStoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    marginTop: 8
  },
  changeStoreText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
    marginLeft: 6
  }
});

export default StoreActionOptionsScreen;
