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
const SupplierProductsTab = ({ supplierId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortAZ, setSortAZ] = useState(false);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSupplierProducts(supplierId);
      setProducts(data);
    } catch {
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  }, [supplierId]);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const filteredProducts = products
    .filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.articleNo.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => sortAZ ? a.name.localeCompare(b.name) : 0);

  if (loading) return <LoadingSkeleton count={4} cardHeight={90} />;
  if (error) return <ErrorState message={error} onRetry={loadProducts} />;

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
        renderItem={({ item }) => <ProductCard product={item} showStatus={false} />}
      />

      {/* Filter modal — no Favourites option for products */}
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
        showFavorites={false}
        onApply={() => setFilterVisible(false)}
      />
    </>
  );
};

export default SupplierProductsTab;
