import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export default function VipBadge() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.badge}>
        <View style={styles.vipPart}>
          <Ionicons name="star" size={11} color={colors.gold} />
          <Text style={styles.vipText}>VIP</Text>
        </View>
        <View style={styles.platinumPart}>
          <Text style={styles.platinumText}>Platinum</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center', marginBottom: 18 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  vipPart: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.darkBadge,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  vipText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  platinumPart: {
    backgroundColor: colors.purple,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  platinumText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
