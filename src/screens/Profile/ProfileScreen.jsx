import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import {
  Mail, Phone, MapPin, Building2, Calendar,
} from 'lucide-react-native';
import BackButton from '../../components/BackButton';
import ProfileInfoRow from '../../components/common/ProfileInfoRow';
import LinearGradient from 'react-native-linear-gradient';

// Generate initials from a full name string
const getInitials = (name = '') => {
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || '?';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const ProfileScreen = ({ navigation }) => {
  const user = useSelector(state => state.auth.user) || {};
  const {
    name = 'John Smith',
    role = 'Store Representative',
    email = 'john.smith@company.com',
    phone = '+27 82 123 4567',
    location = 'Johannesburg, South Africa',
    department = 'Field Operations',
    memberSince = 'January 2024',
  } = user;

  const initials = getInitials(name);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton onPress={() => navigation.navigate('RootTabs', { screen: 'Home' })} />
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {/* Dark Profile Card */}
        <LinearGradient
          colors={['#2B2B2B', '#1F1F1F', '#141414']}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.profileCard}
        >
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>{initials}</Text>
          </View>

          <View style={styles.profileText}>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profileRole}>{role}</Text>
          </View>
        </LinearGradient>


        {/* Contact Information */}
        <Text style={styles.sectionTitle}>Contact Information</Text>

        <ProfileInfoRow
          icon={<Mail size={18} color="#6B7280" />}
          label="Email"
          value={email}
        />
        <ProfileInfoRow
          icon={<Phone size={18} color="#6B7280" />}
          label="Phone"
          value={phone}
        />
        <ProfileInfoRow
          icon={<MapPin size={18} color="#6B7280" />}
          label="Location"
          value={location}
        />
        <ProfileInfoRow
          icon={<Building2 size={18} color="#6B7280" />}
          label="Department"
          value={department}
        />
        <ProfileInfoRow
          icon={<Calendar size={18} color="#6B7280" />}
          label="Member Since"
          value={memberSince}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15,
  },
  headerTitle: { fontSize: 16, fontWeight: '500', color: '#181D27' },

  content: { paddingHorizontal: 20, paddingBottom: 40 },

  // Dark profile card
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#374151',
    borderWidth: 2,
    borderColor: '#4B5563',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarInitials: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  profileText: { flex: 1 },
  profileName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '400',
  },

  // Section
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 14,
  },
});

export default ProfileScreen;
