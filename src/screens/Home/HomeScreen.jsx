import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants/colors';
import { AlarmClock, ChevronRight, User } from 'lucide-react-native';

const HomeScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const userName = user?.name || user?.email?.split('@')[0] || 'Olivia';
  const [activeSession, setActiveSession] = React.useState(null);
  const [elapsedText, setElapsedText] = React.useState('');

  useFocusEffect(
    React.useCallback(() => {
      const checkActiveSession = async () => {
        try {
          const session = await AsyncStorage.getItem('active_session');
          if (session) {
            const parsed = JSON.parse(session);
            setActiveSession(parsed);
            const diffMs = Date.now() - parsed.startTime;
            const diffHrs = Math.floor(diffMs / 3600000);
            const diffMins = Math.floor((diffMs % 3600000) / 60000);
            setElapsedText(`${diffHrs}h ${diffMins}m`);
          } else {
            setActiveSession(null);
          }
        } catch (e) { }
      };
      checkActiveSession();
      const interval = setInterval(checkActiveSession, 60000);
      return () => clearInterval(interval);
    }, [])
  );

  const isActive = !!activeSession;

  return (
    <SafeAreaView style={styles.container}>

      {/* ── Top Header ── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <User size={22} color="#555" />
          </View>
          <Text style={styles.greetingText}>Hi, {userName}!</Text>
        </View>
      </View>

      {/* ── Vertically centred hero area ── */}
      <View style={styles.heroArea}>

        {/* Circular icon badge */}
        <View style={[styles.iconBadge, isActive && styles.iconBadgeActive]}>
          <AlarmClock size={44} color="#FFFFFF" strokeWidth={1.5} />
        </View>

        {/* Text block */}
        <Text style={styles.heroTitle}>
          {isActive ? 'Shift in Progress' : 'Start your Shift'}
        </Text>
        <Text style={styles.heroSubtitle}>
          {isActive
            ? `Running for ${elapsedText}`
            : 'Tap the button below to clock in'}
        </Text>

        {/* CTA Button */}
        <TouchableOpacity
          style={[styles.ctaButton, isActive && styles.ctaButtonActive]}
          activeOpacity={0.85}
          onPress={() =>
            navigation.navigate('Clock', {
              screen: isActive ? 'BreakManagement' : 'StoreSelection',
            })
          }
        >
          <Text style={styles.ctaText}>
            {isActive ? 'Continue Shift' : 'Start Shift'}
          </Text>
          <ChevronRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginLeft: 12,
  },

  /* Hero */
  heroArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  iconBadge: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  iconBadgeActive: {
    backgroundColor: '#0B5842',
    shadowColor: '#0B5842',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 36,
  },

  /* Button */
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    paddingVertical: 16,
    paddingHorizontal: 40,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    gap: 8,
  },
  ctaButtonActive: {
    backgroundColor: '#0B5842',
    shadowColor: '#0B5842',
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});

export default HomeScreen;
