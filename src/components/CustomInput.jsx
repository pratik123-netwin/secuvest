import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { Eye, EyeOff } from 'lucide-react-native';

const CustomInput = ({
  label,
  error,
  password,
  leftIcon,
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[
        styles.inputContainer,
        { borderColor: error ? COLORS.error : isFocused ? COLORS.primary : COLORS.border }
      ]}>
        {leftIcon && (
          <View style={styles.leftIconWrap}>
            {leftIcon}

          </View>
        )}
        <TextInput
          style={styles.input}
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={COLORS.textSecondary}
          {...props}
        />
        {password && (
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            {hidePassword ? (
              <Eye style={styles.icon} color={styles.icon.color} size={styles.icon.fontSize} />
            ) : (
              <EyeOff style={styles.icon} color={styles.icon.color} size={styles.icon.fontSize} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  inputContainer: {
    height: 45,
    backgroundColor: COLORS.inputBackground,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 999,
    alignItems: 'center',
  },
  input: {
    color: COLORS.text,
    flex: 1,
    fontSize: 14,
  },
  leftIconWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  leftIconDivider: {
    width: 1,
    height: 18,
    backgroundColor: COLORS.border,
    marginLeft: 10,
  },
  icon: {
    marginLeft: 10,
    color: COLORS.textSecondary,
    fontSize: 22,
  },
  errorText: {
    marginTop: 7,
    color: COLORS.error,
    fontSize: 12,
  },
});

export default CustomInput;
