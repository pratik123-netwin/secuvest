import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { validateName, validateEmailOrPhone, validatePassword } from '../../utils/validation';
import { COLORS } from '../../constants/colors';
import { User, Mail } from 'lucide-react-native';
import AuthHeader, { AuthFooter } from '../../components/AuthHeader';

const Signup = ({ navigation }) => {
  const [form, setForm] = useState({ name: '', day: '', month: '', year: '', gender: '', emailOrPhone: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateForm = (key, value) => setForm({ ...form, [key]: value });

  const handleSignup = () => {
    const newErrors = {
      name: validateName(form.name),
      email: validateEmailOrPhone(form.emailOrPhone),
      password: validatePassword(form.password),
      dob: (!form.day || !form.month || !form.year) ? 'Required' : null,
      gender: !form.gender ? 'Required' : null
    };

    if (Object.values(newErrors).some(err => err)) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    // Simulate API call and redirect to OTP Verification instead of logging in
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('OTPVerification', { emailOrPhone: form.emailOrPhone });
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} bottomOffset={16} contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }} keyboardShouldPersistTaps="handled">

        <AuthHeader
          icon={<User size={44} color="#FFFFFF" />}
          title="Create a new account"
          subtitle="It's quick and easy."
        />

        <View style={styles.formContainer}>
          <CustomInput
            label="Full Name *"
            placeholder="Enter your name"
            value={form.name}
            onChangeText={(t) => updateForm('name', t)}
            error={errors.name}
          />

          <Text style={styles.label}>Date Of Birth</Text>
          <View style={styles.row}>
            <View style={styles.flexItem}>
              <CustomInput placeholder="Day" value={form.day} onChangeText={(t) => updateForm('day', t)} keyboardType="number-pad" maxLength={2} error={errors.dob} />
            </View>
            <View style={styles.spacer} />
            <View style={styles.flexItem}>
              <CustomInput placeholder="Month" value={form.month} onChangeText={(t) => updateForm('month', t)} keyboardType="number-pad" maxLength={2} />
            </View>
            <View style={styles.spacer} />
            <View style={styles.flexItem}>
              <CustomInput placeholder="Year" value={form.year} onChangeText={(t) => updateForm('year', t)} keyboardType="number-pad" maxLength={4} />
            </View>
          </View>

          <Text style={styles.label}>Gender *</Text>
          <TouchableOpacity
            style={[styles.picker, errors.gender && styles.pickerError]}
            onPress={() => setShowGenderPicker(!showGenderPicker)}
          >
            <Text style={{ color: form.gender ? COLORS.text : COLORS.textSecondary }}>
              {form.gender || 'Select Gender'}
            </Text>
          </TouchableOpacity>
          {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

          {showGenderPicker && (
            <View style={styles.optionsList}>
              {['Male', 'Female', 'Other'].map(option => (
                <TouchableOpacity key={option} onPress={() => { updateForm('gender', option); setShowGenderPicker(false); }} style={styles.option}>
                  <Text>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={{ height: 10 }} />

          <CustomInput
            label="Email address or Phone number *"
            placeholder="Enter your email or Phone Number"
            leftIcon={<Mail size={18} color={COLORS.textMuted} />}
            value={form.emailOrPhone}
            onChangeText={(t) => updateForm('emailOrPhone', t)}
            error={errors.email}
            autoCapitalize="none"
          />

          <CustomInput
            label="Password *"
            placeholder="******"
            value={form.password}
            onChangeText={(t) => updateForm('password', t)}
            error={errors.password}
            password
          />

          <CustomButton title="Sign Up" onPress={handleSignup} loading={loading} />

          <View style={styles.linkContainer}>
            <Text style={styles.text}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginStep1')}>
              <Text style={styles.link}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>

        <AuthFooter />

      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: { marginTop: 4, paddingHorizontal: 20 },
  label: { marginBottom: 8, fontSize: 14, color: COLORS.text, fontWeight: '500' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  flexItem: { flex: 1 },
  spacer: { width: 10 },
  picker: { height: 55, backgroundColor: COLORS.inputBackground, justifyContent: 'center', paddingHorizontal: 15, borderRadius: 999, borderWidth: 1, borderColor: COLORS.border, marginBottom: 5 },
  pickerError: { borderColor: COLORS.error },
  errorText: { color: COLORS.error, fontSize: 12, marginBottom: 15 },
  optionsList: { backgroundColor: COLORS.surface, borderRadius: 8, elevation: 2, marginBottom: 15 },
  option: { padding: 15, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  linkContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20, marginBottom: 40 },
  text: { color: COLORS.textSecondary },
  link: { color: COLORS.primary, fontWeight: 'bold' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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

export default Signup;
