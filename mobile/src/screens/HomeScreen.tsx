import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import TopHeader from '../components/TopHeader';
import VipBadge from '../components/VipBadge';
import TabCards, { HomeTab } from '../components/TabCards';
import SearchCard, { SearchParams } from '../components/SearchCard';
import WelcomeGiftPack from '../components/WelcomeGiftPack';
import ExploreMore from '../components/ExploreMore';
import BottomCouponBar from '../components/BottomCouponBar';
import { colors } from '../theme';

interface HomeScreenProps {
  onSearch: (params: SearchParams) => void;
}

export default function HomeScreen({ onSearch }: HomeScreenProps) {
  const [activeTab, setActiveTab] = useState<HomeTab>('hotels');
  const [couponBarVisible, setCouponBarVisible] = useState(true);

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TopHeader />
        <View style={styles.tealSection}>
          <VipBadge />
          <TabCards activeTab={activeTab} onTabPress={setActiveTab} />
          <SearchCard onSearch={onSearch} />
        </View>
        <View style={styles.darkTealSection}>
          <WelcomeGiftPack />
          <ExploreMore />
        </View>
      </ScrollView>
      {couponBarVisible && <BottomCouponBar onClose={() => setCouponBarVisible(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  scrollContent: { paddingBottom: 100 },
  tealSection: {
    backgroundColor: colors.tealBg,
    paddingHorizontal: 14,
    paddingTop: 20,
    paddingBottom: 40,
  },
  darkTealSection: {
    backgroundColor: colors.tealBgDark,
  },
});
