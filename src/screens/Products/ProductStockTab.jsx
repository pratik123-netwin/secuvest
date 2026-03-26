import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MessageSquare } from 'lucide-react-native';

const ProductStockTab = ({ product }) => {
  return (
    <ScrollView style={styles.wrapper} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Order & Receipt History */}
      <Text style={styles.sectionTitle}>Order & Receipt History</Text>
      <View style={styles.infoCard}>
        <InfoRow label="Last Order Date" value={product.lastOrderDate} />
        <InfoRow label="Last Order Quantity" value={`${product.lastOrderQty} units`} />
        <InfoRow label="Last Receipt Date" value={product.lastReceiptDate} />
        <InfoRow label="Last Receipt Quantity" value={`${product.lastReceiptQty} units`} />
        <InfoRow label="Order Status" value={product.orderStatus} isLast />
      </View>

      {/* Stock Information */}
      <Text style={styles.sectionTitle}>Stock Information</Text>
      <View style={styles.infoCard}>
        <InfoRow label="Stock" value={`${product.currentStock} units`} isLast />
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

  sectionTitle: { fontSize: 16, fontWeight: '500', color: '#414651', marginBottom: 12 },
  infoCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16,
    borderWidth: 1, borderColor: '#EAEAED', marginBottom: 24,
  },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 },
  infoLabel: { fontSize: 12, fontWeight: '500', color: '#535862' },
  infoValue: { fontSize: 12, fontWeight: '400', color: '#181D27' },
});

export default ProductStockTab;
