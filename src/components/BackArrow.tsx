import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { palette } from '../constants/palette';

export default function BackArrow() {
  const nav = useNavigation();

  if (!nav.canGoBack()) return null;

  return (
    <Pressable onPress={() => nav.goBack()} style={styles.circle} hitSlop={8}>
      <Ionicons name="chevron-back" size={22} color={palette.ink} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
