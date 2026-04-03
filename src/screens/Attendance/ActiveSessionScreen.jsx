import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getActiveSession } from '../../services/attendanceService';
import { CheckCircle, MessageSquare, Home } from 'lucide-react-native';
import BackButton from '../../components/BackButton';
import StoreInfoCard from '../../components/StoreInfoCard';

const ActiveSessionScreen = ({ route, navigation }) => {
  const { store, status } = route.params;
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    let interval;
    const initTimer = async () => {
      try {
        const session = await getActiveSession();
        if (session && session.clock_in_time) {
          const clockInTimeMs = new Date(session.clock_in_time).getTime();
          const nowMs = Date.now();
          const initialElapsed = Math.floor(Math.max(nowMs - clockInTimeMs, 0) / 1000);
          setSecondsElapsed(initialElapsed);
        }
      } catch (e) {
        console.error("Failed syncing chronometer:", e);
      }
      
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    };
    
    initTimer();
    return () => clearInterval(interval);
  }, []);

  const totalSeconds = secondsElapsed;
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  const pad = (num) => num.toString().padStart(2, '0');

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

        {/* Success Hero */}
        <View style={styles.heroSection}>
          <View style={styles.heroIconBox}>
            <CheckCircle size={44} color="#FFFFFF" strokeWidth={1.5} />
          </View>
          <Text style={styles.heroTitle}>Clocked In Successfully!</Text>
          <Text style={styles.heroSubtitle}>Your attendance has been recorded.{"\n"}Have a great shift!</Text>
        </View>

        {/* Time Elapsed Card */}
        <View style={styles.timeCard}>
          <Text style={styles.timeLabel}>Time Elapsed</Text>
          <View style={styles.timeBoxesRow}>
            <View style={styles.timeBox}>
              <Text style={styles.timeDigit}>{pad(h)}</Text>
            </View>
            <View style={styles.timeBox}>
              <Text style={styles.timeDigit}>{pad(m)}</Text>
            </View>
            <View style={styles.timeBox}>
              <Text style={styles.timeDigit}>{pad(s)}</Text>
            </View>
          </View>
          <Text style={styles.sessionLabel}>Active Session</Text>
        </View>

        {/* Reusable Store Info Card */}
        <StoreInfoCard
          storeName={store.name}
          status={status}
          dateString={dateString}
          timeString={timeString}
        />

        {/* Action Buttons */}
        <View style={styles.footerActions}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.homeBtn}
            onPress={() => navigation.navigate('RootTabs', { screen: 'Home' })}
          >
            <Home size={16} color="#4B5563" style={{ marginRight: 8 }} />
            <Text style={styles.homeBtnText}>Return to Home</Text>
          </TouchableOpacity>
        </View>

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
  contentScroll: { padding: 20, flexGrow: 1 },

  heroSection: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 0
  },
  heroIconBox: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20
  },

  timeCard: {
    backgroundColor: '#ECF1FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#C2CFFF'
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 16
  },
  timeBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16
  },
  timeBox: {
    width: 64,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#818CF8',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8
  },
  timeDigit: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4F46E5'
  },
  sessionLabel: {
    fontSize: 13,
    color: '#6B7280'
  },

  footerActions: {
    // marginTop: 'auto'
  },
  feedbackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    height: 52,
    borderRadius: 26,
    marginBottom: 12,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4
  },
  feedbackBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  homeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF'
  },
  homeBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4B5563'
  }
});

export default ActiveSessionScreen;
