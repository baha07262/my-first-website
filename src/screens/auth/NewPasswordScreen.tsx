import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootRoutes } from '../../navigation/routes';
import { palette } from '../../constants/palette';
import BackArrow from '../../components/BackArrow';
import PrimaryButton from '../../components/PrimaryButton';
import TextField from '../../components/TextField';

type Props = NativeStackScreenProps<RootRoutes, 'NewPassword'>;

function Rule({ ok, text }: { ok: boolean; text: string }) {
  return (
    <View style={styles.rule}>
      <Ionicons
        name={ok ? 'checkmark-circle' : 'ellipse-outline'}
        size={16}
        color={ok ? palette.brand : palette.hint}
      />
      <Text style={[styles.ruleText, ok && { color: palette.ink }]}>{text}</Text>
    </View>
  );
}

export default function NewPasswordScreen({ navigation }: Props) {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');

  const longEnough = first.length >= 8;
  const hasCases = /[a-zа-яәіңғүұқөһ]/.test(first) && /[A-ZА-ЯӘІҢҒҮҰҚӨҺ]/.test(first);
  const same = first !== '' && first === second;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.wrap}>
        <View style={styles.top}>
          <BackArrow />
        </View>

        <View style={styles.middle}>
          <Text style={styles.h1}>Сбросить пароль</Text>
          <Text style={styles.sub}>Не менее 8 символов, с прописными и строчными буквами</Text>

          <View style={styles.form}>
            <TextField icon="lock-closed-outline" placeholder="Пароль" isPassword value={first} onChangeText={setFirst} />
            <TextField
              icon="lock-closed-outline"
              placeholder="Повторить пароль"
              isPassword
              value={second}
              onChangeText={setSecond}
            />

            <View style={styles.rules}>
              <Rule ok={longEnough} text="Минимум 8 символов" />
              <Rule ok={hasCases} text="Прописные и строчные буквы" />
              <Rule ok={same} text="Пароли совпадают" />
            </View>

            <PrimaryButton
              label="Продолжить"
              enabled={longEnough && hasCases && same}
              onPress={() => navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] })}
            />
          </View>
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
  sub: { fontSize: 13, color: palette.hint, textAlign: 'center', marginTop: 8, lineHeight: 19, maxWidth: 270 },
  form: { alignSelf: 'stretch', gap: 14, marginTop: 28 },
  rules: { gap: 6, paddingVertical: 4 },
  rule: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ruleText: { fontSize: 12, color: palette.hint },
});
