import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AlertCircle } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';

const ErrorState = ({ message = 'Something went wrong', onRetry }) => (
  <View style={styles.container}>
    <AlertCircle size={40} color="#EF4444" style={{ marginBottom: 16 }} />
    <Text style={styles.message}>{message}</Text>
    {onRetry && (
      <TouchableOpacity activeOpacity={0.8} style={styles.retryBtn} onPress={onRetry}>
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40, marginTop: 40 },
  message: { fontSize: 14, color: '#4B5563', textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  retryBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 20 },
  retryText: { color: '#FFFFFF', fontWeight: 'bold' }
});

export default ErrorState;
