import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButton';
import { verifyOtpAPI } from '../../services/authService';
import { restoreToken } from '../../store/slices/authSlice';
import { COLORS } from '../../constants/colors';
import { Image } from 'react-native';
import images from '../../constants/images';
import { ShieldCheck } from 'lucide-react-native';
import BackButton from '../../components/BackButton';

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
    if (timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async (autoSubmitCode = null) => {
    const otpCode = typeof autoSubmitCode === 'string' ? autoSubmitCode : otp.join('');
    if (otpCode.length < 4) {
      setError('Please enter a 4-digit OTP');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await verifyOtpAPI(otpCode);
      const mockToken = 'mock-jwt-token-789';
      const mockUser = { email: emailOrPhone };
      await AsyncStorage.setItem('token', mockToken);
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      dispatch(restoreToken({ token: mockToken, user: mockUser }));
    } catch (err) {
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
      if (index < 3) {
        inputRefs.current[index + 1].focus();
      } else {
        if (newOtp.every(d => d !== '')) {
          handleVerify(newOtp.join(''));
        }
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
      
      <BackButton color="#000" textStyle={styles.backText} style={styles.backButton} />

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} bottomOffset={16} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View style={styles.avatarContainer}>
            <ShieldCheck size={44} color="#FFFFFF" />
          </View>

          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.subtitle}>We sent a 4 digit OTP to {emailOrPhone}</Text>
          
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
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
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

        <View style={styles.footer}>
          <Image source={images.secuvestLogo} style={styles.logo} />
          <Text style={styles.footerText}>SECUVEST</Text>
        </View>
      </KeyboardAwareScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingLeft: 20,
    zIndex: 10,
  },
  backText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 6,
  },
  content: { flex: 1, paddingHorizontal: 20, alignItems: 'center' },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 22,
    backgroundColor: '#4F46E5',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.text, marginBottom: 10 },
  subtitle: { fontSize: 16, color: COLORS.textSecondary, textAlign: 'center', marginBottom: 40 },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginBottom: 20 },
  otpInput: { width: 60, height: 60, borderWidth: 1, borderColor: COLORS.primary, borderRadius: 8, fontSize: 24, textAlign: 'center', color: COLORS.primary, backgroundColor: COLORS.surface },
  errorInput: { borderColor: COLORS.error },
  errorText: { color: COLORS.error, marginBottom: 20 },
  resendContainer: { flexDirection: 'row', marginTop: 20 },
  text: { color: COLORS.textSecondary },
  link: { color: COLORS.primary, fontWeight: 'bold' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 'auto',
  },
  logo: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    color: '#111',
    marginLeft: 8,
  },
});

export default OTPVerification;
