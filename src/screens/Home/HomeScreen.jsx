import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants/colors';
import { Bell, AlarmClock, ChevronRight, User, CheckCircle } from 'lucide-react-native';

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
      const interval = setInterval(checkActiveSession, 60000); // refresh every minute natively
      return () => clearInterval(interval);
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}>
              <User size={24} color="#555" />
            </View>
            <Text style={styles.greetingText}>Hi, {userName}!</Text>
          </View>
        </View>

        {/* Action Card */}
        {activeSession ? (
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: '#0B5842', shadowColor: '#22784C' }]}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Clock', { screen: 'BreakManagement' })}
          >
            <View style={styles.actionIconContainer}>
              <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#22784C', justifyContent: 'center', alignItems: 'center' }}>
                <AlarmClock size={24} color="#FFFFFF" strokeWidth={1.5} />

              </View>
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Shift Continue</Text>
              <Text style={styles.actionSubtitle}>{elapsedText}</Text>
            </View>
            <ChevronRight size={24} color="#FFFFFF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.actionCard}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Clock', { screen: 'StoreSelection' })}
          >
            <View style={styles.actionIconContainer}>
              <AlarmClock size={28} color="#FFFFFF" strokeWidth={1.5} />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Start your Shift</Text>
              <Text style={styles.actionSubtitle}>Select a store to clock in</Text>
            </View>
            <ChevronRight size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    minHeight: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 35,
    marginTop: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 12,
  },
  bellIcon: {
    padding: 8,
  },
  actionCard: {
    backgroundColor: COLORS.primary, // Blue
    borderRadius: 36,
    padding: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  actionIconContainer: {
    marginRight: 16,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 13,
    color: '#E0E7FF',
  },
});

export default HomeScreen;
