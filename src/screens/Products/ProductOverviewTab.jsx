import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MessageSquare } from 'lucide-react-native';
import StatusCard from '../../components/common/StatusCard';

const ProductOverviewTab = ({ product }) => {
  return (
    <ScrollView style={styles.wrapper} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Status Cards Row */}
      <View style={styles.cardRow}>
        <StatusCard
          label="Stock Status"
          value={product.stockStatus}
          type="stock"
        />
        <StatusCard
          label="Range Status"
          value={product.rangeStatus}
          type="range"
        />
      </View>

      {/* Sales Performance */}
      <Text style={styles.sectionTitle}>Sales Performance</Text>
      <View style={styles.infoCard}>
        <InfoRow label="Rate of Sale" value={`${product.rateOfSale} units/day`} />
        <InfoRow label="Last Sold" value={product.lastSold} isLast />
      </View>
    </ScrollView>
  );
};

const InfoRow = ({ label, value, isLast }) => (
  <View style={[styles.infoRow, !isLast]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 40 },

  cardRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },

  sectionTitle: { fontSize: 16, fontWeight: '500', color: '#414651', marginBottom: 12 },
  infoCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16,
    borderWidth: 1, borderColor: '#EAEAED', marginBottom: 24,
  },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 },

  infoLabel: { fontSize: 12, fontWeight: '500', color: '#535862' },
  infoValue: { fontSize: 12, fontWeight: '400', color: '#535862' },
});

export default ProductOverviewTab;
