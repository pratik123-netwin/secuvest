import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { validateEmailOrPhone } from '../../utils/validation';
import { COLORS } from '../../constants/colors';
import { Image } from 'react-native';
import images from '../../constants/images';
import { User } from 'lucide-react-native';
import BackButton from '../../components/BackButton';

const LoginStep1 = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    const valError = validateEmailOrPhone(emailOrPhone);
    if (valError) {
      setError(valError);
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('LoginStep2', { emailOrPhone });
    }, 800);
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
              placeholder="Enter your email or phone number"
              value={emailOrPhone}
              onChangeText={(text) => {
                setEmailOrPhone(text);
                setError('');
              }}
              error={error}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <CustomButton
              title="Continue"
              onPress={handleContinue}
              loading={loading}
            />

            <View style={styles.divider} />

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
    width: 96,
    height: 96,
    borderRadius: 22,
    backgroundColor: '#4F46E5',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  title: { fontSize: 16, fontWeight: '700', color: COLORS.text, textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', marginBottom: 40 },
  form: { marginTop: 10 },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 20,
    marginBottom: 20,
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 24,
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

export default LoginStep1;
