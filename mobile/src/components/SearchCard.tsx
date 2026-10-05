import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export default function SearchCard() {
  const [destination, setDestination] = useState('');

  return (
    <View style={styles.card}>
      <View style={styles.destinationField}>
        <Ionicons name="search" size={17} color={colors.textSecondary} />
        <TextInput
          style={styles.destinationInput}
          placeholder="Where would you like to go?"
          placeholderTextColor={colors.textMuted}
          value={destination}
          onChangeText={setDestination}
        />
      </View>

      <View style={styles.datesRow}>
        <View style={[styles.dateCell, styles.dateCellFirst]}>
          <Ionicons name="calendar-outline" size={18} color={colors.navy} />
          <View style={styles.dateContent}>
            <Text style={styles.dateLabel}>Check-in</Text>
            <Text style={styles.dateValue}>Sun, Oct 4</Text>
          </View>
        </View>
        <View style={styles.dateCell}>
          <Ionicons name="calendar-outline" size={18} color={colors.navy} />
          <View style={styles.dateContent}>
            <Text style={styles.dateLabel}>Check-out</Text>
            <Text style={styles.dateValue}>Mon, Oct 5</Text>
          </View>
        </View>
      </View>

      <View style={styles.guestsField}>
        <Ionicons name="person-outline" size={18} color={colors.navy} />
        <Text style={styles.guestsText}>
          <Text style={styles.guestsNumber}>1</Text> Room,{' '}
          <Text style={styles.guestsNumber}>2</Text> Adults,{' '}
          <Text style={styles.guestsNumber}>0</Text> Children
        </Text>
      </View>

      <TouchableOpacity style={styles.searchButton} activeOpacity={0.9}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  destinationField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1.5,
    borderColor: colors.agodaBlue,
    borderRadius: 10,
    marginBottom: 10,
  },
  destinationInput: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    padding: 0,
  },
  datesRow: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  dateCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dateCellFirst: {
    borderRightWidth: 1,
    borderRightColor: colors.borderLight,
  },
  dateContent: { flex: 1 },
  dateLabel: { fontSize: 12, color: colors.textSecondary, marginBottom: 2 },
  dateValue: { fontSize: 16, fontWeight: '700', color: colors.agodaBlue },
  guestsField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    borderRadius: 10,
    marginBottom: 14,
  },
  guestsText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  guestsNumber: { color: colors.agodaBlue, fontWeight: '700' },
  searchButton: {
    backgroundColor: colors.agodaBlue,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: colors.agodaBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  searchButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
});
