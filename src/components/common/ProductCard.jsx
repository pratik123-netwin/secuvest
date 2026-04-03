import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight, Truck, TrendingUp, TrendingDown } from 'lucide-react-native';
import StatusBadge from './StatusBadge';

/**
 * ProductCard — shared product card used across Supplier module screens.
 *
 * Props:
 *  product       — product object (name, articleNo, price, category, supplierName, image, status)
 *  onPress       — tap handler
 *  showStatus    — show the status badge (uses product.status)
 *  badgeLabel    — override badge label (e.g. stockStatus, trend)
 *  badgeStatus   — override badge status key for colour lookup
 *  detailRows    — array of { label, value } to render between top and bottom rows
 *                  e.g. [{ label: 'Current Stock', value: '10 units' }, ...]
 */
const ProductCard = ({ product, onPress, showStatus = false, badgeLabel, badgeStatus, detailRows }) => {
  const { name, sku, price, category, image_url, range_status, supplier } = product;

  const articleNo = sku || product.articleNo;
  const image = image_url || product.image;
  const status = range_status || product.status;
  const supplierName = supplier?.name || product.supplierName;
  const numericPrice = price ? Number(price) : 0;

  const effectiveBadgeStatus = badgeStatus || status;
  const effectiveBadgeLabel = badgeLabel || status;

  // Determine if it's a trend badge (needs icon)
  const isTrend = effectiveBadgeStatus === 'Trending Up' || effectiveBadgeStatus === 'Declining';

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPress}>
      {/* ── Top row: image + name / article# / price ── */}
      <View style={styles.topRow}>
        {image ? (
          <Image source={{ uri: image }} style={styles.productImage} />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
        <View style={styles.textBlock}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <View style={styles.articleRow}>
            <Text style={styles.articleNo}>Article #: {articleNo}</Text>
            <Text style={styles.price}>${numericPrice.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* ── Optional detail rows (Stock / Sales fields) ── */}
      {detailRows && detailRows.map((row, i) => (
        <View key={i} style={styles.detailRow}>
          <Text style={styles.detailLabel}>{row.label}</Text>
          <Text style={styles.detailValue}>{row.value}</Text>
        </View>
      ))}

      {/* ── Bottom row: category pill + supplier pill + badge + chevron ── */}
      <View style={styles.bottomRow}>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{category}</Text>
        </View>
        <View style={styles.supplierRow}>
          <Truck size={12} color="#9CA3AF" style={{ marginRight: 4 }} />
          <Text style={styles.supplierText} numberOfLines={1}>{supplierName}</Text>
        </View>

        {(showStatus || badgeLabel) && effectiveBadgeStatus ? (
          isTrend ? (
            <TrendBadge trend={effectiveBadgeStatus} />
          ) : (
            <StatusBadge status={effectiveBadgeStatus} label={effectiveBadgeLabel} />
          )
        ) : null}

        <ChevronRight size={18} color="#D1D5DB" />
      </View>
    </TouchableOpacity>
  );
};

/* ── Trend badge (Trending Up / Declining) with icon ── */
const TREND_STYLES = {
  'Trending Up': { color: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0' },
  'Declining': { color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
};

const TrendBadge = ({ trend }) => {
  const s = TREND_STYLES[trend] || TREND_STYLES['Declining'];
  const isUp = trend === 'Trending Up';
  return (
    <View style={[styles.trendBadge, { backgroundColor: s.bg, borderColor: s.border }]}>
      {isUp
        ? <TrendingUp size={11} color={s.color} />
        : <TrendingDown size={11} color={s.color} />}
      <Text style={[styles.trendText, { color: s.color }]}>{trend}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAED',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },

  // Top row
  topRow: {
    flexDirection: 'row', alignItems: 'center', padding: 14, paddingBottom: 10, borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  productImage: {
    width: 52, height: 52, borderRadius: 10,
    backgroundColor: '#F3F4F6', marginRight: 12,
  },
  imagePlaceholder: {
    width: 52, height: 52, borderRadius: 10,
    backgroundColor: '#F3F4F6', marginRight: 12,
  },
  textBlock: { flex: 1 },
  name: { fontSize: 14, fontWeight: '500', color: '#111827', marginBottom: 4 },
  articleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  articleNo: { fontSize: 12, color: '#6B7280' },
  price: { fontSize: 12, fontWeight: '500', color: '#111827' },

  // Detail rows (Stock / Sales)
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 5,

  },
  detailLabel: { fontSize: 13, color: '#6B7280' },
  detailValue: { fontSize: 13, fontWeight: '400', color: '#111827' },

  // Bottom row
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: 3
  },
  pill: {
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#EAEAED',
    flexShrink: 0,
    marginRight: 6,
  },
  pillText: { fontSize: 12, color: '#6B7280' },
  supplierRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#EAEAED',
    // takes remaining space, truncates long names
    flex: 1,
    minWidth: 0,
    marginRight: 6,
  },
  supplierText: { fontSize: 12, color: '#6B7280', flexShrink: 1 },

  // Trend badge
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
  },
  trendText: { fontSize: 11, fontWeight: '600' },
});

export default ProductCard;
