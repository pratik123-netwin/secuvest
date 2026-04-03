import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Building2, ExternalLink } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';
import { formatDate } from '../../utils/formatDate';

/**
 * ProductDetailsTab
 * Receives `details` prop from ProductDetailScreen:
 * { barcode, article_no, last_updated, price, supplier: { id, name } }
 */
const ProductDetailsTab = ({ details = {}, navigation }) => {
  const {
    barcode,
    article_no,
    last_updated,
    price,
    supplier,
  } = details;

  const numericPrice = price != null ? Number(price) : null;

  return (
    <ScrollView style={styles.wrapper} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Product Information */}
      <Text style={styles.sectionTitle}>{STRINGS.productInformation}</Text>
      <View style={styles.infoCard}>
        <InfoRow label={STRINGS.barcode} value={barcode ?? 'N/A'} />
        <InfoRow label={STRINGS.articleNumber} value={article_no ?? 'N/A'} />
        <InfoRow label={STRINGS.lastUpdated} value={formatDate(last_updated)} />
        <InfoRow
          label={STRINGS.price}
          value={numericPrice != null ? `$${numericPrice.toFixed(2)}` : 'N/A'}
          isLast
        />
      </View>

      {/* Supplier Link */}
      {supplier && (
        <TouchableOpacity
          style={styles.supplierCard}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('SupplierFlow', {
              screen: 'SupplierDetail',
              params: {
                supplier: {
                  id: supplier.id,
                  name: supplier.name,
                },
              },
            });
          }}
        >
          <View style={styles.supplierLeft}>
            <View style={styles.supplierIconWrap}>
              <Building2 size={18} color={COLORS.iconBlue} />
            </View>
            <View>
              <Text style={styles.supplierLabel}>{STRINGS.supplier}</Text>
              <Text style={styles.supplierName}>{supplier.name}</Text>
            </View>
          </View>
          <ExternalLink size={16} color={COLORS.textMuted} />
        </TouchableOpacity>
      )}

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

  supplierCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: COLORS.background, borderRadius: 16,
    borderWidth: 1, borderColor: COLORS.cardBorder,
    padding: 16, marginBottom: 24,
  },
  supplierLeft: { flexDirection: 'row', alignItems: 'center' },
  supplierIconWrap: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: COLORS.iconBgBlue,
    justifyContent: 'center', alignItems: 'center',
    marginRight: 12,
  },
  supplierLabel: { fontSize: 14, fontWeight: '500', color: COLORS.textPrimary, marginBottom: 2 },
  supplierName: { fontSize: 12, fontWeight: '400', color: COLORS.textLight },
});

export default ProductDetailsTab;
