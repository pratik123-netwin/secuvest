import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Package, ExternalLink } from 'lucide-react-native';

import BackButton from '../../components/BackButton';
import TabBar from '../../components/common/TabBar';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import ErrorState from '../../components/common/ErrorState';
import { getProductById } from '../../services/productService';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';
import ProductOverviewTab from './ProductOverviewTab';
import ProductStockTab from './ProductStockTab';
import ProductDetailsTab from './ProductDetailsTab';

const TABS = [STRINGS.tabOverview, STRINGS.tabStock, STRINGS.tabDetails];

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProductById(productId);
      setProduct(data);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to load product details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerTitle}>{STRINGS.productDetails}</Text>
          <View style={{ width: 60 }} />
        </View>
        <LoadingSkeleton count={1} cardHeight={120} />
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerTitle}>{STRINGS.productDetails}</Text>
          <View style={{ width: 60 }} />
        </View>
        <ErrorState
          message={error || 'Product not found.'}
          onRetry={loadProduct}
        />
      </SafeAreaView>
    );
  }

  // Map root-level fields
  const imageUri = product.image_url || product.image;
  const articleNum = product.article_no || product.articleNo;
  const supplierName = product.supplier?.name || product.supplierName;
  const supplierId = product.supplier?.id || product.supplier_id || product.supplierId;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>{STRINGS.productDetails}</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Gradient Green Summary Card */}
      <LinearGradient
        colors={[COLORS.productGradStart, COLORS.productGradEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.greenCard}
      >
        <View style={styles.greenCardContent}>
          <View style={styles.greenImageWrap}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.greenImage} />
            ) : (
              <Package size={28} color="#FFFFFF" />
            )}
          </View>

          <View style={styles.greenTextBlock}>
            <Text style={styles.greenName} numberOfLines={1}>
              {product.name}
            </Text>
            <Text style={styles.greenArticle}>
              Article #: {articleNum}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.greenBottom}
          onPress={() => navigation.navigate('SupplierFlow', {
            screen: 'SupplierDetail',
            params: { supplier: { id: supplierId, name: supplierName } },
          })}
        >
          <Text style={styles.supplierPillText}>
            {supplierName}
          </Text>
          <ExternalLink size={16} color={COLORS.textWhite} />
        </TouchableOpacity>
      </LinearGradient>

      {/* Tab Bar */}
      <TabBar tabs={TABS} activeTab={activeTab} onTabPress={setActiveTab} />

      {/* Tab Content — pass grouped sub-objects from API */}
      {activeTab === 'Overview' && <ProductOverviewTab overview={product.overview} />}
      {activeTab === 'Stock' && <ProductStockTab stock={product.stock} />}
      {activeTab === 'Details' && (
        <ProductDetailsTab details={product.details} navigation={navigation} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15,
  },
  headerTitle: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  greenCard: {
    marginHorizontal: 20, borderRadius: 20, overflow: 'hidden', marginBottom: 8,
  },
  greenCardContent: {
    flexDirection: 'row', alignItems: 'center',
    padding: 16, paddingBottom: 12,
  },
  greenImageWrap: {
    width: 56, height: 56, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center',
    marginRight: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
  },
  greenImage: { width: 56, height: 56, borderRadius: 14 },
  greenTextBlock: { flex: 1 },
  greenName: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  greenArticle: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },

  greenBottom: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 14, paddingTop: 10,
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.2)',
  },
  supplierPillText: { fontSize: 13, color: '#FFFFFF', fontWeight: '500', flex: 1, marginRight: 8 },
});

export default ProductDetailScreen;
