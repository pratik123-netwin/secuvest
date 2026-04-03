import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckCircle2, XCircle, Layers, AlertTriangle } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';

/**
 * StatusCard — Reusable colored summary card matching the MetricsDrilldown style.
 *
 * Props:
 *  label       — card heading (e.g. "Stock Status")
 *  value       — value text (e.g. "In Stock")
 *  type        — 'stock' | 'range'   → determines icon set
 *  variant     — 'green' | 'red' | 'amber'  → controls colors
 *               Inferred automatically from value if not provided.
 */

// Infer variant from value string
const inferVariant = (value = '', type = 'stock') => {
  const v = value.toLowerCase();
  if (type === 'stock') {
    if (v.includes('out')) return 'red';
    if (v.includes('low')) return 'amber';
    return 'green';  // "in stock"
  }
  if (type === 'range') {
    if (v.includes('de-rang') || v.includes('derang') || v.includes('de_ranged')) return 'red';
    return 'green';  // "on range" / "ranged"
  }
  return 'green';
};

const VARIANTS = {
  green: { bg: COLORS.stockGreenBg, border: COLORS.stockGreenBorder, color: COLORS.stockGreen },
  amber: { bg: COLORS.stockAmberBg, border: COLORS.stockAmberBorder, color: COLORS.stockAmber },
  red: { bg: COLORS.stockRedBg, border: COLORS.stockRedBorder, color: COLORS.stockRed },
};

const StatusCard = ({ label, value, type = 'stock', variant }) => {
  const resolvedVariant = variant || inferVariant(value, type);
  const { bg, border, color } = VARIANTS[resolvedVariant] || VARIANTS.green;

  const Icon = () => {
    if (type === 'range') return <Layers size={16} color={color} />;
    if (resolvedVariant === 'red') return <XCircle size={16} color={color} />;
    if (resolvedVariant === 'amber') return <AlertTriangle size={16} color={color} />;
    return <CheckCircle2 size={16} color={color} />;
  };

  return (
    <View style={[styles.card, { backgroundColor: bg, borderColor: border }]}>
      <View style={styles.topRow}>
        <Text style={styles.label}>{label}</Text>
        <Icon />
      </View>
      <Text style={[styles.value, { color }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default StatusCard;
