import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle2, Layers, BarChart2, TrendingDown } from 'lucide-react-native';
import BackButton from '../../components/BackButton';
import SearchBar from '../../components/SearchBar';
import ProductCard from '../../components/common/ProductCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';
import { getSupplierProducts, getSupplierMetrics } from '../../services/supplierService';

/* ─── Progress bar ────────────────────────────────────────────────────────── */
const ProgressBar = ({ value, max }) => {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${pct}%` }]} />
    </View>
  );
};

/* ─── Per-type screen config ──────────────────────────────────────────────── */
const SCREEN_CONFIG = {
  articlePerformance: {
    headerTitle: 'Article Performance',
    sectionLabel: 'Article Performance',
    metaLabel: 'Active Article',
    getMetaValue: (m) => `${m.active} / ${m.total}`,
    getProgress: (m) => ({ value: m.active, max: m.total }),
    card1: { label: 'Ranged', icon: 'check', color: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0' },
    card2: { label: 'De-ranged', icon: 'layers', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
    getCard1Value: (m) => m.ranged,
    getCard2Value: (m) => m.deranged,
    getDetailRows: () => [],
    getBadge: (p) => ({ badgeLabel: p.status, badgeStatus: p.status }),
  },
  stockHealth: {
    headerTitle: 'Stock Overview',
    sectionLabel: 'Stock Overview',
    metaLabel: 'Stock Availability',
    getMetaValue: (m) => `${m.availabilityPercent}%`,
    getProgress: (m) => ({ value: m.availabilityPercent, max: 100 }),
    card1: { label: 'In Stock', icon: 'check', color: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0' },
    card2: { label: 'Out of Stock', icon: 'layers', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
    getCard1Value: (m) => m.ranged,
    getCard2Value: (m) => m.deranged,
    getDetailRows: (p) => [
      { label: 'Current Stock', value: `${p.currentStock ?? 0} units` },
      { label: 'Reorder Level', value: `${p.reorderLevel ?? 0} units` },
      { label: 'Last Restocked', value: p.lastRestocked ?? '-' },
    ],
    getBadge: (p) => ({ badgeLabel: p.stockStatus, badgeStatus: p.stockStatus }),
  },
  salesMetrics: {
    headerTitle: 'Sales Overview',
    sectionLabel: 'Sales Overview',
    metaLabel: null,
    getMetaValue: () => null,
    getProgress: () => null,
    card1: null,
    card2: null,
    getCard1Value: () => null,
    getCard2Value: () => null,
    getDetailRows: (p) => [
      { label: 'Avg. Daily Sales', value: `${p.avgDailySales ?? 0} units` },
      { label: 'Total Sales', value: `${p.totalSales ?? 0} units` },
      { label: 'Last Sale', value: p.lastSale ?? '-' },
    ],
    getBadge: (p) => ({ badgeLabel: p.trend, badgeStatus: p.trend }),
  },
};

/* ─── Screen ──────────────────────────────────────────────────────────────── */
const MetricsDrilldownScreen = ({ route }) => {
  const { type = 'articlePerformance', supplierId } = route.params || {};
  const config = SCREEN_CONFIG[type] || SCREEN_CONFIG.articlePerformance;

  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true); setError(null);
      const [prods, mets] = await Promise.all([
        getSupplierProducts(supplierId),
        getSupplierMetrics(supplierId),
      ]);
      setProducts(prods);
      setMetrics(mets);
    } catch {
      setError('Failed to load data.');
    } finally {
      setLoading(false);
    }
  }, [supplierId]);

  useEffect(() => { load(); }, [load]);

  const metricData = metrics ? metrics[type] : null;
  const salesMetrics = metrics?.salesMetrics;
  const progress = metricData && config.getProgress ? config.getProgress(metricData) : null;

  const filtered = products.filter(p => {
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.articleNo.toLowerCase().includes(q);
  });

  /* ── FlatList header ── */
  const ListHeader = (
    <View>
      {/* Section title */}
      <Text style={styles.sectionTitle}>{config.sectionLabel}</Text>

      {/* Article Performance / Stock Health — progress + summary cards */}
      {type !== 'salesMetrics' && metricData && (
        <View style={styles.metricSection}>
          {config.metaLabel && (
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>{config.metaLabel}</Text>
              <Text style={styles.metaValue}>{config.getMetaValue(metricData)}</Text>
            </View>
          )}
          {progress && <ProgressBar value={progress.value} max={progress.max} />}
          <View style={styles.cardRow}>
            <View style={[styles.summaryCard, { backgroundColor: config.card1.bg, borderColor: config.card1.border }]}>
              <View style={styles.cardTopRow}>
                <Text style={styles.cardLabel}>{config.card1.label}</Text>
                {config.card1.icon === 'check'
                  ? <CheckCircle2 size={18} color={config.card1.color} />
                  : <Layers size={18} color={config.card1.color} />}
              </View>
              <Text style={[styles.cardValue, { color: config.card1.color }]}>
                {config.getCard1Value(metricData)}
              </Text>
            </View>
            <View style={[styles.summaryCard, { backgroundColor: config.card2.bg, borderColor: config.card2.border }]}>
              <View style={styles.cardTopRow}>
                <Text style={styles.cardLabel}>{config.card2.label}</Text>
                {config.card2.icon === 'check'
                  ? <CheckCircle2 size={18} color={config.card2.color} />
                  : <Layers size={18} color={config.card2.color} />}
              </View>
              <Text style={[styles.cardValue, { color: config.card2.color }]}>
                {config.getCard2Value(metricData)}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Sales Metrics — Rate of Sale + No Sales summary cards */}
      {type === 'salesMetrics' && salesMetrics && (
        <View style={[styles.cardRow, styles.rowSection]}>
          <View style={[styles.summaryCard, { backgroundColor: '#EEF2FF', borderColor: '#C2CFFF' }]}>
            <View style={styles.cardTopRow}>
              <Text style={styles.cardLabel}>Rate of Sale</Text>
              <BarChart2 size={16} color="#4338CA" />
            </View>
            <Text style={[styles.cardValue, { color: '#4338CA', fontSize: 22 }]}>
              {salesMetrics.rateOfSale}
            </Text>
            <Text style={styles.cardSub}>Units per day</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }]}>
            <View style={styles.cardTopRow}>
              <Text style={styles.cardLabel}>No Sales</Text>
              <TrendingDown size={16} color="#D97706" />
            </View>
            <Text style={[styles.cardValue, { color: '#D97706', fontSize: 22 }]}>
              {salesMetrics.noSales30Days}
            </Text>
            <Text style={styles.cardSub}>Last 30 days</Text>
          </View>
        </View>
      )}

      {/* Search bar */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search products, Article#..."
        resultsText={loading ? undefined : `${filtered.length} products available`}
        isMatrics={true}
      />

      {loading && <LoadingSkeleton count={4} cardHeight={type === 'articlePerformance' ? 90 : 130} />}
      {error && <ErrorState message={error} onRetry={load} />}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>{config.headerTitle}</Text>
        <View style={{ width: 60 }} />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={p => p.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={!loading && !error ? <EmptyState title="No products found" /> : null}
        renderItem={({ item }) => {
          const { badgeLabel, badgeStatus } = config.getBadge(item);
          return (
            <ProductCard
              product={item}
              detailRows={config.getDetailRows(item)}
              badgeLabel={badgeLabel}
              badgeStatus={badgeStatus}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

/* ─── Styles ──────────────────────────────────────────────────────────────── */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 20 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 10, paddingBottom: 12,
  },
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#111827' },
  sectionTitle: {
    fontSize: 17, fontWeight: '700', color: '#111827',
    marginBottom: 16, marginTop: 4,
  },
  metricSection: { marginBottom: 14, borderWidth: 1, borderColor: '#EAEAED', borderRadius: 12, padding: 12 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  metaLabel: { fontSize: 14, color: '#6B7280' },
  metaValue: { fontSize: 14, fontWeight: '600', color: '#111827' },
  progressTrack: { height: 7, backgroundColor: '#E5E7EB', borderRadius: 4, marginBottom: 16, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#4338CA', borderRadius: 4 },
  cardRow: { flexDirection: 'row', gap: 12, },
  summaryCard: { flex: 1, borderRadius: 14, borderWidth: 1, padding: 14 },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  cardLabel: { fontSize: 12, color: '#6B7280', fontWeight: '500' },
  cardValue: { fontSize: 28, fontWeight: '700', color: '#16A34A' },
  cardSub: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  listContent: { paddingBottom: 40 },
  rowSection: { marginBottom: 14, borderWidth: 1, borderColor: '#EAEAED', borderRadius: 12, padding: 12 }
});

export default MetricsDrilldownScreen;
