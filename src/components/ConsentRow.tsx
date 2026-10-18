import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { palette } from '../constants/palette';

type Props = {
  value: boolean;
  onChange: (next: boolean) => void;
};

export default function ConsentRow({ value, onChange }: Props) {
  return (
    <Pressable style={styles.row} onPress={() => onChange(!value)}>
      <Ionicons
        name={value ? 'checkbox' : 'square-outline'}
        size={24}
        color={value ? palette.brand : palette.hint}
      />
      <Text style={styles.text}>
        Создавая учетную запись, вы соглашаетесь с нашими{' '}
        <Text style={styles.link}>Условиями</Text> использования.
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  text: { flex: 1, fontSize: 12, lineHeight: 17, color: palette.ink },
  link: { color: palette.brand, fontWeight: '600' },
});
