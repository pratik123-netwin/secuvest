import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';

const SupplierChip = ({ label, onRemove }) => (
  <View style={styles.chip}>
    <Text style={styles.label} numberOfLines={1}>{label}</Text>
    {onRemove && (
      <TouchableOpacity onPress={() => { }} style={styles.closeBtn} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
        <X size={12} color="#ffffff" strokeWidth={2.5} />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: '#C2CFFF',
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginRight: 6,
  },
  label: { fontSize: 11, fontWeight: '500', color: '#FFFFFF', maxWidth: 72 },
  closeBtn: { marginLeft: 4 },
});

export default SupplierChip;
