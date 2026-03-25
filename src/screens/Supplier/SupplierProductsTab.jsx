import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import SearchBar from '../../components/SearchBar';
import ProductCard from '../../components/common/ProductCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import { getSupplierProducts } from '../../services/supplierService';

/**
 * SupplierProductsTab — used inside SupplierDetailScreen.
 * Shows a searchable product list for one specific supplier.
 */
const SupplierProductsTab = ({ supplierId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.articleNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <LoadingSkeleton count={4} cardHeight={90} />;
  if (error) return <ErrorState message={error} onRetry={loadProducts} />;

  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search products, Article#..."
        resultsText={`${filteredProducts.length} products available`}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={p => p.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState title="No products found" />}
        renderItem={({ item }) => <ProductCard product={item} showStatus={false} />}
      />
    </>
  );
};

export default SupplierProductsTab;
