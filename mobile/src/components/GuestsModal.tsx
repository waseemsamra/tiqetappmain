import React, { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

interface GuestsModalProps {
  visible: boolean;
  rooms: number;
  adults: number;
  children: number;
  onApply: (rooms: number, adults: number, children: number) => void;
  onClose: () => void;
}

interface StepperProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

function Stepper({ label, value, min, max, onChange }: StepperProps) {
  const atMin = value <= min;
  const atMax = value >= max;
  return (
    <View style={styles.stepperRow}>
      <Text style={styles.stepperLabel}>{label}</Text>
      <View style={styles.stepperControls}>
        <TouchableOpacity
          style={styles.stepperButton}
          onPress={() => onChange(Math.max(min, value - 1))}
          disabled={atMin}
          hitSlop={6}
        >
          <Ionicons name="remove" size={18} color={atMin ? colors.textMuted : colors.agodaBlue} />
        </TouchableOpacity>
        <Text style={styles.stepperValue}>{value}</Text>
        <TouchableOpacity
          style={styles.stepperButton}
          onPress={() => onChange(Math.min(max, value + 1))}
          disabled={atMax}
          hitSlop={6}
        >
          <Ionicons name="add" size={18} color={atMax ? colors.textMuted : colors.agodaBlue} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function GuestsModal({
  visible,
  rooms,
  adults,
  children,
  onApply,
  onClose,
}: GuestsModalProps) {
  const [r, setR] = useState(rooms);
  const [a, setA] = useState(adults);
  const [c, setC] = useState(children);

  useEffect(() => {
    if (visible) {
      setR(rooms);
      setA(adults);
      setC(children);
    }
  }, [visible, rooms, adults, children]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Guests</Text>
          <Stepper label="Rooms" value={r} min={1} max={8} onChange={setR} />
          <Stepper label="Adults" value={a} min={1} max={10} onChange={setA} />
          <Stepper label="Children" value={c} min={0} max={8} onChange={setC} />
          <TouchableOpacity
            style={styles.applyButton}
            activeOpacity={0.9}
            onPress={() => {
              onApply(r, a, c);
              onClose();
            }}
          >
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
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
    marginBottom: 8,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  stepperLabel: { fontSize: 15, color: colors.textPrimary, fontWeight: '500' },
  stepperControls: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  stepperButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperValue: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, minWidth: 16, textAlign: 'center' },
  applyButton: {
    backgroundColor: colors.agodaBlue,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  applyText: { color: colors.white, fontSize: 15, fontWeight: '700' },
});
