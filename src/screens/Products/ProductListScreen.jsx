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
import { getProducts, getProductCategories, getProductSuppliers } from '../../services/productService';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Multi-select
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  // Filter options from API
  const [filterVisible, setFilterVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  // Active filter values
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [sortAZ, setSortAZ] = useState(false);

  // Pending filter values (held until Apply is tapped)
  const [pendingCategory, setPendingCategory] = useState('');
  const [pendingSupplier, setPendingSupplier] = useState('');
  const [pendingSortAZ, setPendingSortAZ] = useState(false);

  const loadData = useCallback(async (search = '', category = '', supplierId = '', sort = false) => {
    try {
      setLoading(true);
      setError(null);

      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;
      if (supplierId) params.supplier_id = supplierId;
      if (sort) params.sort = 'az';

      const [data, cats, supps] = await Promise.all([
        getProducts(params),
        // getProductCategories(),
        // getProductSuppliers(),
      ]);

      setProducts(data);
      // setCategories(cats);
      // setSuppliers(supps);
    } catch (err) {
      console.log("Error loading products: ", err);
      setError(typeof err === 'string' ? err : 'Failed to load products.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => {
    loadData(searchQuery, selectedCategory, selectedSupplier, sortAZ);
  }, [loadData]));

  const handleApplyFilters = () => {
    setSelectedCategory(pendingCategory);
    setSelectedSupplier(pendingSupplier);
    setSortAZ(pendingSortAZ);
    setFilterVisible(false);
    loadData(searchQuery, pendingCategory, pendingSupplier, pendingSortAZ);
  };

  // Search executes on change with debounce — backend handles filtering
  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const toggleMultiSelect = (val) => {
    setIsMultiSelect(val);
    setSelectedIds([]);
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Local sort only (backend handles search/filter)
  const displayProducts = [...products].sort((a, b) => {
    if (!sortAZ) return 0;
    return (a?.name || '').localeCompare(b?.name || '');
  });

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
        <Text style={styles.headerTitle}>{STRINGS.products}</Text>
        <View style={{ width: 60 }} />
      </View>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
        onFilterPress={() => {
          setPendingCategory(selectedCategory);
          setPendingSupplier(selectedSupplier);
          setPendingSortAZ(sortAZ);
          setFilterVisible(true);
        }}
        placeholder={STRINGS.searchProducts}
        resultsText={loading ? undefined : `${displayProducts.length} ${STRINGS.productsAvailable}`}
      />

      <View style={styles.toggleRow}>
        <Text style={[styles.toggleLabel, isMultiSelect && styles.toggleLabelActive]}>
          {STRINGS.multiProductsSelect}
        </Text>
        <Switch
          value={isMultiSelect}
          onValueChange={toggleMultiSelect}
          trackColor={{ false: COLORS.border, true: COLORS.primary }}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#E5E7EB"
        />
      </View>

      {loading ? (
        <LoadingSkeleton count={4} cardHeight={110} />
      ) : error ? (
        <ErrorState message={error} onRetry={() => loadData(searchQuery, selectedCategory, selectedSupplier, sortAZ)} />
      ) : (
        <FlatList
          data={displayProducts}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState title="No products found" message="Try adjusting your search or filters." />}
          renderItem={renderProduct}
        />
      )}

      <FloatingActionButton
        isVisible={isMultiSelect && selectedIds.length > 0}
        text={`${selectedIds.length} ${STRINGS.productsSelected}`}
        onPress={() => {
          navigation.navigate('SelectedProducts', { selectedIds });
        }}
      />

      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        retailers={categories}
        regions={suppliers}
        selectedRetailer={pendingCategory}
        setSelectedRetailer={setPendingCategory}
        selectedRegion={pendingSupplier}
        setSelectedRegion={setPendingSupplier}
        sortAZ={pendingSortAZ}
        setSortAZ={setPendingSortAZ}
        favoritesOnly={false}
        setFavoritesOnly={() => { }}
        showFavorites={false}
        retailerLabel={STRINGS.categories}
        regionLabel={STRINGS.suppliers}
        retailerPlaceholder={STRINGS.allCategories}
        regionPlaceholder={STRINGS.allSuppliers}
        onApply={handleApplyFilters}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15,
  },
  headerTitle: { fontSize: 16, fontWeight: '500', color: COLORS.textPrimary },
  toggleRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginHorizontal: 20, marginBottom: 16, backgroundColor: COLORS.surfaceAlt,
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12,
    borderColor: COLORS.cardBorder, borderWidth: 1,
  },
  toggleLabel: { fontSize: 14, fontWeight: '500', color: COLORS.textMuted },
  toggleLabelActive: { color: COLORS.primary, fontWeight: '600' },
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
