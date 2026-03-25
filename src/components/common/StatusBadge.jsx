import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const STATUS_MAP = {
  'Ranged':       { bg: '#DCFCE7', text: '#16A34A' },
  'De-ranged':    { bg: '#FEE2E2', text: '#DC2626' },
  'In Stock':     { bg: '#DCFCE7', text: '#16A34A' },
  'Out of Stock': { bg: '#FEE2E2', text: '#DC2626' },
  'Active':       { bg: '#DBEAFE', text: '#2563EB' },
  'Inactive':     { bg: '#F3F4F6', text: '#6B7280' },
};

const StatusBadge = ({ status, style }) => {
  const config = STATUS_MAP[status] || { bg: '#F3F4F6', text: '#6B7280' };
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }, style]}>
      <Text style={[styles.label, { color: config.text }]}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  }
});

export default StatusBadge;
