import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowUpRight } from 'lucide-react-native';

const MetricCard = ({ title, onPress }) => (
  <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPress}>
    <View style={styles.titleRow}>
      <Text style={styles.title}>{title}</Text>
      <ArrowUpRight size={16} color="#9CA3AF" />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 15, fontWeight: '700', color: '#111827' },
});

export default MetricCard;
