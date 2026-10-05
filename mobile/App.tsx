import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import { SearchParams } from './src/components/SearchCard';

export default function App() {
  const [screen, setScreen] = useState<'home' | 'results'>('home');
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  return (
    <SafeAreaView style={styles.root}>
      {screen === 'results' && searchParams ? (
        <ResultsScreen
          params={searchParams}
          onBack={() => setScreen('home')}
        />
      ) : (
        <HomeScreen
          onSearch={(params) => {
            setSearchParams(params);
            setScreen('results');
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
});
