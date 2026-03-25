import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { validatePassword } from '../../utils/validation';
import { login } from '../../store/slices/authSlice';
import { COLORS } from '../../constants/colors';
import { Image } from 'react-native';
import images from '../../constants/images';
import { User, Check } from 'lucide-react-native';
import BackButton from '../../components/BackButton';

const LoginStep2 = ({ route, navigation }) => {
  const { emailOrPhone } = route.params;
  const dispatch = useDispatch();
  const { loading, error: authError } = useSelector((state) => state.auth);

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    const valError = validatePassword(password);
    if (valError) {
      setError(valError);
      return;
    }
    setError('');
    dispatch(login({ emailOrPhone, password, rememberMe }));
  };

  return (
    <SafeAreaView style={styles.container}>

      <BackButton color="#000" textStyle={styles.backText} style={styles.backButton} />

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} bottomOffset={16} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View style={styles.avatarContainer}>
            <User size={44} color="#FFFFFF" />
          </View>

          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to continue to Secuvest GO</Text>

          <View style={styles.form}>
            <CustomInput
              label="Email address or Phone number *"
              value={emailOrPhone}
              editable={false}
            />

            <Text style={styles.accountFound}>Account found - Enter your password to continue</Text>

            <CustomInput
              label="Password *"
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError('');
              }}
              error={error || authError}
              password
            />

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

            <CustomButton
              title="Sign In"
              onPress={handleLogin}
              loading={loading}
            />

            <View style={styles.createAccountContainer}>
              <Text style={styles.createAccountText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.createAccountLink}>Create new account</Text>
              </TouchableOpacity>
            </View>
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
  content: { flex: 1, paddingHorizontal: 20 },
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
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.text, textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: COLORS.textSecondary, textAlign: 'center', marginBottom: 40 },
  form: { marginTop: 10 },
  accountFound: { color: COLORS.success, marginBottom: 15, fontSize: 14 },

  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: 'bold',
  },

  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  createAccountText: {
    color: '#6B7280',
    fontSize: 14,
  },
  createAccountLink: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: 'bold',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 'auto',
  },
  logo: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  footerText: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    color: '#111',
    marginLeft: 8,
  },
});

export default LoginStep2;
