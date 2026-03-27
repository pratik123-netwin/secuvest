import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Package, ExternalLink } from 'lucide-react-native';

import BackButton from '../../components/BackButton';
import TabBar from '../../components/common/TabBar';
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
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    (async () => {
      const data = await getProductById(productId);
      setProduct(data);
      setLoading(false);
    })();
  }, [productId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

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
            {product.image ? (
              <Image source={{ uri: product.image }} style={styles.greenImage} />
            ) : (
              <Package size={28} color="#FFFFFF" />
            )}
          </View>

          <View style={styles.greenTextBlock}>
            <Text style={styles.greenName} numberOfLines={1}>
              {product.name}
            </Text>
            <Text style={styles.greenArticle}>
              Article #: {product.articleNo}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.greenBottom}
          onPress={() => navigation.navigate('SupplierFlow', {
            screen: 'SupplierProfile',
            params: { supplier: { id: product.supplierId, name: product.supplierName } },
          })}
        >
          <Text style={styles.supplierPillText}>
            {product.supplierName}
          </Text>
          <ExternalLink size={16} color={COLORS.textWhite} />
        </TouchableOpacity>
      </LinearGradient>

      {/* Tab Bar */}
      <TabBar tabs={TABS} activeTab={activeTab} onTabPress={setActiveTab} />

      {/* Tab Content */}
      {activeTab === 'Overview' && <ProductOverviewTab product={product} />}
      {activeTab === 'Stock' && <ProductStockTab product={product} />}
      {activeTab === 'Details' && (
        <ProductDetailsTab product={product} navigation={navigation} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },

  // Gradient Card
  greenCard: {
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    overflow: 'hidden',
  },

  greenCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  greenImageWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },

  greenImage: {
    width: 56,
    height: 56,
    borderRadius: 16,
  },

  greenTextBlock: { flex: 1 },

  greenName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textWhite,
    marginBottom: 4,
  },

  greenArticle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
  },

  greenBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF1A',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  supplierPillText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textWhite,
  },
});

export default ProductDetailScreen;
