import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Building2, ChevronRight } from 'lucide-react-native';
import StatusBadge from './StatusBadge';

const ProductCard = ({ product, onPress, showStatus = false }) => {
  const { name, articleNo, price, category, supplierName, image, status } = product;

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPress}>
      {/* Top row: image + name/article/price */}
      <View style={styles.topRow}>
        <View style={styles.imagePlaceholder}>
          <Building2 size={24} color="#9CA3AF" />
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <View style={styles.articleRow}>
            <Text style={styles.articleNo}>Article #: {articleNo}</Text>
            <Text style={styles.price}>${price?.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* Bottom row: category + supplier + optional badge + chevron */}
      <View style={styles.bottomRow}>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{category}</Text>
        </View>
        <View style={styles.supplierRow}>
          <Building2 size={12} color="#9CA3AF" style={{ marginRight: 4 }} />
          <Text style={styles.supplierText} numberOfLines={1}>{supplierName}</Text>
        </View>
        {showStatus && status ? (
          <StatusBadge status={status} style={{ marginLeft: 8 }} />
        ) : null}
        <ChevronRight size={18} color="#D1D5DB" style={{ marginLeft: 'auto' }} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  topRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  imagePlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textBlock: { flex: 1 },
  name: { fontSize: 15, fontWeight: '600', color: '#111827', marginBottom: 4 },
  articleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  articleNo: { fontSize: 12, color: '#6B7280' },
  price: { fontSize: 13, fontWeight: '700', color: '#111827' },
  bottomRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'nowrap' },
  pill: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 12,
  },
  pillText: { fontSize: 12, color: '#6B7280' },
  supplierRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  supplierText: { fontSize: 12, color: '#6B7280' },
});

export default ProductCard;
