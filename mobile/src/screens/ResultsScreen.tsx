import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme';
import { SearchParams, pluralCount } from '../components/SearchCard';
import { formatDate } from '../components/DatePickerModal';

interface ResultsScreenProps {
  params: SearchParams;
  onBack: () => void;
}

interface Hotel {
  id: string;
  name: string;
  area: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
}

const HOTELS: Hotel[] = [
  { id: '1', name: 'The Grand Palace', area: 'City Centre', rating: 4.8, reviews: 1240, price: 129, image: 'https://picsum.photos/seed/tiqet-h1/600/400' },
  { id: '2', name: 'Riverside Suites', area: 'Old Town', rating: 4.6, reviews: 860, price: 98, image: 'https://picsum.photos/seed/tiqet-h2/600/400' },
  { id: '3', name: 'Sunset Bay Resort', area: 'Beachfront', rating: 4.9, reviews: 2110, price: 210, image: 'https://picsum.photos/seed/tiqet-h3/600/400' },
  { id: '4', name: 'Metro Boutique Hotel', area: 'Downtown', rating: 4.4, reviews: 540, price: 76, image: 'https://picsum.photos/seed/tiqet-h4/600/400' },
  { id: '5', name: 'The Garden Inn', area: 'Green District', rating: 4.5, reviews: 730, price: 88, image: 'https://picsum.photos/seed/tiqet-h5/600/400' },
];

export default function ResultsScreen({ params, onBack }: ResultsScreenProps) {
  const guestCount = params.adults + params.children;

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} hitSlop={8} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.navy} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1}>
            {params.destination || 'All destinations'}
          </Text>
          <Text style={styles.subtitle} numberOfLines={2}>
            {formatDate(params.checkIn)} → {formatDate(params.checkOut)}
            {'  ·  '}
            {pluralCount(params.rooms, 'Room', 'Rooms')}
            {'  ·  '}
            {pluralCount(guestCount, 'Guest', 'Guests')}
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {HOTELS.map((hotel) => (
          <View key={hotel.id} style={styles.card}>
            <Image source={{ uri: hotel.image }} style={styles.image} />
            <View style={styles.cardBody}>
              <Text style={styles.hotelName}>{hotel.name}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={13} color={colors.orange} />
                <Text style={styles.ratingText}>{hotel.rating.toFixed(1)}</Text>
                <Text style={styles.reviewsText}>({hotel.reviews.toLocaleString()})</Text>
                <Text style={styles.areaText} numberOfLines={1}> · {hotel.area}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.price}>${hotel.price}</Text>
                <Text style={styles.perNight}>/ night</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  backButton: { padding: 4 },
  headerText: { flex: 1 },
  title: { fontSize: 18, fontWeight: '800', color: colors.textPrimary },
  subtitle: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  list: { padding: 14, gap: 12, paddingBottom: 32 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  image: { width: '100%', height: 170, backgroundColor: colors.borderLight },
  cardBody: { padding: 14 },
  hotelName: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  ratingText: { fontSize: 13, fontWeight: '700', color: colors.textPrimary },
  reviewsText: { fontSize: 12, color: colors.textMuted },
  areaText: { fontSize: 12, color: colors.textSecondary, flex: 1 },
  priceRow: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 10 },
  price: { fontSize: 20, fontWeight: '800', color: colors.agodaBlue },
  perNight: { fontSize: 12, color: colors.textSecondary, marginBottom: 2 },
});
