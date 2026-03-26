import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import BottomTabNavigator from './BottomTabNavigator';
import SupplierNavigator from './SupplierNavigator';
import ProductsNavigator from './ProductsNavigator';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import images from '../constants/images';
import { Home, MessageSquare, Clock, Building, Box, User, Settings, Bell, HelpCircle, LogOut, X } from 'lucide-react-native';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const SectionTitle = ({ title }) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );

  const DrawerItemName = ({ icon: Icon, label, isSoon = false, active = false, onPress }) => (
    <TouchableOpacity style={[styles.drawerItem, active && styles.activeDrawerItem]} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon size={20} color={active ? '#111827' : '#6B7280'} />
      </View>
      <Text style={[styles.drawerItemLabel, active && styles.activeDrawerLabel]}>{label}</Text>
      {isSoon && (
        <View style={styles.soonBadge}>
          <Text style={styles.soonText}>Soon</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: Platform.OS === 'android' ? 20 : 0 }}>

        {/* Header */}
        <View style={styles.drawerHeader}>
          <View style={styles.logoRow}>
            <Image source={images.secuvestLogo} style={styles.headerLogo} />
            <Text style={styles.headerText}>SECUVEST</Text>
          </View>
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()} style={styles.closeButton}>
            <X size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.drawerContent}>
          {/* Main Menu */}
          <SectionTitle title="Main Menu" />
          <DrawerItemName icon={Home} label="Home" active={true} onPress={() => props.navigation.navigate('RootTabs', { screen: 'Home' })} />
          <DrawerItemName icon={Clock} label="Attendance" onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.navigate('RootTabs', { screen: 'Clock' });
          }} />

          {/* Master Data */}
          <View style={styles.sectionMargin} />
          <SectionTitle title="Master Data" />
          <DrawerItemName icon={Building} label="Suppliers" onPress={() => { props.navigation.closeDrawer(); props.navigation.navigate('SupplierFlow'); }} />
          <DrawerItemName icon={Box} label="Products" onPress={() => { props.navigation.closeDrawer(); props.navigation.navigate('ProductsFlow'); }} />

          {/* Settings */}
          <View style={styles.sectionMargin} />
          <SectionTitle title="Settings" />
          <DrawerItemName icon={User} label="Profile" onPress={() => { props.navigation.closeDrawer(); props.navigation.navigate('ProfileFlow'); }} />
          <DrawerItemName icon={Settings} label="Settings" isSoon={true} />
          <DrawerItemName icon={Bell} label="Notifications" isSoon={true} />
          <DrawerItemName icon={HelpCircle} label="Help & Support" isSoon={true} />
        </View>

      </DrawerContentScrollView>

      <View style={styles.drawerFooter}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
          <LogOut size={20} color="#6B7280" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 300,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        },
      }}
    >
      <Drawer.Screen name="RootTabs" component={BottomTabNavigator} />
      <Drawer.Screen name="SupplierFlow" component={SupplierNavigator} />
      <Drawer.Screen name="ProductsFlow" component={ProductsNavigator} />
      <Drawer.Screen name="ProfileFlow" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
    marginBottom: 10,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#111',
  },
  closeButton: {
    padding: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
  },
  drawerContent: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    marginLeft: 12,
  },
  sectionMargin: {
    height: 12,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  activeDrawerItem: {
    backgroundColor: '#F3F4F6',
  },
  iconContainer: {
    width: 24,
    marginRight: 12,
    alignItems: 'center',
  },
  drawerItemLabel: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
    flex: 1,
  },
  activeDrawerLabel: {
    color: '#111827',
    fontWeight: '600',
  },
  soonBadge: {
    backgroundColor: '#A3E635',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  soonText: {
    fontSize: 10,
    color: '#000000',
    fontWeight: 'bold',
  },
  drawerFooter: {
    padding: 20,
    paddingBottom: 30,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
});

export default DrawerNavigator;
