import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * ProfileInfoRow — Reusable contact info row with icon, label, and value.
 *
 * Props:
 *   icon    — JSX icon element (lucide-react-native icon at size 18)
 *   label   — row heading (e.g. "Email")
 *   value   — row value text (e.g. "john@example.com")
 */
const ProfileInfoRow = ({ icon, label, value }) => (
  <View style={styles.row}>
    <View style={styles.iconWrap}>{icon}</View>
    <View style={styles.textBlock}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} numberOfLines={1}>{value || '—'}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAEAED',
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 10,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#EAEAED',
  },
  textBlock: { flex: 1 },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#181D27',
    marginBottom: 2,
  },
  value: {
    fontSize: 12,
    color: '#535862',
    fontWeight: '400',
  },
});

export default ProfileInfoRow;
