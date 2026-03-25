import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { validateEmailOrPhone } from '../../utils/validation';
import { forgotPasswordAPI } from '../../services/authService';
import { COLORS } from '../../constants/colors';
import { Image } from 'react-native';
import images from '../../constants/images';
import { Lock } from 'lucide-react-native';
import BackButton from '../../components/BackButton';

const ForgotPassword = ({ route, navigation }) => {
  const initialEmailOrPhone = route.params?.emailOrPhone || '';
  const [emailOrPhone, setEmailOrPhone] = useState(initialEmailOrPhone);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSend = async () => {
    const valError = validateEmailOrPhone(emailOrPhone);
    if (valError) {
      setError(valError);
      return;
    }
    setError('');
    setLoading(true);

    try {
      await forgotPasswordAPI(emailOrPhone);
      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset instructions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <BackButton color="#000" textStyle={styles.backText} style={styles.backButton} />

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} bottomOffset={16} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View style={styles.avatarContainer}>
            <Lock size={44} color="#FFFFFF" />
          </View>

          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>Enter your email or phone to reset your password.</Text>

          {success ? (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>Instructions sent! Check your inbox or SMS.</Text>
              <CustomButton
                title="Back to Login"
                onPress={() => navigation.navigate('LoginStep1')}
              />
            </View>
          ) : (
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
                title="Send"
                onPress={handleSend}
                loading={loading}
              />
            </View>
          )}
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
  successContainer: { marginTop: 20, alignItems: 'center' },
  successText: { color: COLORS.success, fontSize: 16, marginBottom: 20, textAlign: 'center' },
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

export default ForgotPassword;
