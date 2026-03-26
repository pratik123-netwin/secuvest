import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Building2, ExternalLink, MessageSquare } from 'lucide-react-native';

const ProductDetailsTab = ({ product, navigation }) => {
  return (
    <ScrollView style={styles.wrapper} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Product Information */}
      <Text style={styles.sectionTitle}>Product Information</Text>
      <View style={styles.infoCard}>
        <InfoRow label="Barcode" value={product.barcode} />
        <InfoRow label="Article Number" value={product.articleNumber} />
        <InfoRow label="Last Updated" value={product.lastUpdated} />
        <InfoRow label="Price" value={`$${product.price?.toFixed(2)}`} isLast />
      </View>

      {/* Supplier Link */}
      <TouchableOpacity
        style={styles.supplierCard}
        activeOpacity={0.7}
        onPress={() => {
          // Navigate to supplier detail if the SupplierFlow is accessible
          navigation.navigate('SupplierFlow', {
            screen: 'SupplierProfile',
            params: { supplier: { id: product.supplierId, name: product.supplierName } },
          });
        }}
      >
        <View style={styles.supplierLeft}>
          <View style={styles.supplierIconWrap}>
            <Building2 size={18} color="#175CD3" />
          </View>
          <View>
            <Text style={styles.supplierLabel}>Supplier</Text>
            <Text style={styles.supplierName}>{product.supplierName}</Text>
          </View>
        </View>
        <ExternalLink size={16} color="#717680" />
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

  sectionTitle: { fontSize: 16, fontWeight: '500', color: '#414651', marginBottom: 12 },
  infoCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16,
    borderWidth: 1, borderColor: '#EAEAED', marginBottom: 24,
  },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 },
  infoLabel: { fontSize: 12, fontWeight: '500', color: '#535862' },
  infoValue: { fontSize: 12, fontWeight: '400', color: '#181D27' },

  supplierCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#FFFFFF', borderRadius: 16,
    borderWidth: 1, borderColor: '#EAEAED',
    padding: 16, marginBottom: 24,
  },
  supplierLeft: { flexDirection: 'row', alignItems: 'center' },
  supplierIconWrap: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#D1E9FF',
    justifyContent: 'center', alignItems: 'center',
    marginRight: 12,
  },
  supplierLabel: { fontSize: 14, fontWeight: '500', color: '#181D27', marginBottom: 2 },
  supplierName: { fontSize: 12, fontWeight: '400', color: '#667085' },

});

export default ProductDetailsTab;
