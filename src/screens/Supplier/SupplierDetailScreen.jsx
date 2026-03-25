import React, { useState } from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Building2 } from 'lucide-react-native';
import BackButton from '../../components/BackButton';
import TabBar from '../../components/common/TabBar';
import SupplierOverviewTab from './SupplierOverviewTab';
import SupplierProductsTab from './SupplierProductsTab';

const TABS = ['Overview', 'Products'];

/**
 * SupplierDetailScreen — Single-supplier detail view with Overview / Products tabs.
 * Reached by tapping a product card on SupplierProfileScreen.
 */
const SupplierDetailScreen = ({ route, navigation }) => {
  const { supplier = {} } = route.params;
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Supplier Profile</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Blue mini summary card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryIconBox}>
          <Building2 size={22} color="#FFFFFF" strokeWidth={1.5} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.summaryTitle}>{supplier.name || 'Supplier'}</Text>
          <Text style={styles.summarySubtitle}>{supplier.location || ''}</Text>
        </View>
      </View>

      {/* Overview / Products Tab Bar */}
      <TabBar tabs={TABS} activeTab={activeTab} onTabPress={setActiveTab} />

      {/* Tab Content */}
      {activeTab === 'Overview' ? (
        <SupplierOverviewTab supplierId={supplier.id} navigation={navigation} />
      ) : (
        <SupplierProductsTab supplierId={supplier.id} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15,
  },
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#111827' },
  summaryCard: {
    backgroundColor: '#3075DF',
    marginHorizontal: 20, borderRadius: 16, padding: 16, marginBottom: 16,
    flexDirection: 'row', alignItems: 'center',
  },
  summaryIconBox: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
    borderWidth: 1, borderColor: '#FFFFFF'
  },
  summaryTitle: { fontSize: 17, fontWeight: '700', color: '#FFFFFF', marginBottom: 2 },
  summarySubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.7)' },
});

export default SupplierDetailScreen;
