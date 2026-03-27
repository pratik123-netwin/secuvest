import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Building2, ExternalLink } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';

const ProductDetailsTab = ({ product, navigation }) => {
  return (
    <ScrollView style={styles.wrapper} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Product Information */}
      <Text style={styles.sectionTitle}>{STRINGS.productInformation}</Text>
      <View style={styles.infoCard}>
        <InfoRow label={STRINGS.barcode} value={product.barcode} />
        <InfoRow label={STRINGS.articleNumber} value={product.articleNumber} />
        <InfoRow label={STRINGS.lastUpdated} value={product.lastUpdated} />
        <InfoRow label={STRINGS.price} value={`$${product.price?.toFixed(2)}`} isLast />
      </View>

      {/* Supplier Link */}
      <TouchableOpacity
        style={styles.supplierCard}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('SupplierFlow', {
            screen: 'SupplierProfile',
            params: { supplier: { id: product.supplierId, name: product.supplierName } },
          });
        }}
      >
        <View style={styles.supplierLeft}>
          <View style={styles.supplierIconWrap}>
            <Building2 size={18} color={COLORS.iconBlue} />
          </View>
          <View>
            <Text style={styles.supplierLabel}>{STRINGS.supplier}</Text>
            <Text style={styles.supplierName}>{product.supplierName}</Text>
          </View>
        </View>
        <ExternalLink size={16} color={COLORS.textMuted} />
      </TouchableOpacity>

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
