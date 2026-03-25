import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Zap, Shield, Settings, Snowflake } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { Image } from 'react-native';
import images from '../../constants/images';

const { height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Secuvest</Text>
          <Text style={styles.heroSubtitle}>Go</Text>

          <View style={styles.heroBottomTextContainer}>
            <Text style={styles.heroBottomTitle}>Power in your hand</Text>
            <Text style={styles.heroBottomDesc}>
              Streamline field operations with tools built for speed, clarity and security.
            </Text>
          </View>
        </View>

        {/* Feature List */}
        <View style={styles.featureList}>
          <View style={styles.featureRow}>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Quick Actions</Text>
              <Text style={styles.featureDesc}>Instant access to common tasks</Text>
            </View>
            <Zap size={20} color="#111827" />
          </View>


          <View style={styles.featureRow}>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Secure</Text>
              <Text style={styles.featureDesc}>Enterprise-grade Protection</Text>
            </View>
            <Shield size={20} color="#111827" />
          </View>


          <View style={styles.featureRow}>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Intuitive</Text>
              <Text style={styles.featureDesc}>Built for every skill Level</Text>
            </View>
            <Settings size={20} color="#111827" />
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('LoginStep1')}
          >
            <Text style={styles.primaryButtonText}>Sign In to Your Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.secondaryButtonText}>Create New Account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Image source={images.secuvestLogo} style={styles.logo} />
          <Text style={styles.footerText}>SECUVEST</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: 10,
  },
  contentScroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: 10,
  },
  heroCard: {
    height: height * 0.35,
    backgroundColor: '#1A4D3A',
    borderRadius: 16,
    padding: 24,
    justifyContent: 'space-between',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 'bold',
  },
  heroSubtitle: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '400',
    marginTop: -5,
  },
  heroBottomTextContainer: {
    marginTop: 'auto',
  },
  heroBottomTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  heroBottomDesc: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '400',
    opacity: 0.9,
    lineHeight: 18,
  },
  featureList: {
    marginTop: 20,
    gap: 15
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    paddingHorizontal: 10,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 12,
    fontWeight: '400',
    color: '#667085',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  buttonContainer: {
    marginTop: '30',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  secondaryButtonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 20,
  },
  logo: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  footerText: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    letterSpacing: 1.5,
  },
});

export default OnboardingScreen;
