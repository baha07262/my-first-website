import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { palette, shape } from '../constants/palette';

type Props = {
  label: string;
  onPress: () => void;
  enabled?: boolean;
  style?: ViewStyle;
};

export default function PrimaryButton({ label, onPress, enabled = true, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!enabled}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: !enabled ? palette.line : pressed ? palette.brandDeep : palette.brand },
        style,
      ]}
    >
      <Text style={[styles.label, !enabled && { color: palette.hint }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: shape.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { color: palette.white, fontSize: 15, fontWeight: '600', letterSpacing: 0.2 },
});
