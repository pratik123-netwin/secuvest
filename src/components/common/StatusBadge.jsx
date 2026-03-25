import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const STATUS_MAP = {
  'Ranged':       { bg: '#DCFCE7', border: '#BBF7D0', text: '#16A34A' },
  'De-ranged':    { bg: '#FEE2E2', border: '#FECACA', text: '#DC2626' },
  'In Stock':     { bg: '#DCFCE7', border: '#BBF7D0', text: '#16A34A' },
  'Out of Stock': { bg: '#FEE2E2', border: '#FECACA', text: '#DC2626' },
  'Low Stock':    { bg: '#FFFBEB', border: '#FDE68A', text: '#D97706' },
  'Active':       { bg: '#DBEAFE', border: '#BFDBFE', text: '#2563EB' },
  'Inactive':     { bg: '#F3F4F6', border: '#E5E7EB', text: '#6B7280' },
};

const StatusBadge = ({ status, label, style }) => {
  const config = STATUS_MAP[status] || { bg: '#F3F4F6', border: '#E5E7EB', text: '#6B7280' };
  return (
    <View style={[styles.badge, { backgroundColor: config.bg, borderColor: config.border }, style]}>
      <Text style={[styles.label, { color: config.text }]}>{label || status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  }
});

export default StatusBadge;
