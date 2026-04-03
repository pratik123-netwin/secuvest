import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native';
import { ArrowUpRight, CheckCircle2, Layers } from 'lucide-react-native';
import { Trash2, TrendingUp, Activity } from 'lucide-react-native';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import ErrorState from '../../components/common/ErrorState';
import { getSupplierMetrics } from '../../services/supplierService';

const ProgressBar = ({ value, max }) => {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${pct}%` }]} />
    </View>
  );
};

// derangedVariant: 'red' (Article Performance) | 'amber' (Stock Health)
const RangedDerangedRow = ({ ranged, deranged, onDrillRanged, onDrillDeranged, derangedVariant = 'red' }) => {
  const derangedCard = derangedVariant === 'amber'
    ? { bg: '#FFFBEB', border: '#FDE68A', iconColor: '#D97706', valColor: '#D97706' }
    : { bg: '#FEF2F2', border: '#FECACA', iconColor: '#DC2626', valColor: '#DC2626' };

  return (
    <View style={styles.rdRow}>
      {/* Ranged — green */}
      <TouchableOpacity style={[styles.rdCard, styles.rdCardGreen]} onPress={onDrillRanged}>
        <View style={styles.rdTopRow}>
          <Text style={styles.rdLabel}>Ranged</Text>
          <CheckCircle2 size={18} color="#16A34A" />
        </View>
        <Text style={[styles.rdValue, { color: '#16A34A' }]}>{ranged}</Text>
      </TouchableOpacity>

      {/* De-ranged — color varies by section */}
      <TouchableOpacity
        style={[styles.rdCard, { backgroundColor: derangedCard.bg, borderColor: derangedCard.border, borderWidth: 1 }]}
        onPress={onDrillDeranged}
      >
        <View style={styles.rdTopRow}>
          <Text style={styles.rdLabel}>De-ranged</Text>
          <Layers size={18} color={derangedCard.iconColor} />
        </View>
        <Text style={[styles.rdValue, { color: derangedCard.valColor }]}>{deranged}</Text>
      </TouchableOpacity>
    </View>
  );
};

const SupplierOverviewTab = ({ supplierId, navigation }) => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMetrics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSupplierMetrics(supplierId);
      setMetrics(data);
    } catch {
      setError('Failed to load metrics.');
    } finally {
      setLoading(false);
    }
  }, [supplierId]);

  useEffect(() => { loadMetrics(); }, [loadMetrics]);

  const drilldown = (title, type, status) => navigation.navigate('MetricsDrilldown', { title, type, status });

  if (loading) return <LoadingSkeleton count={4} cardHeight={130} />;
  if (error) return <ErrorState message={error} onRetry={loadMetrics} />;
  if (!metrics) return null;

  const ap = metrics.article_performance;
  const sh = metrics.stock_health;
  const sm = metrics.sales_metrics;
  const wt = metrics.wastage_tracking;

  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

      {/* ── Article Performance ── */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Article Performance</Text>
        <TouchableOpacity onPress={() => drilldown('Article Performance', 'articlePerformance')}>
          <ArrowUpRight size={18} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      <View style={styles.sectionCard}>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Active Article</Text>
          <Text style={styles.metaValue}>{ap.ranged} / {ap.total}</Text>
        </View>
        <ProgressBar value={ap.ranged} max={ap.total} />
        <RangedDerangedRow
          ranged={ap.ranged} deranged={ap.de_ranged}
          onDrillRanged={() => drilldown('Article Performance', 'articlePerformance', 'ranged')}
          onDrillDeranged={() => drilldown('Article Performance', 'articlePerformance', 'de_ranged')}
        />
      </View>

      {/* ── Stock Health ── */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Stock Health</Text>
        <TouchableOpacity onPress={() => drilldown('Stock Health', 'stockHealth')}>
          <ArrowUpRight size={18} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      <View style={styles.sectionCard}>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Stock Availability</Text>
          <Text style={styles.metaValue}>{sh.availability_percentage || 0}%</Text>
        </View>
        <ProgressBar value={sh.availability_percentage || 0} max={100} />
        <RangedDerangedRow
          ranged={sh.in_stock || 0} deranged={sh.out_of_stock || 0}
          derangedVariant="amber"
          onDrillRanged={() => drilldown('Stock Health', 'stockHealth', 'in_stock')}
          onDrillDeranged={() => drilldown('Stock Health', 'stockHealth', 'out_of_stock')}
        />
      </View>

      {/* ── Sales Metrics ── */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Sales Metrics</Text>
        <TouchableOpacity onPress={() => drilldown('Sales Metrics', 'salesMetrics')}>
          <ArrowUpRight size={18} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      {/* Rate of Sale — own card */}
      <View style={styles.metricBox}>
        <View style={styles.metricIconBox}>
          <TrendingUp size={18} color="#6B7280" />
        </View>
        <View>
          <Text style={styles.iconRowLabel}>Rate of Sale</Text>
          <Text style={styles.iconRowValue}>{sm.rate_of_sale}</Text>
        </View>
      </View>

      {/* No Sales — own card */}
      <View style={styles.metricBox}>
        <View style={styles.metricIconBox}>
          <Activity size={18} color="#6B7280" />
        </View>
        <View>
          <Text style={styles.iconRowLabel}>No Sales (30 days)</Text>
          <Text style={styles.iconRowValue}>{sm.no_sales_30_days}</Text>
        </View>
      </View>

      {/* ── Wastage Tracking ── */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Wastage Tracking</Text>
      </View>
      <View style={[styles.sectionCard, { borderColor: '#FECDCA', gap: 16 }]}>
        <View style={styles.rdRow}>
          <View style={[styles.rdCard, styles.rdCardRed]}>
            <View style={styles.rdTopRow}>
              <Text style={styles.rdLabel}>Wastage Qty</Text>
              <Trash2 size={16} color="#DC2626" />
            </View>
            <Text style={[styles.rdValue, { color: '#DC2626' }]}>{wt.wastage_quantity || 0}</Text>
            <Text style={styles.rdSub}>Units wasted</Text>
          </View>
          <View style={[styles.rdCard, { backgroundColor: '#FFF7ED', borderColor: '#FED7AA' }]}>
            <View style={styles.rdTopRow}>
              <Text style={styles.rdLabel}>Wastage %</Text>
              <TrendingUp size={16} color="#F97316" />
            </View>
            <Text style={[styles.rdValue, { color: '#F97316' }]}>{Number(wt.wastage_percentage || 0).toFixed(2)}%</Text>
            <Text style={styles.rdSub}>vs Total Sales</Text>
          </View>
        </View>
        <View style={styles.metricBox}>
          <View style={styles.metricIconBox}>
            <Activity size={20} color="#9CA3AF" style={{ marginRight: 10 }} />
          </View>
          <View>
            <Text style={styles.iconRowLabel}>Wastage Status</Text>
            <Text style={styles.iconRowValue}>{wt.wastage_status || 'N/A'}</Text>
          </View>
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingBottom: 30 },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '500', color: '#111827' },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  metaLabel: { fontSize: 13, color: '#6B7280' },
  metaValue: { fontSize: 13, fontWeight: '600', color: '#111827' },
  progressTrack: { height: 6, backgroundColor: '#E5E7EB', borderRadius: 3, marginBottom: 14, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#4238F3', borderRadius: 3 },
  rdRow: { flexDirection: 'row', gap: 10 },
  rdCard: {
    flex: 1, borderRadius: 12, padding: 12, borderWidth: 1,
  },
  rdCardGreen: { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' },
  rdCardRed: { backgroundColor: '#FEF2F2', borderColor: '#FECACA' },
  rdTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  rdLabel: { fontSize: 12, color: '#6B7280' },
  rdValue: { fontSize: 24, fontWeight: '700', color: '#16A34A' },
  rdSub: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  // Sales Metrics individual row cards
  metricBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  metricIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 4 },
  iconRowLabel: { fontSize: 13, color: '#6B7280', marginBottom: 2 },
  iconRowValue: { fontSize: 14, fontWeight: '600', color: '#111827' },
});

export default SupplierOverviewTab;
