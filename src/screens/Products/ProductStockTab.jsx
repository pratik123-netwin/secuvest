import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';

const ProductStockTab = ({ product }) => {
  return (
    <ScrollView style={styles.wrapper} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Order & Receipt History */}
      <Text style={styles.sectionTitle}>{STRINGS.orderReceiptHistory}</Text>
      <View style={styles.infoCard}>
        <InfoRow label={STRINGS.lastOrderDate} value={product.lastOrderDate} />
        <InfoRow label={STRINGS.lastOrderQuantity} value={`${product.lastOrderQty} units`} />
        <InfoRow label={STRINGS.lastReceiptDate} value={product.lastReceiptDate} />
        <InfoRow label={STRINGS.lastReceiptQuantity} value={`${product.lastReceiptQty} units`} />
        <InfoRow label={STRINGS.orderStatus} value={product.orderStatus} isLast />
      </View>

      {/* Stock Information */}
      <Text style={styles.sectionTitle}>{STRINGS.stockInformation}</Text>
      <View style={styles.infoCard}>
        <InfoRow label={STRINGS.stock} value={`${product.currentStock} units`} isLast />
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
  sectionTitle: { fontSize: 16, fontWeight: '500', color: COLORS.textTitle, marginBottom: 12 },
  infoCard: {
    backgroundColor: COLORS.background, borderRadius: 16,
    borderWidth: 1, borderColor: COLORS.cardBorder, marginBottom: 24,
  },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 },
  infoRowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.divider },
  infoLabel: { fontSize: 12, fontWeight: '500', color: COLORS.textSecondary },
  infoValue: { fontSize: 12, fontWeight: '400', color: COLORS.textPrimary },
});

export default ProductStockTab;
