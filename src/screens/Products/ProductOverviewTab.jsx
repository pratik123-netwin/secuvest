import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import StatusCard from '../../components/common/StatusCard';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';
import { formatDate } from '../../utils/formatDate';

/**
 * ProductOverviewTab
 * Receives `overview` prop from ProductDetailScreen:
 * { stock_status, range_status, rate_of_sale, last_sale_date }
 */
const ProductOverviewTab = ({ overview = {} }) => {
  const {
    stock_status,
    range_status,
    rate_of_sale,
    last_sale_date,
  } = overview;

  return (
    <ScrollView style={styles.wrapper} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Status Cards Row */}
      <View style={styles.cardRow}>
        <StatusCard label={STRINGS.stockStatus} value={stock_status} type="stock" />
        <StatusCard label={STRINGS.rangeStatus} value={range_status} type="range" />
      </View>

      {/* Sales Performance */}
      <Text style={styles.sectionTitle}>{STRINGS.salesPerformance}</Text>
      <View style={styles.infoCard}>
        <InfoRow label={STRINGS.rateOfSale} value={rate_of_sale != null ? `${rate_of_sale} units/day` : 'N/A'} />
        <InfoRow label={STRINGS.lastSold} value={formatDate(last_sale_date)} isLast />
      </View>
    </ScrollView>
  );
};

const InfoRow = ({ label, value, isLast }) => (
  <View style={[styles.infoRow, !isLast]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value ?? 'N/A'}</Text>
  </View>
);

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 40 },
  cardRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '500', color: COLORS.textTitle, marginBottom: 12 },
  infoCard: {
    backgroundColor: COLORS.background, borderRadius: 16,
    borderWidth: 1, borderColor: COLORS.cardBorder, marginBottom: 24,
  },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 },
  infoRowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.divider },
  infoLabel: { fontSize: 12, fontWeight: '500', color: COLORS.textSecondary },
  infoValue: { fontSize: 12, fontWeight: '400', color: COLORS.textSecondary },
});

export default ProductOverviewTab;
