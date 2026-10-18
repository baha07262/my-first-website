import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootRoutes } from '../../navigation/routes';
import { palette, shape } from '../../constants/palette';
import BackArrow from '../../components/BackArrow';
import PrimaryButton from '../../components/PrimaryButton';

type Props = NativeStackScreenProps<RootRoutes, 'Otp'>;

const LENGTH = 4;
const WAIT = 30;

export default function OtpScreen({ navigation, route }: Props) {
  const [code, setCode] = useState('');
  const [left, setLeft] = useState(WAIT);
  const hiddenInput = useRef<TextInput>(null);

  // Бір ғана жасырын input бар, ал төрт «қорап» тек оның мәнін көрсетеді
  useEffect(() => {
    hiddenInput.current?.focus();
  }, []);

  useEffect(() => {
    if (left === 0) return;
    const timer = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [left === 0]);

  const resend = () => {
    setCode('');
    setLeft(WAIT);
    hiddenInput.current?.focus();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.wrap}>
        <View style={styles.top}>
          <BackArrow />
        </View>

        <View style={styles.middle}>
          <Text style={styles.h1}>Подтвердить номер</Text>
          <Text style={styles.sub}>Мы только что отправили код на</Text>
          <Text style={styles.phone}>{route.params.phone}</Text>

          <Pressable style={styles.boxes} onPress={() => hiddenInput.current?.focus()}>
            {Array.from({ length: LENGTH }, (_, i) => (
              <View key={i} style={[styles.box, code.length === i && styles.boxCurrent]}>
                <Text style={styles.digit}>{code[i] ?? ''}</Text>
              </View>
            ))}
          </Pressable>

          <TextInput
            ref={hiddenInput}
            value={code}
            onChangeText={(t) => setCode(t.replace(/\D/g, '').slice(0, LENGTH))}
            keyboardType="number-pad"
            maxLength={LENGTH}
            style={styles.hidden}
          />

          <PrimaryButton
            label="Продолжить"
            enabled={code.length === LENGTH}
            onPress={() => navigation.navigate('NewPassword')}
            style={styles.btn}
          />

          <Pressable disabled={left > 0} onPress={resend} style={styles.resend}>
            <Text style={[styles.resendText, left === 0 && { color: palette.brand, fontWeight: '600' }]}>
              {left > 0 ? `Отправить код ещё раз через ${left} с` : 'Отправить код ещё раз'}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.white },
  wrap: { flex: 1, paddingHorizontal: 24 },
  top: { height: 40, marginTop: 8 },
  middle: { marginTop: 40, alignItems: 'center' },
  h1: { fontSize: 20, fontWeight: '800', color: palette.ink },
  sub: { fontSize: 13, color: palette.hint, marginTop: 8 },
  phone: { fontSize: 13, color: palette.ink, fontWeight: '700', marginTop: 2 },
  boxes: { flexDirection: 'row', gap: 12, marginTop: 28 },
  box: {
    width: 60,
    height: 64,
    borderRadius: shape.field,
    borderWidth: 1.5,
    borderColor: palette.line,
    backgroundColor: palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxCurrent: { borderColor: palette.brand, backgroundColor: palette.white },
  digit: { fontSize: 24, fontWeight: '800', color: palette.ink },
  hidden: { position: 'absolute', width: 1, height: 1, opacity: 0 },
  btn: { alignSelf: 'stretch', marginTop: 28 },
  resend: { marginTop: 20 },
  resendText: { fontSize: 13, color: palette.hint },
});
