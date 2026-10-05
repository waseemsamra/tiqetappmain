import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export type HomeTab = 'hotels' | 'flightHotel' | 'flights' | 'activities';

interface TabCardsProps {
  activeTab: HomeTab;
  onTabPress: (tab: HomeTab) => void;
}

const TABS: { key: HomeTab; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'hotels', label: 'Hotels', icon: 'bed' },
  { key: 'flightHotel', label: 'Flight + Hotel', icon: 'airplane' },
  { key: 'flights', label: 'Flights', icon: 'airplane-outline' },
  { key: 'activities', label: 'Activities', icon: 'ticket' },
];

export default function TabCards({ activeTab, onTabPress }: TabCardsProps) {
  return (
    <View style={styles.row}>
      {TABS.map((tab) => {
        const active = tab.key === activeTab;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.card, active && styles.cardActive]}
            onPress={() => onTabPress(tab.key)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={tab.icon}
              size={26}
              color={active ? colors.agodaBlue : colors.white}
            />
            <Text style={[styles.label, active && styles.labelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 6,
    minHeight: 88,
  },
  cardActive: { backgroundColor: colors.white },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
    lineHeight: 16,
  },
  labelActive: { color: colors.agodaBlue, fontWeight: '700' },
});
