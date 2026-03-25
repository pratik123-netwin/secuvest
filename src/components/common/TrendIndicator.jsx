import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';

const TrendIndicator = ({ value, isUp, unit = '' }) => {
  const color = isUp ? '#16A34A' : '#DC2626';
  const Icon = isUp ? TrendingUp : TrendingDown;
  return (
    <View style={styles.container}>
      <Icon size={14} color={color} strokeWidth={2} />
      <Text style={[styles.value, { color }]}>{value}{unit}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  value: { fontSize: 12, fontWeight: '600' },
});

export default TrendIndicator;
