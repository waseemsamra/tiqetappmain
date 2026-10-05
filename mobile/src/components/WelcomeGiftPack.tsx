import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

interface GiftCard {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  action: string;
  withArrow: boolean;
}

const CARDS: GiftCard[] = [
  {
    icon: 'business',
    title: 'Up to 10% off (App)',
    subtitle: 'First hotel booking',
    action: 'Collect',
    withArrow: false,
  },
  {
    icon: 'airplane',
    title: 'Up to 8% off Flights',
    subtitle: 'First flight booking',
    action: '',
    withArrow: true,
  },
];

export default function WelcomeGiftPack() {
  return (
    <View style={styles.section}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Welcome gift pack!</Text>
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>New</Text>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {CARDS.map((card) => (
          <TouchableOpacity key={card.title} style={styles.card} activeOpacity={0.85}>
            <View style={styles.iconWrap}>
              <Ionicons name={card.icon} size={20} color={colors.agodaBlue} />
            </View>
            <View style={styles.content}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
            </View>
            {card.action ? <Text style={styles.action}>{card.action}</Text> : null}
            {card.withArrow ? (
              <View style={styles.arrowWrap}>
                <Ionicons name="chevron-forward" size={12} color={colors.agodaBlue} />
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.tealBgDark,
    paddingHorizontal: 14,
    paddingTop: 24,
    paddingBottom: 100,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '800', color: colors.white, lineHeight: 26 },
  newBadge: {
    backgroundColor: colors.red,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  newBadgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  scroll: { gap: 10, paddingRight: 14 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minWidth: 280,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.iconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: colors.textPrimary, lineHeight: 18 },
  cardSubtitle: { fontSize: 12, color: colors.textSecondary, lineHeight: 16, marginTop: 2 },
  action: { fontSize: 13, fontWeight: '700', color: colors.agodaBlue },
  arrowWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.iconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
