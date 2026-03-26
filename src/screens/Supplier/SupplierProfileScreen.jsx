import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Building2, Edit } from 'lucide-react-native';
import BackButton from '../../components/BackButton';
import SearchBar from '../../components/SearchBar';
import FilterModal from '../../components/FilterModal';
import SupplierChip from '../../components/common/SupplierChip';
import TabBar from '../../components/common/TabBar';
import SupplierCard from '../../components/common/SupplierCard';
import ProductCard from '../../components/common/ProductCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import { getSupplierProducts } from '../../services/supplierService';

const TABS = ['Suppliers', 'Products'];

/**
 * SupplierProfileScreen — Multi-supplier hub (only shown when 2+ suppliers selected).
 *
 * Suppliers tab: list of selected suppliers → tap one → SupplierDetailScreen (metrics)
 * Products tab: combined product list across all selected suppliers
 * Edit button: back to SelectSupplierScreen with suppliers pre-selected
 */
const SupplierProfileScreen = ({ route, navigation }) => {
  const { selectedSuppliers = [] } = route.params;
  const [activeTab, setActiveTab] = useState('Suppliers');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState(null);
  const [chips, setChips] = useState(selectedSuppliers);
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortAZ, setSortAZ] = useState(false);

  const primarySupplier = selectedSuppliers[0] || {};
  const supplierCount = selectedSuppliers.length;
  const supplierLabel = supplierCount > 1 ? `${supplierCount} Suppliers` : primarySupplier.name || 'Supplier';
  const chipNames = chips.slice(0, 2).map(s => s.name);
  const extraCount = chips.length - 2;
  const previewText = chipNames.join(', ') + (extraCount > 0 ? '...' : '');

  const loadProducts = useCallback(async () => {
    try {
      setProductsLoading(true);
      setProductsError(null);
      // Fetch products for the first supplier (extend for all in real API)
      const data = await getSupplierProducts(primarySupplier.id);
      setProducts(data);
    } catch {
      setProductsError('Failed to load products.');
    } finally {
      setProductsLoading(false);
    }
  }, [primarySupplier.id]);

  useEffect(() => {
    if (activeTab === 'Products') loadProducts();
  }, [activeTab, loadProducts]);

  const removeChip = (id) => setChips(prev => prev.filter(s => s.id !== id));

  const filteredProducts = products
    .filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.articleNo.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => sortAZ ? a.name.localeCompare(b.name) : 0);

  const filteredSuppliers = chips.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Edit → go back to SelectSupplierScreen with current suppliers pre-selected
  const handleEdit = () => {
    navigation.navigate('SelectSupplier', { preSelectedSuppliers: chips });
  };

  // Tap a supplier in the Suppliers tab → go to their metrics/detail screen
  const handleSupplierTap = (supplier) => {
    navigation.navigate('SupplierDetail', { supplier });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Supplier Profile</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Blue Supplier Summary Card */}
      <View style={styles.summaryCard}>
        {/* Top: icon + name/subtitle */}
        <View style={styles.summaryTop}>
          <View style={styles.summaryIconBox}>
            <Building2 size={24} color="#FFFFFF" strokeWidth={1.5} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.summaryTitle}>{supplierLabel}</Text>
            <Text style={styles.summarySubtitle} numberOfLines={1}>{previewText}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Bottom: chips + Edit button — all in one non-scrolling flex row */}
        <View style={styles.chipRowContainer}>
          {/* Named chips (max 2) */}
          {chips.slice(0, 2).map(s => (
            <SupplierChip key={s.id} label={s.name} onRemove={() => removeChip(s.id)} />
          ))}
          {/* +X More chip */}
          {extraCount > 0 && (
            <SupplierChip label={`+${extraCount} More`} />
          )}

          {/* Spacer pushes Edit to the right */}
          <View style={{ flex: 1 }} />

          {/* Edit button always pinned to the right */}
          <TouchableOpacity style={styles.editBtn} onPress={handleEdit} activeOpacity={0.8}>
            <Edit size={11} color="#FFFFFF" />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>


      {/* Suppliers / Products Tab Bar */}
      <TabBar tabs={TABS} activeTab={activeTab} onTabPress={(tab) => {
        setSearchQuery('');
        setActiveTab(tab);
      }} />

      {/* Search bar shared across both tabs */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onFilterPress={() => setFilterVisible(true)}
        placeholder={activeTab === 'Suppliers' ? 'Search supplier, supplier code...' : 'Search products, Article#...'}
        resultsText={
          activeTab === 'Suppliers'
            ? `${filteredSuppliers.length} suppliers available`
            : productsLoading ? undefined : `${filteredProducts.length} products available`
        }
      />

      {/* Tab Content */}
      {activeTab === 'Suppliers' ? (
        <FlatList
          data={filteredSuppliers}
          keyExtractor={s => s.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState title="No suppliers found" message="Try a different search." />}
          renderItem={({ item }) => (
            <SupplierCard
              supplier={item}
              onPress={() => handleSupplierTap(item)}
              isMultiSelect={false}
              singleSelected={false}
              onToggleFavorite={() => { }}
            />
          )}
        />
      ) : (
        productsLoading ? (
          <LoadingSkeleton count={4} cardHeight={90} />
        ) : productsError ? (
          <ErrorState message={productsError} onRetry={loadProducts} />
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={p => p.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyState title="No products found" message="Try a different search." />}
            renderItem={({ item }) => <ProductCard product={item} showStatus={false} />}
          />
        )
      )}

      {/* Filter Modal — hides Favourites when viewing Products tab */}
      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        retailers={[]}
        regions={[]}
        selectedRetailer=""
        setSelectedRetailer={() => {}}
        selectedRegion=""
        setSelectedRegion={() => {}}
        sortAZ={sortAZ}
        setSortAZ={setSortAZ}
        favoritesOnly={false}
        setFavoritesOnly={() => {}}
        showFavorites={activeTab === 'Suppliers'}
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
  headerTitle: { fontSize: 16, fontWeight: '500', color: '#111827' },
  summaryCard: {
    backgroundColor: '#3075DF',
    marginHorizontal: 20, borderRadius: 16, padding: 16, marginBottom: 16,
  },
  summaryTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  summaryIconBox: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
    borderWidth: 1,
    borderColor: '#fff'
  },
  summaryTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 2 },
  summarySubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.7)' },
  chipRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, marginLeft: 4,
  },
  editText: { fontSize: 12, color: '#FFFFFF', fontWeight: '500', marginLeft: 4 },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
  divider: {
    height: 1,
    backgroundColor: '#FFFFFF66',
    marginVertical: 10
  },
});

export default SupplierProfileScreen;
