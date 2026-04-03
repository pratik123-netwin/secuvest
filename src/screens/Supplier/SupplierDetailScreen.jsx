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
import ErrorState from '../../components/common/ErrorState';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import { getSupplierDetails } from '../../services/supplierService';
import LinearGradient from 'react-native-linear-gradient';

const TABS = ['Overview', 'Products'];

/**
 * SupplierDetailScreen — Single-supplier detail view with Overview / Products tabs.
 * Reached by tapping a product card on SupplierProfileScreen.
 */
const SupplierDetailScreen = ({ route, navigation }) => {
  const { supplier = {}, supplierId } = route.params || {};
  const [activeTab, setActiveTab] = useState('Overview');
  const [liveSupplier, setLiveSupplier] = useState(supplier);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const id = supplierId || supplier.id;

  React.useEffect(() => {
    if (!id) return;
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getSupplierDetails(id);
        setLiveSupplier(data);
      } catch (err) {
        setError(typeof err === 'string' ? err : 'Failed to fetch supplier profile.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) return <SafeAreaView style={styles.container}><LoadingSkeleton count={1} cardHeight={120} /></SafeAreaView>;
  if (error) return <SafeAreaView style={styles.container}><ErrorState message={error} /></SafeAreaView>;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Supplier Profile</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Blue mini summary card */}
      <LinearGradient
        colors={['#3075DF', '#1447E6']}
        locations={[0.04, 0.969]} // 4% and 96.9%
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.4 }}
        style={styles.summaryCard}
      >
        <View style={styles.summaryIconBox}>
          <Building2 size={22} color="#FFFFFF" strokeWidth={1.5} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.summaryTitle}>{liveSupplier.name || 'Supplier'}</Text>
          <Text style={styles.summarySubtitle}>{liveSupplier.location || ''}</Text>
        </View>
      </LinearGradient>

      {/* Overview / Products Tab Bar */}
      <TabBar tabs={TABS} activeTab={activeTab} onTabPress={setActiveTab} />

      {/* Tab Content */}
      {activeTab === 'Overview' ? (
        <SupplierOverviewTab supplierId={id} navigation={navigation} />
      ) : (
        <SupplierProductsTab supplierId={id} navigation={navigation} />
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
