import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({ onPress, style, color = '#6B7280', textStyle, disabled = false }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      style={[styles.button, style]} 
      activeOpacity={0.7}
      disabled={disabled}
    >
      <ArrowLeft size={16} color={color} />
      <Text style={[styles.text, { color }, textStyle]}>Back</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
  },
  text: {
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '500',
  }
});

export default BackButton;
