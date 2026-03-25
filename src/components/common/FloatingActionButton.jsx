import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const FloatingActionButton = ({ text, onPress, isVisible = true }) => {
  if (!isVisible) return null;

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.fab} onPress={onPress}>
      <Text style={styles.fabText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: COLORS.primary, // Matches deep blue mapping '#4F46E5'
    borderRadius: 30,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  }
});

export default FloatingActionButton;
