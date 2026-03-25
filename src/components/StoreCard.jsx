import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Star, Building } from 'lucide-react-native';

const StoreCard = ({ store, isFavorite, onToggleFavorite, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.storeCard, isFavorite && styles.storeFavCard]}
      onPress={onPress}
    >
      <View style={styles.cardTopRow}>
        <View style={[styles.iconBox, isFavorite && styles.iconBoxFav]}>
          <Building size={20} color={isFavorite ? "#F59E0B" : "#9CA3AF"} />
        </View>
        <View style={styles.storeTextCol}>
          <Text style={styles.storeName}>{store.name}</Text>
          <Text style={styles.retailerName}>{store.retailer}</Text>
        </View>
        <TouchableOpacity onPress={onToggleFavorite} style={styles.actionIcon}>
          <Star size={20} color={isFavorite ? "#F59E0B" : "#9CA3AF"} fill={isFavorite ? "#F59E0B" : "transparent"} />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.cardBottomRow}>
        <View style={styles.tagBadge}>
          <Text style={styles.tagText}>{store.tags && store.tags[0]}</Text>
        </View>
        <Text style={styles.distanceText}>{store.distance}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  storeCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16
  },
  storeFavCard: {
    backgroundColor: '#FFFAEB',
    borderColor: '#FDE68A'
  },
  cardTopRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14
  },
  iconBoxFav: { backgroundColor: '#FEF3C7' },
  storeTextCol: { flex: 1, justifyContent: 'center' },
  storeName: { fontSize: 16, fontWeight: '500', color: '#111827', marginBottom: 4 },
  retailerName: { fontSize: 12, color: '#6B7280', fontWeight: '400' },
  actionIcon: { padding: 4 },
  cardBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tagBadge: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4
  },
  tagText: { fontSize: 11, color: '#6B7280', fontWeight: '500' },
  distanceText: { fontSize: 12, color: '#6B7280', fontWeight: '500' },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 5,
    marginBottom: 10,
  },
});

export default StoreCard;
