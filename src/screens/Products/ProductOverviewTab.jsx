import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import StatusCard from '../../components/common/StatusCard';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';

const ProductOverviewTab = ({ product }) => {
  return (
    <ScrollView style={styles.wrapper} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Status Cards Row */}
      <View style={styles.cardRow}>
        <StatusCard label={STRINGS.stockStatus} value={product.stockStatus} type="stock" />
        <StatusCard label={STRINGS.rangeStatus} value={product.rangeStatus} type="range" />
      </View>

      {/* Sales Performance */}
      <Text style={styles.sectionTitle}>{STRINGS.salesPerformance}</Text>
      <View style={styles.infoCard}>
        <InfoRow label={STRINGS.rateOfSale} value={`${product.rateOfSale} units/day`} />
        <InfoRow label={STRINGS.lastSold} value={product.lastSold} isLast />
      </View>
    </ScrollView>
  );
};

const InfoRow = ({ label, value, isLast }) => (
  <View style={[styles.infoRow, !isLast && styles.infoRowBorder]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
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
