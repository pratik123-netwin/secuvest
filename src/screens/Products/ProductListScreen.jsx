import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import BackButton from '../../components/BackButton';
import SearchBar from '../../components/SearchBar';
import FilterModal from '../../components/FilterModal';
import ProductCard from '../../components/common/ProductCard';
import FloatingActionButton from '../../components/common/FloatingActionButton';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import Checkbox from '../../components/common/Checkbox';
import { getProducts, getCategories, getSupplierNames } from '../../services/productService';

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Multi-select
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  // Filter
  const [filterVisible, setFilterVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [supplierNames, setSupplierNames] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [sortAZ, setSortAZ] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [data, cats, supps] = await Promise.all([
        getProducts(),
        getCategories(),
        getSupplierNames(),
      ]);
      setProducts(data);
      setCategories(cats);
      setSupplierNames(supps);
    } catch {
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { loadData(); }, [loadData]));

  const filtered = products
    .filter(p => {
      const q = searchQuery.toLowerCase();
      const matchSearch = p.name.toLowerCase().includes(q) || p.articleNo.toLowerCase().includes(q);
      const matchCat = selectedCategory ? p.category === selectedCategory : true;
      const matchSup = selectedSupplier ? p.supplierName === selectedSupplier : true;
      return matchSearch && matchCat && matchSup;
    })
    .sort((a, b) => sortAZ ? a.name.localeCompare(b.name) : 0);

  const toggleMultiSelect = (val) => {
    setIsMultiSelect(val);
    setSelectedIds([]);
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const renderProduct = ({ item }) => (
    <View style={isMultiSelect ? styles.multiSelectCardRow : null}>
      <View style={{ flex: 1 }}>
        <ProductCard
          product={item}
          showStatus={false}
          onPress={() => {
            if (isMultiSelect) {
              toggleSelect(item.id);
            } else {
              navigation.navigate('ProductDetail', { productId: item.id });
            }
          }}
        />
      </View>
      {isMultiSelect && (
        <View style={styles.checkboxContainer}>
          <Checkbox
            isChecked={selectedIds.includes(item.id)}
            onToggle={() => toggleSelect(item.id)}
            size={22}
          />
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.navigate('RootTabs', { screen: 'Home' })} />
        <Text style={styles.headerTitle}>Products</Text>
        <View style={{ width: 60 }} />
      </View>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onFilterPress={() => setFilterVisible(true)}
        placeholder="Search products, Article#..."
        resultsText={loading ? undefined : `${filtered.length} products available`}
      />

      <View style={styles.toggleRow}>
        <Text style={[styles.toggleLabel, isMultiSelect && styles.toggleLabelActive]}>
          Multi-Products Select
        </Text>
        <Switch
          value={isMultiSelect}
          onValueChange={toggleMultiSelect}
          trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#E5E7EB"
        />
      </View>

      {loading ? (
        <LoadingSkeleton count={4} cardHeight={110} />
      ) : error ? (
        <ErrorState message={error} onRetry={loadData} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState title="No products found" message="Try adjusting your search or filters." />}
          renderItem={renderProduct}
        />
      )}

      <FloatingActionButton
        isVisible={isMultiSelect && selectedIds.length > 0}
        text={`${selectedIds.length} Products Selected`}
        onPress={() => { }}
      />

      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        retailers={categories}
        regions={supplierNames}
        selectedRetailer={selectedCategory}
        setSelectedRetailer={setSelectedCategory}
        selectedRegion={selectedSupplier}
        setSelectedRegion={setSelectedSupplier}
        sortAZ={sortAZ}
        setSortAZ={setSortAZ}
        favoritesOnly={false}
        setFavoritesOnly={() => { }}
        showFavorites={false}
        retailerLabel="Categories"
        regionLabel="Suppliers"
        retailerPlaceholder="All Categories"
        regionPlaceholder="All Suppliers"
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
    borderColor: '#EAEAED', borderWidth: 1,
  },
  toggleLabel: { fontSize: 14, fontWeight: '500', color: '#6B7280' },
  toggleLabelActive: { color: '#4F46E5', fontWeight: '600' },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
  multiSelectCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    position: 'absolute',
    right: 8,
    top: 18,
  },
});

export default ProductListScreen;
