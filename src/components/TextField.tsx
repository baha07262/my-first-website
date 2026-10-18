import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { palette, shape } from '../constants/palette';

type Props = TextInputProps & {
  icon: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
};

export default function TextField({
  icon,
  isPassword = false,
  onFocus,
  onBlur,
  style,
  ...rest
}: Props) {
  const [active, setActive] = useState(false);
  const [masked, setMasked] = useState(isPassword);

  return (
    <View style={[styles.box, active && styles.boxActive]}>
      <Ionicons name={icon} size={19} color={active ? palette.brand : palette.hint} />
      <TextInput
        {...rest}
        style={[styles.input, style]}
        placeholderTextColor={palette.hint}
        secureTextEntry={masked}
        autoCapitalize={rest.autoCapitalize ?? 'none'}
        onFocus={(e) => {
          setActive(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setActive(false);
          onBlur?.(e);
        }}
      />
      {isPassword ? (
        <Pressable hitSlop={10} onPress={() => setMasked((m) => !m)}>
          <Ionicons name={masked ? 'eye-outline' : 'eye-off-outline'} size={19} color={palette.hint} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
    borderRadius: shape.field,
    borderWidth: 1.5,
    borderColor: palette.line,
    backgroundColor: palette.white,
  },
  boxActive: { borderColor: palette.brand },
  input: { flex: 1, fontSize: 15, color: palette.ink, paddingVertical: 0 },
});
