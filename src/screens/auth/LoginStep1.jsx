import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { User, Mail } from 'lucide-react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import AuthHeader, { AuthFooter } from '../../components/AuthHeader';
import { validateEmailOrPhone } from '../../utils/validation';
import { COLORS } from '../../constants/colors';
import { checkIdentifier } from '../../services/authService';

const LoginStep1 = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    const valError = validateEmailOrPhone(emailOrPhone);
    if (valError) { setError(valError); return; }
    setError('');
    try {
      setLoading(true);
      await checkIdentifier(emailOrPhone);
      setLoading(false);
      navigation.navigate('LoginStep2', { emailOrPhone });
    } catch (err) {
      setLoading(false);
      setError(err);
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
          icon={<User size={44} color="#FFFFFF" />}
          title="Welcome back"
          subtitle="Sign in to continue to Secuvest GO"
        />

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

          <CustomButton title="Continue" onPress={handleContinue} loading={loading} />

          <View style={styles.divider} />

          <View style={styles.createAccountContainer}>
            <Text style={styles.createAccountText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.createAccountLink}>Create new account</Text>
            </TouchableOpacity>
          </View>
        </View>

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
});

export default LoginStep1;
