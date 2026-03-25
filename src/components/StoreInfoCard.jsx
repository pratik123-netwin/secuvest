import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Building } from 'lucide-react-native';

const StoreInfoCard = ({ storeName, status, dateString, timeString, totalHours }) => {
  return (
    <View style={styles.infoCard}>
      <View style={styles.cardTop}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardLabel}>Store</Text>
          <Text style={styles.storeName}>{storeName}</Text>
        </View>
        <View style={styles.buildingIconBox}>
          <Building size={20} color="#FFFFFF" />
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Type:</Text>
        <Text style={styles.detailValue}>{status === 'Away' ? 'Offline Visit' : 'On-site'}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Date:</Text>
        <Text style={styles.detailValue}>{dateString}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Time:</Text>
        <Text style={styles.detailValue}>{timeString}</Text>
      </View>

      {totalHours && (
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total Hours locked:</Text>
          <Text style={styles.detailValue}>{totalHours}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEAED',
    padding: 15,
    marginBottom: 24
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  cardLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4
  },
  storeName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827'
  },
  buildingIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 10
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  detailLabel: {
    fontSize: 12,
    color: '#414651'
  },
  detailValue: {
    fontSize: 12,
    color: '#535862',
    fontWeight: '500'
  }
});

export default StoreInfoCard;
