import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import TopHeader from './src/components/TopHeader';
import VipBadge from './src/components/VipBadge';
import TabCards, { HomeTab } from './src/components/TabCards';
import SearchCard from './src/components/SearchCard';
import WelcomeGiftPack from './src/components/WelcomeGiftPack';
import ExploreMore from './src/components/ExploreMore';
import BottomCouponBar from './src/components/BottomCouponBar';
import { colors } from './src/theme';

export default function App() {
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
          <SearchCard />
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
