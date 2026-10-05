import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, logoDotColors } from '../theme';

interface TopHeaderProps {
  onMenuPress?: () => void;
}

export default function TopHeader({ onMenuPress }: TopHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.spacer} />
      <View style={styles.logo}>
        <Text style={styles.logoText}>tiqet</Text>
        <View style={styles.dots}>
          {logoDotColors.map((dotColor) => (
            <View key={dotColor} style={[styles.dot, { backgroundColor: dotColor }]} />
          ))}
        </View>
      </View>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton} hitSlop={8}>
        <Ionicons name="menu" size={24} color={colors.navy} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.headerBorder,
  },
  spacer: { width: 32 },
  logo: { alignItems: 'center' },
  logoText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.navy,
    letterSpacing: -0.5,
  },
  dots: { flexDirection: 'row', marginTop: 2, gap: 3 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  menuButton: { width: 32, alignItems: 'flex-end' },
});
