import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants/colors';

const CustomButton = ({ title, onPress, loading, disabled, style }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        (disabled || loading) && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.background} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 45,
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  disabledButton: {
    backgroundColor: COLORS.disabled,
  },
  text: {
    color: COLORS.background,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CustomButton;
