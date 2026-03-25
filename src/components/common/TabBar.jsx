import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TabBar = ({ tabs, activeTab, onTabPress }) => (
  <View style={styles.container}>
    {tabs.map((tab) => {
      const isActive = activeTab === tab;
      return (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, isActive && styles.activeTab]}
          onPress={() => onTabPress(tab)}
          activeOpacity={0.8}
        >
          <Text style={[styles.label, isActive && styles.activeLabel]}>{tab}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: { backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 1 }, elevation: 2 },
  label: { fontSize: 14, fontWeight: '500', color: '#6B7280' },
  activeLabel: { color: '#111827', fontWeight: '700' },
});

export default TabBar;
