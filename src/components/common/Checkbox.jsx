import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';

const Checkbox = ({ isChecked, onToggle, size = 20, activeColor = COLORS.primary, inactiveColor = '#D1D5DB' }) => {
  return (
    <TouchableOpacity 
      onPress={onToggle} 
      activeOpacity={0.8} 
      style={[
        styles.container, 
        { 
          width: size, 
          height: size, 
          borderColor: isChecked ? activeColor : inactiveColor, 
          backgroundColor: isChecked ? activeColor : 'transparent' 
        }
      ]}
    >
      {isChecked && <Check size={size * 0.7} color="#FFFFFF" strokeWidth={3} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Checkbox;
