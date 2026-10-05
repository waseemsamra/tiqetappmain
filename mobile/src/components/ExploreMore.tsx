import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme';

const ITEMS = [
  { icon: 'sim', label: 'eSIM' },
  { icon: 'taxi', label: 'Airport Transfer' },
  { icon: 'car', label: 'Car Rental' },
] as const;

export default function ExploreMore() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Explore more</Text>
      <View style={styles.grid}>
        {ITEMS.map((item) => (
          <TouchableOpacity key={item.label} style={styles.card} activeOpacity={0.8}>
            <MaterialCommunityIcons name={item.icon} size={22} color={colors.white} />
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.tealBgDark,
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 14,
  },
  grid: { flexDirection: 'row', gap: 8 },
  card: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
    lineHeight: 15,
  },
});
