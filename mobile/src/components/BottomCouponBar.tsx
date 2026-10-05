import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

interface BottomCouponBarProps {
  onClose: () => void;
}

export default function BottomCouponBar({ onClose }: BottomCouponBarProps) {
  return (
    <View style={styles.bar}>
      <TouchableOpacity onPress={onClose} hitSlop={8} style={styles.closeButton}>
        <Ionicons name="close" size={18} color={colors.textSecondary} />
      </TouchableOpacity>
      <View style={styles.icon}>
        <Ionicons name="pricetag" size={15} color={colors.white} />
        <View style={styles.iconDot} />
      </View>
      <Text style={styles.text}>Find Coupons & Deals</Text>
      <TouchableOpacity style={styles.viewAllButton} activeOpacity={0.8}>
        <Text style={styles.viewAllText}>View all</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 20,
  },
  closeButton: { padding: 4 },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.red,
    borderWidth: 2,
    borderColor: colors.white,
  },
  text: { flex: 1, fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  viewAllButton: {
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  viewAllText: { fontSize: 13, fontWeight: '700', color: colors.agodaBlue },
});
