import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import SearchBar from '../../components/SearchBar';
import ProductCard from '../../components/common/ProductCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import { getCombinedProducts } from '../../services/productService';

const SelectedProductsScreen = ({ route, navigation }) => {
  const { selectedIds = [] } = route.params || {};

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Convert selected IDs array to comma-separated string once
  const productIdsString = selectedIds.join(',');

  const fetchProducts = useCallback(async (search = '') => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (search) params.search = search;
      const data = await getCombinedProducts(productIdsString, params);
      setProducts(data);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to load selected products.');
    } finally {
      setLoading(false);
    }
  }, [productIdsString]);

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Debounced search — 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(searchQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Selected Products</Text>
          {!loading && !error && (
            <Text style={styles.headerSubtitle}>
              {products.length} {products.length === 1 ? 'product' : 'products'} selected
            </Text>
          )}
        </View>
        <View style={{ width: 60 }} />
      </View>

      {/* Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search products, Article#..."
        resultsText={loading ? undefined : `${products.length} products`}
      />

      {/* Content */}
      {loading ? (
        <LoadingSkeleton count={selectedIds.length || 3} cardHeight={110} />
      ) : error ? (
        <ErrorState message={error} onRetry={() => fetchProducts(searchQuery)} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState
              title="No products found"
              message="Try adjusting your search."
            />
          }
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              showStatus={true}
              onPress={() =>
                navigation.navigate('ProductDetail', { productId: item.id })
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});

export default SelectedProductsScreen;
