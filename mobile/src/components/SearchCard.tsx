import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import DatePickerModal, { addDays, addDaysTo, formatDate } from './DatePickerModal';
import GuestsModal from './GuestsModal';

export interface SearchParams {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  rooms: number;
  adults: number;
  children: number;
}

interface SearchCardProps {
  onSearch: (params: SearchParams) => void;
}

type OpenModal = 'checkIn' | 'checkOut' | 'guests' | null;

export function pluralCount(count: number, one: string, many: string): string {
  return `${count} ${count === 1 ? one : many}`;
}

export default function SearchCard({ onSearch }: SearchCardProps) {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState(() => addDays(0));
  const [checkOut, setCheckOut] = useState(() => addDays(1));
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [openModal, setOpenModal] = useState<OpenModal>(null);

  const guestsLabel = `${pluralCount(rooms, 'Room', 'Rooms')}, ${pluralCount(adults, 'Adult', 'Adults')}, ${pluralCount(children, 'Child', 'Children')}`;

  const handleCheckInSelect = (date: Date) => {
    setCheckIn(date);
    if (date >= checkOut) {
      setCheckOut(addDaysTo(date, 1));
    }
  };

  const handleSearch = () => {
    onSearch({
      destination: destination.trim(),
      checkIn,
      checkOut,
      rooms,
      adults,
      children,
    });
  };

  return (
    <>
      <View style={styles.card}>
        <View style={styles.destinationField}>
          <Ionicons name="search" size={17} color={colors.textSecondary} />
          <TextInput
            style={styles.destinationInput}
            placeholder="Where would you like to go?"
            placeholderTextColor={colors.textMuted}
            value={destination}
            onChangeText={setDestination}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
        </View>

        <View style={styles.datesRow}>
          <TouchableOpacity
            style={[styles.dateCell, styles.dateCellFirst]}
            onPress={() => setOpenModal('checkIn')}
            activeOpacity={0.7}
          >
            <Ionicons name="calendar-outline" size={18} color={colors.navy} />
            <View style={styles.dateContent}>
              <Text style={styles.dateLabel}>Check-in</Text>
              <Text style={styles.dateValue}>{formatDate(checkIn)}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dateCell}
            onPress={() => setOpenModal('checkOut')}
            activeOpacity={0.7}
          >
            <Ionicons name="calendar-outline" size={18} color={colors.navy} />
            <View style={styles.dateContent}>
              <Text style={styles.dateLabel}>Check-out</Text>
              <Text style={styles.dateValue}>{formatDate(checkOut)}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.guestsField}
          onPress={() => setOpenModal('guests')}
          activeOpacity={0.7}
        >
          <Ionicons name="person-outline" size={18} color={colors.navy} />
          <Text style={styles.guestsText}>{guestsLabel}</Text>
          <Ionicons name="chevron-down" size={14} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.searchButton} activeOpacity={0.9} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <DatePickerModal
        visible={openModal === 'checkIn'}
        title="Check-in date"
        selectedDate={checkIn}
        onSelect={handleCheckInSelect}
        onClose={() => setOpenModal(null)}
      />
      <DatePickerModal
        visible={openModal === 'checkOut'}
        title="Check-out date"
        selectedDate={checkOut}
        minDate={addDaysTo(checkIn, 1)}
        onSelect={setCheckOut}
        onClose={() => setOpenModal(null)}
      />
      <GuestsModal
        visible={openModal === 'guests'}
        rooms={rooms}
        adults={adults}
        children={children}
        onApply={(r, a, c) => {
          setRooms(r);
          setAdults(a);
          setChildren(c);
        }}
        onClose={() => setOpenModal(null)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  destinationField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1.5,
    borderColor: colors.agodaBlue,
    borderRadius: 10,
    marginBottom: 10,
  },
  destinationInput: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    padding: 0,
  },
  datesRow: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  dateCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dateCellFirst: {
    borderRightWidth: 1,
    borderRightColor: colors.borderLight,
  },
  dateContent: { flex: 1 },
  dateLabel: { fontSize: 12, color: colors.textSecondary, marginBottom: 2 },
  dateValue: { fontSize: 16, fontWeight: '700', color: colors.agodaBlue },
  guestsField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    borderRadius: 10,
    marginBottom: 14,
  },
  guestsText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  searchButton: {
    backgroundColor: colors.agodaBlue,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: colors.agodaBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  searchButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
});
