import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShieldCheck } from 'lucide-react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import AuthHeader, { AuthFooter } from '../../components/AuthHeader';
import { verifyOtpAPI, resetPasswordAPI, resendOtpAPI } from '../../services/authService';
import { setCredentials } from '../../store/slices/authSlice';
import { validatePassword } from '../../utils/validation';
import { COLORS } from '../../constants/colors';

const OTPVerification = ({ route, navigation }) => {
  const emailOrPhone = route.params?.emailOrPhone || '';
  const flow = route.params?.flow || 'signup';
  const isForgotPassword = flow === 'forgotPassword';

  const [otp, setOtp] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
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

    // For forgot password flow, we need a new password
    if (isForgotPassword) {
      const pwdError = validatePassword(newPassword);
      if (pwdError) { setError(pwdError); return; }
    }

    setError('');
    setLoading(true);

    try {
      if (isForgotPassword) {
        await resetPasswordAPI(emailOrPhone, otpCode, newPassword);
        setLoading(false);
        // Reset password successful, redirect to login
        navigation.navigate('LoginStep1');
      } else {
        // Signup verify OTP
        const { token, user } = await verifyOtpAPI(emailOrPhone, otpCode);
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        dispatch(setCredentials({ token, user }));
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'RootTabs' }],
        });
      }
    } catch (err) {
      setLoading(false);
      const safeErrorMessage = typeof err === 'string' ? err : (err?.message || 'Verification failed.');
      setError(safeErrorMessage);
    }
  };

  const handleResend = async () => {
    setError('');
    try {
      await resendOtpAPI(emailOrPhone);
      setTimer(60);
    } catch (err) {
      const safeErrorMessage = typeof err === 'string' ? err : (err?.message || 'Failed to resend OTP.');
      setError(safeErrorMessage);
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '') {
      if (index < 3) {
        inputRefs.current[index + 1].focus();
      } else if (!isForgotPassword && newOtp.every(d => d !== '')) {
        // Auto-verify if it's signup. Better avoid auto-verify for forgotPassword 
        // because they also need to type the new password.
        handleVerify(newOtp.join(''));
      }
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
          title="Check your email or SMS"
          subtitle={`We sent a 4-digit OTP to ${emailOrPhone}`}
        />

        <View style={styles.form}>
          <View style={styles.otpContainer}>
            {otp.map((digit, i) => (
              <TextInput
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                style={[styles.otpInput, error && !newPassword && styles.errorInput]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(val) => handleOtpChange(val, i)}
                onKeyPress={(e) => handleKeyPress(e, i)}
              />
            ))}
          </View>

          {isForgotPassword && (
            <View style={{ width: '100%', marginBottom: 15 }}>
              <CustomInput
                label="New Password *"
                placeholder="******"
                password
                value={newPassword}
                onChangeText={(val) => { setNewPassword(val); setError(''); }}
              />
            </View>
          )}

          {!!error && <Text style={styles.errorText}>{error}</Text>}

          <CustomButton
            style={{ width: '100%' }}
            title={isForgotPassword ? "Reset Password" : "Verify OTP"}
            onPress={() => handleVerify()}
            loading={loading}
          />

          <View style={styles.resendContainer}>
            <Text style={styles.text}>Didn't receive the code? </Text>
            {timer > 0 ? (
              <Text style={styles.text}>Resend in {timer}s</Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
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
  otpInput: { width: 60, height: 60, borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, fontSize: 24, textAlign: 'center', color: COLORS.primary, backgroundColor: COLORS.surface },
  errorInput: { borderColor: COLORS.error },
  errorText: { color: COLORS.error, marginBottom: 20, textAlign: 'center' },
  resendContainer: { flexDirection: 'row', marginTop: 20, paddingBottom: 20 },
  text: { color: COLORS.textSecondary },
  link: { color: COLORS.primary, fontWeight: 'bold' },
});

export default OTPVerification;
