import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  onFilterPress,
  resultsText,
  placeholder = "Search...",
  isMatrics = false,
}) => {
  return (
    <View style={isMatrics ? styles.searchSectionMatrics : styles.searchSection}>
      <View style={styles.searchInputContainer}>
        <Search size={18} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity onPress={onFilterPress} style={styles.filterIconBtn}>
          <SlidersHorizontal size={18} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      {resultsText !== undefined && (
        <Text style={styles.resultsText}>{resultsText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: { paddingHorizontal: 20, marginBottom: 12 },
  searchSectionMatrics: { marginBottom: 12 },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 999,
    paddingHorizontal: 14,
    height: 46
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#111827', height: '100%' },
  filterIconBtn: { padding: 4 },
  resultsText: { fontSize: 12, color: '#6B7280', marginTop: 10, fontWeight: '500' },
});

export default SearchBar;
