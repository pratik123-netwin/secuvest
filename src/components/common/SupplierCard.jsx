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
  onToggleFavorite,
}) => {
  const { name, location, productCount, isFavorite } = supplier;

  // ── Container styles ─────────────────────────────────────────────────────────
  let containerStyle = [styles.container];

  if (isMultiSelect) {
    // Multi-select: blue highlight when checked
    if (isSelected) containerStyle.push(styles.blueSelectedContainer);
  } else {
    // Single-select: blue when selected (same as multi), amber when favourite only
    if (singleSelected) {
      containerStyle.push(styles.blueSelectedContainer);
    } else if (isFavorite) {
      containerStyle.push(styles.favoriteContainer);
    }
  }

  // ── Icon box ─────────────────────────────────────────────────────────────────
  let iconBoxStyle = [styles.iconBox];
  let iconColor = '#9CA3AF';

  if (!isMultiSelect && singleSelected) {
    // Blue selected state
    iconBoxStyle.push(styles.blueIconBox);
    iconColor = COLORS.primary;
  } else if (!isMultiSelect && isFavorite) {
    // Orange favourite state
    iconBoxStyle.push(styles.favoriteIconBox);
    iconColor = '#F59E0B';
  } else if (isMultiSelect && isSelected) {
    iconBoxStyle.push(styles.blueIconBox);
    iconColor = COLORS.primary;
  }

  // ── Top-row divider ──────────────────────────────────────────────────────────
  let topRowDividerColor = '#EAEAED'; // default
  if (singleSelected || (isMultiSelect && isSelected)) {
    topRowDividerColor = "#C2CFFF"; // blue
  } else if (!isMultiSelect && isFavorite) {
    topRowDividerColor = '#FEDF89'; // amber
  }

  const topRowStyle = [styles.topRow, { borderBottomColor: topRowDividerColor }];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={isMultiSelect ? onToggleSelect : onPress}
      style={containerStyle}
    >
      <View style={topRowStyle}>
        <View style={styles.topLeft}>
          <View style={iconBoxStyle}>
            <Building size={20} color={iconColor} strokeWidth={1.5} />
          </View>
          <View style={styles.titleBlock}>
            <Text style={styles.nameText} numberOfLines={1}>{name}</Text>
            <Text style={styles.locationText}>{location}</Text>
          </View>
        </View>

        {/* Action slot: Checkbox in multi-select, Star (favourite) in single mode */}
        <TouchableOpacity
          style={styles.actionSlot}
          onPress={isMultiSelect ? onToggleSelect : onToggleFavorite}
          activeOpacity={0.7}
        >
          {isMultiSelect ? (
            <Checkbox isChecked={isSelected} onToggle={onToggleSelect} />
          ) : (
            <Star
              size={22}
              color={isFavorite ? '#F59E0B' : '#D1D5DB'}
              fill={isFavorite ? '#F59E0B' : 'transparent'}
            />
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
    marginBottom: 12,
  },

  // Blue — used for BOTH single-select AND multi-select checked state
  blueSelectedContainer: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C2CFFF',
  },

  // Amber — favourite only (in single-select mode, when NOT selected)
  favoriteContainer: {
    backgroundColor: '#FFFAEB',
    borderColor: '#FEDF89',
  },

  // ── Top row ──────────────────────────────────────────────────────────────────
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAED', // overridden inline per state
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
  blueIconBox: {
    borderColor: '#C2CFFF',
    backgroundColor: '#EEF2FF',
  },
  favoriteIconBox: {
    borderColor: '#FCD34D',
    backgroundColor: '#FEF3C7',
  },
  titleBlock: { flex: 1 },
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

  // ── Bottom row ────────────────────────────────────────────────────────────────
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  },
});

export default SupplierCard;
