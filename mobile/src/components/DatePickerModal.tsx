import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../theme';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export function addDays(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

export function addDaysTo(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function formatDate(date: Date): string {
  return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

interface DatePickerModalProps {
  visible: boolean;
  title: string;
  selectedDate: Date;
  minDate?: Date;
  onSelect: (date: Date) => void;
  onClose: () => void;
}

export default function DatePickerModal({
  visible,
  title,
  selectedDate,
  minDate,
  onSelect,
  onClose,
}: DatePickerModalProps) {
  const days = Array.from({ length: 14 }, (_, i) => addDays(i));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.sheet}>
          <Text style={styles.title}>{title}</Text>
          {days.map((d) => {
            const disabled = !!minDate && d < minDate;
            const selected = d.toDateString() === selectedDate.toDateString();
            const label = formatDate(d);
            return (
              <TouchableOpacity
                key={d.toDateString()}
                style={[
                  styles.option,
                  selected && styles.optionSelected,
                  disabled && styles.optionDisabled,
                ]}
                disabled={disabled}
                onPress={() => {
                  onSelect(d);
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    selected && styles.optionTextSelected,
                    disabled && styles.optionTextDisabled,
                  ]}
                >
                  {label}
                  {d.toDateString() === new Date().toDateString() ? ' (Today)' : ''}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  sheet: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  optionSelected: { backgroundColor: colors.iconBg },
  optionDisabled: { opacity: 0.35 },
  optionText: { fontSize: 15, color: colors.textPrimary },
  optionTextSelected: { color: colors.agodaBlue, fontWeight: '700' },
  optionTextDisabled: { color: colors.textMuted },
});
