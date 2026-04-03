import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import SearchBar from '../../components/SearchBar';
import FilterModal from '../../components/FilterModal';
import SupplierCard from '../../components/common/SupplierCard';
import FloatingActionButton from '../../components/common/FloatingActionButton';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorState from '../../components/common/ErrorState';
import { getSuppliers } from '../../services/supplierService';
import { getRegions } from '../../services/attendanceService';

const SelectSupplierScreen = ({ route, navigation }) => {
  const { preSelectedSuppliers = [] } = route?.params || {};
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  // Multi-select: track array of IDs
  const [selectedIds, setSelectedIds] = useState(
    () => preSelectedSuppliers.length > 1 ? preSelectedSuppliers.map(s => s.id) : []
  );
  // Single-select: track one ID — null means nothing selected
  const [singleSelectedId, setSingleSelectedId] = useState(
    () => preSelectedSuppliers.length === 1 ? preSelectedSuppliers[0].id : null
  );
  const [isMultiSelect, setIsMultiSelect] = useState(preSelectedSuppliers.length > 1);

  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [sortAZ, setSortAZ] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const [regions, setRegions] = useState([]);

  // Load regions natively on mount
  useEffect(() => {
    const fetchConstants = async () => {
      try {
        const fetchedRegions = await getRegions();
        setRegions(fetchedRegions);
      } catch (e) {
        console.error("Filter constants load fail:", e);
      }
    };
    fetchConstants();
  }, []);

  const fetchSuppliersData = async (query = '', region = '', sort = false) => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (query) params.search = query;
      if (region) params.region_id = region;
      if (sort) params.sort = 'az';

      const data = await getSuppliers(params);
      const items = Array.isArray(data) ? data : (data?.rows || []);

      const storedFavs = await AsyncStorage.getItem('favourite_suppliers');
      const favouriteIds = storedFavs ? JSON.parse(storedFavs) : [];

      const mergedData = items.map(s => ({
        ...s,
        isFavorite: favouriteIds.includes(s.id)
      }));

      setSuppliers(mergedData);
    } catch (e) {
      setError(typeof e === 'string' ? e : 'Failed to load suppliers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Debounced API execution
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSuppliersData(searchQuery, selectedRegion, sortAZ);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedRegion, sortAZ]);

  const filteredSuppliers = suppliers
    .filter(s => {
      // Backend handles search, region, and sort. Only handle local favourites filtering.
      return favoritesOnly ? s.isFavorite : true;
    })
    .sort((a, b) => {
      // Favourites bubble to the top visually on the client
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return 0;
    });

  // Multi-select: toggle ID in/out of array
  const toggleMultiSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Single-select: tap selects, tap again deselects
  const handleSingleTap = (supplier) => {
    setSingleSelectedId(prev => prev === supplier.id ? null : supplier.id);
  };

  const toggleFavorite = async (id) => {
    const sIdx = suppliers.findIndex(s => s.id === id);
    if (sIdx === -1) return;

    // Optimistic state toggle
    setSuppliers(prev => prev.map(s => s.id === id ? { ...s, isFavorite: !s.isFavorite } : s));

    // Update local AsyncStorage
    try {
      const stored = await AsyncStorage.getItem('favourite_suppliers');
      const favouriteIds = stored ? JSON.parse(stored) : [];
      const updated = favouriteIds.includes(id)
        ? favouriteIds.filter(f => f !== id)
        : [...favouriteIds, id];
      await AsyncStorage.setItem('favourite_suppliers', JSON.stringify(updated));
    } catch (e) {
      console.error("Local favorite sync failed", e);
    }
  };

  const handleSingleContinue = () => {
    const supplier = suppliers.find(s => s.id === singleSelectedId);
    if (supplier) navigation.navigate('SupplierDetail', { supplier });
  };

  const handleMultiContinue = () => {
    const selected = suppliers.filter(s => selectedIds.includes(s.id));
    navigation.navigate('SupplierProfile', { selectedSuppliers: selected });
  };

  const handleModeToggle = (val) => {
    setIsMultiSelect(val);
    setSelectedIds([]);
    setSingleSelectedId(null);
  };

  // FAB adapts to current mode
  const fabVisible = isMultiSelect ? selectedIds.length > 0 : singleSelectedId !== null;
  const fabText = isMultiSelect ? `${selectedIds.length} Suppliers Selected` : 'Continue';
  const fabOnPress = isMultiSelect ? handleMultiContinue : handleSingleContinue;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Select Supplier</Text>
        <View style={{ width: 60 }} />
      </View>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onFilterPress={() => setFilterVisible(true)}
        placeholder="Search by name, or region..."
        resultsText={loading ? undefined : `${filteredSuppliers.length} Suppliers available`}
      />

      <View style={styles.toggleRow}>
        <Text style={[styles.toggleLabel, isMultiSelect && styles.toggleLabelActive]}>
          Multi-Suppliers Select
        </Text>
        <Switch
          value={isMultiSelect}
          onValueChange={handleModeToggle}
          trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#E5E7EB"
        />
      </View>

      {loading ? (
        <LoadingSkeleton count={4} cardHeight={110} />
      ) : error ? (
        <ErrorState message={error} onRetry={() => fetchSuppliersData(searchQuery, selectedRegion, sortAZ)} />
      ) : (
        <FlatList
          data={filteredSuppliers}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState title="No suppliers found" message="Try adjusting your search or filters." />}
          renderItem={({ item }) => (
            <SupplierCard
              supplier={item}
              singleSelected={!isMultiSelect && singleSelectedId === item.id}
              onPress={() => handleSingleTap(item)}
              isMultiSelect={isMultiSelect}
              isSelected={selectedIds.includes(item.id)}
              onToggleSelect={() => toggleMultiSelect(item.id)}
              onToggleFavorite={() => toggleFavorite(item.id)}
            />
          )}
        />
      )}

      <FloatingActionButton
        isVisible={fabVisible}
        text={fabText}
        onPress={fabOnPress}
      />

      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        retailers={[]}
        regions={regions}
        selectedRetailer=""
        setSelectedRetailer={() => { }}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        sortAZ={sortAZ}
        setSortAZ={setSortAZ}
        favoritesOnly={favoritesOnly}
        setFavoritesOnly={setFavoritesOnly}
        retailerLabel="Store Banner"
        retailerPlaceholder="All Banners"
        onApply={() => setFilterVisible(false)}
      />
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
  toggleRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginHorizontal: 20, marginBottom: 16, backgroundColor: '#FAFAFA',
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12,
    borderColor: '#EAEAED', borderWidth: 1
  },
  toggleLabel: { fontSize: 14, fontWeight: '500', color: '#6B7280' },
  toggleLabelActive: { color: '#4F46E5', fontWeight: '600' },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
});

export default SelectSupplierScreen;
