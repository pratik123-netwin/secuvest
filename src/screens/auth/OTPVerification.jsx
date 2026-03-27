import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShieldCheck } from 'lucide-react-native';
import CustomButton from '../../components/CustomButton';
import AuthHeader, { AuthFooter } from '../../components/AuthHeader';
import { verifyOtpAPI } from '../../services/authService';
import { restoreToken } from '../../store/slices/authSlice';
import { COLORS } from '../../constants/colors';

const OTPVerification = ({ route, navigation }) => {
  const emailOrPhone = route.params?.emailOrPhone || 'eric@secuvest.com';
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const inputRefs = useRef([]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async (autoSubmitCode = null) => {
    const otpCode = typeof autoSubmitCode === 'string' ? autoSubmitCode : otp.join('');
    if (otpCode.length < 4) { setError('Please enter a 4-digit OTP'); return; }
    setError('');
    setLoading(true);
    try {
      await verifyOtpAPI(otpCode);
      const mockToken = 'mock-jwt-token-789';
      const mockUser = { email: emailOrPhone };
      await AsyncStorage.setItem('token', mockToken);
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      dispatch(restoreToken({ token: mockToken, user: mockUser }));
    } catch {
      setError('Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '') {
      if (index < 3) inputRefs.current[index + 1].focus();
      else if (newOtp.every(d => d !== '')) handleVerify(newOtp.join(''));
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bottomOffset={16}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <AuthHeader
          icon={<ShieldCheck size={44} color="#FFFFFF" />}
          title="Check your email"
          subtitle={`We sent a 4 digit OTP to ${emailOrPhone}`}
        />

        <View style={styles.form}>
          <View style={styles.otpContainer}>
            {otp.map((digit, i) => (
              <TextInput
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                style={[styles.otpInput, error && styles.errorInput]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(val) => handleOtpChange(val, i)}
                onKeyPress={(e) => handleKeyPress(e, i)}
              />
            ))}
          </View>

          {!!error && <Text style={styles.errorText}>{error}</Text>}

          <CustomButton style={{ width: '100%' }} title="Verify Email" onPress={handleVerify} loading={loading} />

          <View style={styles.resendContainer}>
            <Text style={styles.text}>Didn't receive the email? </Text>
            {timer > 0 ? (
              <Text style={styles.text}>Resend in {timer}s</Text>
            ) : (
              <TouchableOpacity onPress={() => setTimer(60)}>
                <Text style={styles.link}>Click to resend</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <AuthFooter />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  form: { paddingHorizontal: 20, alignItems: 'center', marginTop: 4 },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginBottom: 20 },
  otpInput: { width: 60, height: 60, borderWidth: 1, borderColor: COLORS.primary, borderRadius: 8, fontSize: 24, textAlign: 'center', color: COLORS.primary, backgroundColor: COLORS.surface },
  errorInput: { borderColor: COLORS.error },
  errorText: { color: COLORS.error, marginBottom: 20 },
  resendContainer: { flexDirection: 'row', marginTop: 20 },
  text: { color: COLORS.textSecondary },
  link: { color: COLORS.primary, fontWeight: 'bold' },
});

export default OTPVerification;
