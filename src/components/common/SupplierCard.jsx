import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Building, Star, ChevronRight } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import Checkbox from './Checkbox';

const SupplierCard = ({ 
  supplier, 
  onPress, 
  isMultiSelect = false, 
  isSelected = false, 
  singleSelected = false,
  onToggleSelect,
  onToggleFavorite 
}) => {
  const { name, location, productCount, isFavorite } = supplier;

  let containerStyle = [styles.container];
  let iconBoxStyle = [styles.iconBox];
  let iconColor = '#9CA3AF';
  let isFavoriteFilled = false;

  if (isMultiSelect) {
    if (isSelected) containerStyle.push(styles.multiSelectedContainer);
  } else {
    // Highlight yellow if this card is the single-selected one OR it's a favourite
    if (singleSelected || isFavorite) {
      containerStyle.push(styles.favoriteContainer);
      iconBoxStyle.push(styles.favoriteIconBox);
      iconColor = '#F59E0B';
      isFavoriteFilled = true;
    }
  }


  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      onPress={isMultiSelect ? onToggleSelect : onPress}
      style={containerStyle}
    >
      <View style={styles.topRow}>
        <View style={styles.topLeft}>
          <View style={iconBoxStyle}>
            <Building size={20} color={iconColor} strokeWidth={isFavorite ? 2 : 1.5} />
          </View>
          <View style={styles.titleBlock}>
            <Text style={styles.nameText} numberOfLines={1}>{name}</Text>
            <Text style={styles.locationText}>{location}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.actionSlot} 
          onPress={isMultiSelect ? onToggleSelect : onToggleFavorite}
          activeOpacity={0.7}
        >
          {isMultiSelect ? (
            <Checkbox isChecked={isSelected} onToggle={onToggleSelect} />
          ) : (
             <Star size={22} color={isFavorite ? '#F59E0B' : '#D1D5DB'} fill={isFavoriteFilled ? '#F59E0B' : 'transparent'} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{productCount} Products Available</Text>
        </View>
        <ChevronRight size={20} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  favoriteContainer: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE047',
  },
  multiSelectedContainer: {
    backgroundColor: '#EEF2FF',
    borderColor: COLORS.primary, // Blue border
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginRight: 12,
  },
  favoriteIconBox: {
    borderColor: '#FCD34D',
    backgroundColor: '#FEF3C7',
  },
  titleBlock: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 13,
    color: '#6B7280',
  },
  actionSlot: {
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pill: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pillText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  }
});

export default SupplierCard;
