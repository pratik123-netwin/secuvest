import React, { useState, useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';
import SearchBar from '../../components/SearchBar';
import FilterModal from '../../components/FilterModal';
import ProductCard from '../../components/common/ProductCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import { getSupplierProducts } from '../../services/supplierService';

/**
 * SupplierProductsTab — used inside SupplierDetailScreen.
 * Shows a searchable, filterable product list for one specific supplier.
 */
const SupplierProductsTab = ({ supplierId, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortAZ, setSortAZ] = useState(false);

  const fetchSupplierProducts = async (query = '') => {
    try {
      setLoading(true);
      setError(null);
      console.log(supplierId)
      const data = await getSupplierProducts(supplierId, { search: query });
      const items = Array.isArray(data) ? data : (data?.rows || []);
      setProducts(items);
    } catch {
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSupplierProducts(searchQuery);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, supplierId]);

  const filteredProducts = [...products].sort((a, b) => {
    if (!sortAZ) return 0;
    return (a?.name || '').localeCompare(b?.name || '');
  });

  if (loading && products.length === 0) return <LoadingSkeleton count={4} cardHeight={90} />;
  if (error) return <ErrorState message={error} onRetry={() => fetchSupplierProducts(searchQuery)} />;

  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onFilterPress={() => setFilterVisible(true)}
        placeholder="Search products, Article#..."
        resultsText={`${filteredProducts.length} products available`}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={p => p.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        ListEmptyComponent={<EmptyState title="No products found" />}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            showStatus={false}
            onPress={() =>
              navigation.navigate('ProductsFlow', {
                screen: 'ProductDetail',
                params: { productId: item.id },
              })
            }
          />
        )}
      />

      {/* Filter modal — no Favourites option for products */}
      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        retailers={[]}
        regions={[]}
        selectedRetailer=""
        setSelectedRetailer={() => { }}
        selectedRegion=""
        setSelectedRegion={() => { }}
        sortAZ={sortAZ}
        setSortAZ={setSortAZ}
        favoritesOnly={false}
        setFavoritesOnly={() => { }}
        showFavorites={false}
        retailerLabel="Store Banner"
        retailerPlaceholder="All Banners"
        onApply={() => setFilterVisible(false)}
      />
    </>
  );
};

export default SupplierProductsTab;
