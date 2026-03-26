import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Switch } from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';
import CustomButton from './CustomButton';
import { COLORS } from '../constants/colors';

const FilterModal = ({
  visible,
  onClose,
  retailers = [],
  regions = [],
  selectedRetailer,
  setSelectedRetailer,
  selectedRegion,
  setSelectedRegion,
  sortAZ,
  setSortAZ,
  favoritesOnly,
  setFavoritesOnly,
  onApply,
  showFavorites = true,   // set false for product list filters
  retailerLabel = 'Retailer',   // e.g. 'Categories', 'Store Banner'
  regionLabel = 'Region',        // e.g. 'Suppliers', 'Region'
  retailerPlaceholder,  // defaults to 'All {retailerLabel}s'
  regionPlaceholder,    // defaults to 'All {regionLabel}s'
}) => {
  const [openDropdown, setDropdownOpen] = useState(null);
  const retPlaceholder = retailerPlaceholder || `All ${retailerLabel}s`;
  const regPlaceholder = regionPlaceholder || `All ${regionLabel}s`;

  const toggleDropdown = (name) => {
    setDropdownOpen(openDropdown === name ? null : name);
  };

  const renderDropdownList = (options, selectedValue, onSelect) => (
    <View style={styles.dropdownMenu}>
      <TouchableOpacity 
        style={styles.dropdownMenuItem} 
        onPress={() => { onSelect(''); setDropdownOpen(null); }}
      >
        <Text style={[styles.dropdownMenuItemText, !selectedValue && styles.dropdownMenuItemTextActive]}>
          All Options
        </Text>
        {!selectedValue && <Check size={16} color={COLORS.primary} />}
      </TouchableOpacity>
      {options.map(opt => (
        <TouchableOpacity 
          key={opt}
          style={styles.dropdownMenuItem} 
          onPress={() => { onSelect(opt); setDropdownOpen(null); }}
        >
          <Text style={[styles.dropdownMenuItemText, selectedValue === opt && styles.dropdownMenuItemTextActive]}>
            {opt}
          </Text>
          {selectedValue === opt && <Check size={16} color={COLORS.primary} />}
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity activeOpacity={1} style={styles.bottomSheet}>
          
          {/* Drag Handle */}
          <View style={styles.dragHandle} />

          <Text style={styles.sheetTitle}>Filters & Sorting</Text>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
            
            {/* Quick Filters Card */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Quick Filters</Text>
              <Text style={styles.cardSubtitle}>Filter by category and location</Text>
              
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>{retailerLabel}</Text>
                <TouchableOpacity 
                  style={[styles.dropdownBox, openDropdown === 'retailer' && styles.dropdownBoxActive]} 
                  onPress={() => toggleDropdown('retailer')}
                >
                  <Text style={[styles.dropdownText, selectedRetailer && styles.dropdownTextSelected]}>
                    {selectedRetailer || retPlaceholder}
                  </Text>
                  <ChevronDown size={18} color="#9CA3AF" />
                </TouchableOpacity>
                {openDropdown === 'retailer' && renderDropdownList(retailers, selectedRetailer, setSelectedRetailer)}
              </View>

              <View style={[styles.fieldContainer, { marginBottom: 0 }]}>
                <Text style={styles.fieldLabel}>{regionLabel}</Text>
                <TouchableOpacity 
                  style={[styles.dropdownBox, openDropdown === 'region' && styles.dropdownBoxActive]} 
                  onPress={() => toggleDropdown('region')}
                >
                  <Text style={[styles.dropdownText, selectedRegion && styles.dropdownTextSelected]}>
                    {selectedRegion || regPlaceholder}
                  </Text>
                  <ChevronDown size={18} color="#9CA3AF" />
                </TouchableOpacity>
                {openDropdown === 'region' && renderDropdownList(regions, selectedRegion, setSelectedRegion)}
              </View>
            </View>

            {/* Sort Order Card */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Sort Order</Text>
              <Text style={styles.cardSubtitle}>Arrange stores by preference</Text>
              
              <View style={[styles.fieldContainer, { marginBottom: 0 }]}>
                <Text style={styles.fieldLabel}>Sort By</Text>
                <TouchableOpacity 
                  style={[styles.dropdownBox, openDropdown === 'sort' && styles.dropdownBoxActive]} 
                  onPress={() => toggleDropdown('sort')}
                >
                  <Text style={[styles.dropdownText, sortAZ && styles.dropdownTextSelected]}>
                    {sortAZ ? 'A-Z Store Name' : 'Default Default'}
                  </Text>
                  <ChevronDown size={18} color="#9CA3AF" />
                </TouchableOpacity>
                {openDropdown === 'sort' && (
                  <View style={styles.dropdownMenu}>
                    <TouchableOpacity 
                      style={styles.dropdownMenuItem} 
                      onPress={() => { setSortAZ(false); setDropdownOpen(null); }}
                    >
                      <Text style={[styles.dropdownMenuItemText, !sortAZ && styles.dropdownMenuItemTextActive]}>
                        Default Sort
                      </Text>
                      {!sortAZ && <Check size={16} color={COLORS.primary} />}
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.dropdownMenuItem} 
                      onPress={() => { setSortAZ(true); setDropdownOpen(null); }}
                    >
                      <Text style={[styles.dropdownMenuItemText, sortAZ && styles.dropdownMenuItemTextActive]}>
                        A-Z Store Name
                      </Text>
                      {sortAZ && <Check size={16} color={COLORS.primary} />}
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>

            {/* Favorites Card — hidden for product list filters */}
            {showFavorites && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Favorites</Text>
                <Text style={styles.cardSubtitle}>Show only favorite stores</Text>
                <View style={styles.switchRow}>
                  <Text style={styles.switchLabel}>Show Favorites Only</Text>
                  <Switch
                    value={favoritesOnly}
                    onValueChange={setFavoritesOnly}
                    trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
                    thumbColor={'#FFFFFF'}
                    ios_backgroundColor="#E5E7EB"
                  />
                </View>
              </View>
            )}

          </ScrollView>

          {/* Footer Action */}
          <View style={styles.sheetFooter}>
            <CustomButton 
              title="Apply Filters" 
              onPress={onApply} 
              style={{ width: '100%', borderRadius: 16 }} 
            />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'flex-end' 
  },
  bottomSheet: { 
    backgroundColor: '#FFFFFF', 
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24, 
    paddingHorizontal: 20,
    paddingBottom: 20,
    maxHeight: '90%' 
  },
  dragHandle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 24
  },
  sheetTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#111827',
    marginBottom: 20
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 16
  },
  fieldContainer: {
    marginBottom: 16
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8
  },
  dropdownBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 44,
    backgroundColor: '#FFFFFF'
  },
  dropdownBoxActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#EEF2FF',
  },
  dropdownText: {
    fontSize: 14,
    color: '#6B7280'
  },
  dropdownTextSelected: {
    color: '#111827',
  },
  dropdownMenu: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden'
  },
  dropdownMenuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6'
  },
  dropdownMenuItemText: {
    fontSize: 14,
    color: '#4B5563'
  },
  dropdownMenuItemTextActive: {
    color: COLORS.primary,
    fontWeight: 'bold'
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 44,
    backgroundColor: '#FFFFFF'
  },
  switchLabel: {
    fontSize: 14,
    color: '#111827'
  },
  sheetFooter: { 
    paddingTop: 16,
    backgroundColor: '#FFFFFF'
  }
});

export default FilterModal;
