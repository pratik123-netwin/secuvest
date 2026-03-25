import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';

const SupplierChip = ({ label, onRemove }) => (
  <View style={styles.chip}>
    <Text style={styles.label} numberOfLines={1}>{label}</Text>
    {onRemove && (
      <TouchableOpacity onPress={onRemove} style={styles.closeBtn} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
        <X size={12} color="#6B7280" strokeWidth={2.5} />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  label: { fontSize: 13, fontWeight: '500', color: '#4338CA', maxWidth: 100 },
  closeBtn: { marginLeft: 6 },
});

export default SupplierChip;
