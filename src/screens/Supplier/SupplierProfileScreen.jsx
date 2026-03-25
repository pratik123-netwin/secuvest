import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Building2, Edit } from 'lucide-react-native';
import BackButton from '../../components/BackButton';
import SearchBar from '../../components/SearchBar';
import SupplierChip from '../../components/common/SupplierChip';
import ProductCard from '../../components/common/ProductCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import { getSupplierProducts } from '../../services/supplierService';

/**
 * SupplierProfileScreen — Multi-supplier product list hub.
 * Shows the blue supplier summary card + all products from the selected suppliers.
 * - Tap a product → opens SupplierDetailScreen (single supplier with Overview/Products tabs)
 * - Tap Edit     → goes back to SelectSupplierScreen with the current suppliers pre-selected
 */
const SupplierProfileScreen = ({ route, navigation }) => {
  const { selectedSuppliers = [] } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chips, setChips] = useState(selectedSuppliers);

  const primarySupplier = selectedSuppliers[0] || {};
  const supplierCount = selectedSuppliers.length;
  const supplierLabel = supplierCount > 1 ? `${supplierCount} Suppliers` : primarySupplier.name || 'Supplier';

  const chipNames = chips.slice(0, 2).map(s => s.name);
  const extraCount = chips.length - 2;
  const previewText = chipNames.join(', ') + (extraCount > 0 ? '...' : '');

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // In a real app you'd fetch products for all selected supplier IDs
      const data = await getSupplierProducts(primarySupplier.id);
      setProducts(data);
    } catch {
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  }, [primarySupplier.id]);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const removeChip = (id) => setChips(prev => prev.filter(s => s.id !== id));

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.articleNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Tap a product → go to SupplierDetailScreen for that product's supplier
  const handleProductPress = (product) => {
    // Find the supplier for this product (by name match or just use primary for now)
    const supplier = selectedSuppliers.find(s => s.name.includes(product.supplierName)) || primarySupplier;
    navigation.navigate('SupplierDetail', { supplier });
  };

  // Edit → go back to SelectSupplierScreen with current suppliers pre-selected
  const handleEdit = () => {
    navigation.navigate('SelectSupplier', { preSelectedSuppliers: chips });
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
        <View style={styles.summaryTop}>
          <View style={styles.summaryIconBox}>
            <Building2 size={24} color="#FFFFFF" strokeWidth={1.5} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.summaryTitle}>{supplierLabel}</Text>
            <Text style={styles.summarySubtitle} numberOfLines={1}>{previewText}</Text>
          </View>
        </View>

        {/* Scrollable Chip Row + Edit button */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {chips.slice(0, 2).map(s => (
            <SupplierChip key={s.id} label={s.name} onRemove={() => removeChip(s.id)} />
          ))}
          {extraCount > 0 && (
            <SupplierChip label={`+${extraCount} More`} />
          )}
          <TouchableOpacity style={styles.editBtn} onPress={handleEdit} activeOpacity={0.8}>
            <Edit size={12} color="#FFFFFF" />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Product Search */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search products, Article#..."
        resultsText={loading ? undefined : `${filteredProducts.length} products available`}
      />

      {/* Product List */}
      {loading ? (
        <LoadingSkeleton count={4} cardHeight={90} />
      ) : error ? (
        <ErrorState message={error} onRetry={loadProducts} />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={p => p.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState title="No products found" message="Try a different search." />}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              showStatus={false}
              onPress={() => handleProductPress(item)}
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
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15,
  },
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#111827' },
  summaryCard: {
    backgroundColor: '#4F46E5',
    marginHorizontal: 20, borderRadius: 16, padding: 16, marginBottom: 16,
  },
  summaryTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  summaryIconBox: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  summaryTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 2 },
  summarySubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.7)' },
  chipRow: { flexDirection: 'row' },
  editBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, marginLeft: 4,
  },
  editText: { fontSize: 12, color: '#FFFFFF', fontWeight: '500', marginLeft: 4 },
});

export default SupplierProfileScreen;
