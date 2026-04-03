import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useDispatch, useSelector } from 'react-redux';
import { User, Check, Mail } from 'lucide-react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import AuthHeader, { AuthFooter } from '../../components/AuthHeader';
import { validatePassword } from '../../utils/validation';
import { setCredentials, setLoading, setError as setAuthError } from '../../store/slices/authSlice';
import { loginAPI } from '../../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants/colors';

const LoginStep2 = ({ route, navigation }) => {
  const { emailOrPhone } = route.params;
  const dispatch = useDispatch();
  const { isLoading: loading, error: authError } = useSelector((state) => state.auth);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    const valError = validatePassword(password);
    if (valError) { setError(valError); return; }
    setError('');
    dispatch(setAuthError(null));
    dispatch(setLoading(true));
    try {
      const { token, user } = await loginAPI(emailOrPhone, password);
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      // TODO: Handle 30 days token expiry if needed by storing rememberMe flag or similar
      dispatch(setCredentials({ token, user }));
      dispatch(setLoading(false));
      navigation.reset({
        index: 0,
        routes: [{ name: 'RootTabs' }],
      });
    } catch (err) {
      dispatch(setLoading(false));
      // Safely parse local Javascript Error objects as well as our thrown API string messages
      const safeErrorMessage = typeof err === 'string' ? err : (err?.message || 'Authentication error.');
      dispatch(setAuthError(safeErrorMessage));
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
            value={emailOrPhone}
            editable={false}
            leftIcon={<Mail size={18} color={COLORS.textMuted} />}
          />

          <Text style={styles.accountFound}>Account found - Enter your password to continue</Text>

          <CustomInput
            label="Password *"
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => { setPassword(text); setError(''); }}
            error={error || authError}
            password
          />

          <CustomButton title="Sign In" onPress={handleLogin} loading={loading} />

          <View style={styles.checkboxRow}>
            <TouchableOpacity style={styles.checkboxContainer} onPress={() => setRememberMe(!rememberMe)} activeOpacity={0.8}>
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <Check size={13} color="#FFFFFF" />}
              </View>
              <Text style={styles.checkboxLabel}>Remember for 30 days</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword', { emailOrPhone })}>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

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
  accountFound: { color: COLORS.text, marginBottom: 15, fontSize: 12, fontWeight: '400' },
  checkboxRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, marginBottom: 24 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1.5, borderColor: '#CCCCCC', justifyContent: 'center', alignItems: 'center' },
  checkboxChecked: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  checkboxLabel: { fontSize: 14, color: COLORS.text, marginLeft: 10 },
  forgotPassword: { fontSize: 14, color: COLORS.primary, fontWeight: 'bold' },
  createAccountContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 15 },
  createAccountText: { color: COLORS.textMuted, fontSize: 14 },
  createAccountLink: { color: COLORS.primary, fontSize: 14, fontWeight: 'bold' },
});

export default LoginStep2;
