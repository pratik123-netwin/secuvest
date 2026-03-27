import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import BackButton from './BackButton';
import { COLORS } from '../constants/colors';
import images from '../constants/images';

/**
 * AuthHeader — Shared header block for all authentication screens.
 *
 * Props:
 *   icon        — JSX icon element rendered inside the purple card (e.g. <User size={44} color="#FFF" />)
 *   title       — Main heading text
 *   subtitle    — Sub-heading text below the title
 *   onBack      — Optional custom back handler; defaults to navigation.goBack() via BackButton
 */
const AuthHeader = ({ icon, title, subtitle, onBack }) => (
  <View style={styles.wrapper}>
    {/* Back Button */}
    <BackButton
      onPress={onBack}
      color="#000"
      textStyle={styles.backText}
      style={styles.backButton}
    />

    {/* Purple Icon Card */}
    <View style={styles.avatarContainer}>
      {icon}
    </View>

    {/* Title */}
    <Text style={styles.title}>{title}</Text>

    {/* Subtitle */}
    {!!subtitle && (
      <Text style={styles.subtitle}>{subtitle}</Text>
    )}
  </View>
);

/**
 * AuthFooter — SECUVEST logo + wordmark shared across all auth screens.
 */
export const AuthFooter = () => (
  <View style={styles.footer}>
    <Image source={images.secuvestLogo} style={styles.logo} />
    <Text style={styles.footerText}>SECUVEST</Text>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingTop: 16,
    zIndex: 10,
  },
  backText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 6,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
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
    color: COLORS.text,
    marginLeft: 8,
  },
});

export default AuthHeader;
