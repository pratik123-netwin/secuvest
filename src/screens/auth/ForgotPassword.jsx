import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Lock, Mail } from 'lucide-react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import AuthHeader, { AuthFooter } from '../../components/AuthHeader';
import { validateEmailOrPhone } from '../../utils/validation';
import { forgotPasswordAPI } from '../../services/authService';
import { COLORS } from '../../constants/colors';

const ForgotPassword = ({ route, navigation }) => {
  const initialEmailOrPhone = route.params?.emailOrPhone || '';
  const [emailOrPhone, setEmailOrPhone] = useState(initialEmailOrPhone);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSend = async () => {
    const valError = validateEmailOrPhone(emailOrPhone);
    if (valError) { setError(valError); return; }
    setError('');
    setLoading(true);
    try {
      await forgotPasswordAPI(emailOrPhone);
      setSuccess(true);
    } catch {
      setError('Failed to send reset instructions. Please try again.');
    } finally {
      setLoading(false);
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
          icon={<Lock size={40} color="#FFFFFF" />}
          title="Reset your password"
          subtitle={"Enter your email or phone number and we'll\nsend you a code to reset your password."}
        />

        {success ? (
          <View style={styles.form}>
            <Text style={styles.successText}>Instructions sent! Check your inbox or SMS.</Text>
            <CustomButton title="Back to Login" onPress={() => navigation.navigate('LoginStep1')} />
          </View>
        ) : (
          <View style={styles.form}>
            <CustomInput
              label="Email address or Phone number *"
              placeholder="Enter your email or Phone Number"
              leftIcon={<Mail size={18} color={COLORS.textMuted} />}
              value={emailOrPhone}
              onChangeText={(text) => { setEmailOrPhone(text); setError(''); }}
              error={error}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <CustomButton title="Send Verification Code" onPress={handleSend} loading={loading} />
            <View style={styles.divider} />
            <View style={styles.createAccountContainer}>
              <Text style={styles.createAccountText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.createAccountLink}>Create new account</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <AuthFooter />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  form: { paddingHorizontal: 20, marginTop: 4 },
  divider: { height: 1, backgroundColor: COLORS.border, marginTop: 20, marginBottom: 20 },
  createAccountContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  createAccountText: { color: COLORS.textMuted, fontSize: 14 },
  createAccountLink: { color: COLORS.primary, fontSize: 14, fontWeight: '600' },
  successText: { color: COLORS.success, fontSize: 15, marginBottom: 20, textAlign: 'center', lineHeight: 22 },
});

export default ForgotPassword;
