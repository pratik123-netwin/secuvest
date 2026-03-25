import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import SearchBar from '../../components/SearchBar';
import TabBar from '../../components/common/TabBar';
import ProductCard from '../../components/common/ProductCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';
import { getSupplierProducts } from '../../services/supplierService';
import { CheckCircle2, Layers } from 'lucide-react-native';

const DRILL_TABS = ['Ranged', 'De-ranged'];

const MetricsDrilldownScreen = ({ route, navigation }) => {
  const { title = 'Metrics', type = 'articlePerformance', supplierId } = route.params || {};
  const [activeTab, setActiveTab] = useState('Ranged');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSupplierProducts(supplierId);
      setProducts(data);
    } catch {
      setError('Failed to load articles.');
    } finally {
      setLoading(false);
    }
  }, [supplierId]);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const filtered = products.filter(p => {
    const matchesTab = p.status === activeTab;
    const q = searchQuery.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(q) || p.articleNo.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  const stats = {
    ranged: products.filter(p => p.status === 'Ranged').length,
    deranged: products.filter(p => p.status === 'De-ranged').length,
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Summary cards */}
      <View style={styles.cardRow}>
        <View style={[styles.summaryCard, styles.greenCard]}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardLabel}>Ranged</Text>
            <CheckCircle2 size={18} color="#16A34A" />
          </View>
          <Text style={styles.cardValue}>{stats.ranged}</Text>
        </View>
        <View style={[styles.summaryCard, styles.redCard]}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardLabel}>De-ranged</Text>
            <Layers size={18} color="#DC2626" />
          </View>
          <Text style={[styles.cardValue, { color: '#DC2626' }]}>{stats.deranged}</Text>
        </View>
      </View>

      {/* Search */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search products, Article#..."
        resultsText={loading ? undefined : `${filtered.length} products available`}
      />

      {/* Tab Filter */}
      <TabBar tabs={DRILL_TABS} activeTab={activeTab} onTabPress={setActiveTab} />

      {/* Product List */}
      {loading ? <LoadingSkeleton count={4} cardHeight={90} /> :
       error ? <ErrorState message={error} onRetry={loadProducts} /> : (
        <FlatList
          data={filtered}
          keyExtractor={p => p.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState title={`No ${activeTab} articles`} />}
          renderItem={({ item }) => (
            <ProductCard product={item} showStatus={true} />
          )}
        />
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
  cardRow: { flexDirection: 'row', gap: 12, marginHorizontal: 20, marginBottom: 16 },
  summaryCard: {
    flex: 1, borderRadius: 14, borderWidth: 1, padding: 14,
  },
  greenCard: { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' },
  redCard: { backgroundColor: '#FEF2F2', borderColor: '#FECACA' },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardLabel: { fontSize: 13, color: '#6B7280', fontWeight: '500' },
  cardValue: { fontSize: 28, fontWeight: '700', color: '#16A34A' },
});

export default MetricsDrilldownScreen;
