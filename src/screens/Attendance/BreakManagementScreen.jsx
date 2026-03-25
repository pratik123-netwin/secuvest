import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Clock, ChevronRight } from 'lucide-react-native';
import BackButton from '../../components/BackButton';

const BreakManagementScreen = ({ navigation }) => {
  const [session, setSession] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const loadSession = async () => {
        try {
          const data = await AsyncStorage.getItem('active_session');
          if (data) {
            setSession(JSON.parse(data));
          }
        } catch (e) { }
      };
      loadSession();
    }, [])
  );

  const handleClockOutPress = () => {
    if (session) {
      navigation.navigate('ConfirmClockOut', { store: session.store, status: session.status, startTime: session.startTime });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Break Management</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>

        {/* Action: Clock Out */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.actionCard}
          onPress={handleClockOutPress}
        >
          <View style={styles.actionLeft}>
            <View style={styles.actionIconBox}>
              <Clock size={20} color="#DC2626" />
            </View>
            <View style={styles.actionTextCol}>
              <Text style={styles.actionTitle}>Clock Out</Text>
            </View>
          </View>
          <ChevronRight size={18} color="#9CA3AF" />
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

  actionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderColor: '#F3F4F6'
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
    marginRight: 16,
    backgroundColor: '#FEE2E2' // Red-100
  },
  actionTextCol: {
    flex: 1,
    justifyContent: 'center'
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
  }
});

export default BreakManagementScreen;
