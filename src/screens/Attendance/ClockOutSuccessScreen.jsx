import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackActions, CommonActions } from '@react-navigation/native';
import { CheckCircle, Home } from 'lucide-react-native';
import BackButton from '../../components/BackButton';
import StoreInfoCard from '../../components/StoreInfoCard';

const ClockOutSuccessScreen = ({ route, navigation }) => {
  const { store, status, startTime } = route.params;

  // Block hardware back — the flow is complete, user must use "Return to Home"
  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => handler.remove();
  }, []);

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
        <BackButton disabled={true} color="transparent" textStyle={{ color: 'transparent' }} />
        <Text style={styles.headerTitle}>Attendance</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>

        {/* Success Hero */}
        <View style={styles.heroSection}>
          <View style={styles.heroIconBox}>
            <CheckCircle size={44} color="#FFFFFF" strokeWidth={1.5} />
          </View>
          <Text style={styles.heroTitle}>Clocked Out Successfully!</Text>
          <Text style={styles.heroSubtitle}>Your shift has been completed. Thank{"\n"}you for your work!</Text>
        </View>

        <StoreInfoCard
          storeName={store.name}
          status={status}
          dateString={dateString}
          timeString={timeString}
          totalHours={totalHours}
        />

        {/* Action Buttons */}
        <View style={styles.footerActions}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.homeBtn}
            onPress={() => {
              // Reset the Clock stack back to its first screen so it's clean on re-entry
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'StoreSelection' }],
                })
              );
              // Then switch the BottomTab to Home
              navigation.getParent('BottomTabs')?.navigate('Home')
                ?? navigation.getParent()?.navigate('Home');
            }}
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
    backgroundColor: '#16A34A', // Green
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#16A34A',
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

  footerActions: {
    // marginTop: 'auto'
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

export default ClockOutSuccessScreen;
