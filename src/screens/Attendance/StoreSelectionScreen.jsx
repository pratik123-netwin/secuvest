import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStores, getRetailers, getRegions } from '../../services/attendanceService';
import { COLORS } from '../../constants/colors';
import { Star, Building2 } from 'lucide-react-native';
import BackButton from '../../components/BackButton';
import SearchBar from '../../components/SearchBar';
import StoreCard from '../../components/StoreCard';
import FilterModal from '../../components/FilterModal';

const StoreSelectionScreen = ({ navigation }) => {
  const [stores, setStores] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [showFilters, setShowFilters] = useState(false);
  const [retailers, setRetailers] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRetailer, setSelectedRetailer] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [sortAZ, setSortAZ] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  // On every focus: check for an active session, redirect if found, then load store data
  useFocusEffect(
    useCallback(() => {
      const checkSessionAndLoad = async () => {
        const sessionStr = await AsyncStorage.getItem('active_session');
        if (sessionStr) {
          const session = JSON.parse(sessionStr);
          // Active session found — go straight to active session screen
          navigation.replace('ActiveSession', { store: session.store, status: session.status });
          return;
        }
        loadData();
      };
      checkSessionAndLoad();
    }, [navigation])
  );

  const loadData = async () => {
    setLoading(true);
    try {
      const [fetchedStores, fetchedRetailers, fetchedRegions] = await Promise.all([
        getStores(),
        getRetailers(),
        getRegions()
      ]);
      setStores(fetchedStores);
      setRetailers(fetchedRetailers);
      setRegions(fetchedRegions);

      const savedFavs = await AsyncStorage.getItem('favorite_stores');
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (storeId) => {
    const isFav = favorites.includes(storeId);
    let newFavs;
    if (isFav) {
      newFavs = favorites.filter(id => id !== storeId);
    } else {
      newFavs = [...favorites, storeId];
    }
    setFavorites(newFavs);
    await AsyncStorage.setItem('favorite_stores', JSON.stringify(newFavs));
  };

  const handleClearFilters = () => {
    setSelectedRetailer('');
    setSelectedRegion('');
    setFavoritesOnly(false);
    setSortAZ(false);
  };

  const filteredStores = stores.filter(store => {
    if (searchQuery && !store.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedRetailer && store.retailer !== selectedRetailer) return false;
    if (selectedRegion && store.region !== selectedRegion) return false;
    if (favoritesOnly && !favorites.includes(store.id)) return false;
    return true;
  });

  if (sortAZ) {
    filteredStores.sort((a, b) => a.name.localeCompare(b.name));
  }

  const favoriteStores = filteredStores.filter(s => favorites.includes(s.id));
  const otherStores = filteredStores.filter(s => !favorites.includes(s.id));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.navigate('RootTabs', { screen: 'Home' })} />
        <Text style={styles.headerTitle}>Attendance</Text>
        <View style={{ width: 60 }} />
      </View>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onFilterPress={() => setShowFilters(true)}
        resultsText={`${filteredStores.length} Stores Found`}
        placeholder="Search stores, locations..."
      />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
          {favoriteStores.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.sectionHeaderLeft}>
                  <Star size={16} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.sectionTitle}>Favorite Stores</Text>
                </View>
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>{favoriteStores.length}</Text>
                </View>
              </View>

              {favoriteStores.map(store => (
                <StoreCard
                  key={store.id}
                  store={store}
                  isFavorite={true}
                  onToggleFavorite={() => toggleFavorite(store.id)}
                  onPress={() => navigation.navigate('LocationVerification', { storeId: store.id })}
                />
              ))}
            </View>
          )}

          {otherStores.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.sectionHeaderLeft}>
                  <Building2 size={16} color="#9CA3AF" />
                  <Text style={styles.sectionTitle}>Other Stores</Text>
                </View>
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>{otherStores.length}</Text>
                </View>
              </View>

              {otherStores.map(store => (
                <StoreCard
                  key={store.id}
                  store={store}
                  isFavorite={false}
                  onToggleFavorite={() => toggleFavorite(store.id)}
                  onPress={() => navigation.navigate('LocationVerification', { storeId: store.id })}
                />
              ))}
            </View>
          )}
          <View style={{ height: 40 }} />
        </ScrollView>
      )}

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        retailers={retailers}
        regions={regions}
        selectedRetailer={selectedRetailer}
        setSelectedRetailer={setSelectedRetailer}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        sortAZ={sortAZ}
        setSortAZ={setSortAZ}
        favoritesOnly={favoritesOnly}
        setFavoritesOnly={setFavoritesOnly}
        onClear={handleClearFilters}
        onApply={() => setShowFilters(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15 },
  backBtn: { flexDirection: 'row', alignItems: 'center', width: 60 },
  backText: { fontSize: 14, color: '#6B7280', marginLeft: 4, fontWeight: '500' },
  headerTitle: { fontSize: 16, fontWeight: '500', color: '#111827' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContainer: { flex: 1 },
  section: { marginTop: 16 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 12 },
  sectionHeaderLeft: { flexDirection: 'row', alignItems: 'center' },
  sectionTitle: { fontSize: 15, fontWeight: '500', color: '#374151', marginLeft: 8 },
  countBadge: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2 },
  countText: { fontSize: 11, color: '#4B5563', fontWeight: 'bold' }
});

export default StoreSelectionScreen;
