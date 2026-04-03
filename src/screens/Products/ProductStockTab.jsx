import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';
import { formatDate } from '../../utils/formatDate';

/**
 * ProductStockTab
 * Receives `stock` prop from ProductDetailScreen:
 * { last_order_date, last_order_qty, last_receipt_date,
 *   last_receipt_qty, order_status, stock_quantity,
 *   reorder_level, last_restocked }
 */
const ProductStockTab = ({ stock = {} }) => {
  const {
    last_order_date,
    last_order_qty,
    last_receipt_date,
    last_receipt_qty,
    order_status,
    stock_quantity,
    reorder_level,
    last_restocked,
  } = stock;

  return (
    <ScrollView style={styles.wrapper} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Order & Receipt History */}
      <Text style={styles.sectionTitle}>{STRINGS.orderReceiptHistory}</Text>
      <View style={styles.infoCard}>
        <InfoRow label={STRINGS.lastOrderDate} value={formatDate(last_order_date)} />
        <InfoRow label={STRINGS.lastOrderQuantity} value={last_order_qty != null ? `${last_order_qty} units` : 'N/A'} />
        <InfoRow label={STRINGS.lastReceiptDate} value={formatDate(last_receipt_date)} />
        <InfoRow label={STRINGS.lastReceiptQuantity} value={last_receipt_qty != null ? `${last_receipt_qty} units` : 'N/A'} />
        <InfoRow label={STRINGS.orderStatus} value={order_status ?? 'N/A'} isLast />
      </View>

      {/* Stock Information */}
      <Text style={styles.sectionTitle}>{STRINGS.stockInformation}</Text>
      <View style={styles.infoCard}>
        <InfoRow label={STRINGS.stock} value={stock_quantity != null ? `${stock_quantity} units` : 'N/A'} isLast />
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
