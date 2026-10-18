import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootRoutes } from '../../navigation/routes';
import { palette } from '../../constants/palette';
import BackArrow from '../../components/BackArrow';
import PrimaryButton from '../../components/PrimaryButton';
import TextField from '../../components/TextField';

type Props = NativeStackScreenProps<RootRoutes, 'PasswordHelp'>;

export default function PasswordHelpScreen({ navigation }: Props) {
  const [phone, setPhone] = useState('');

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.wrap}>
        <View style={styles.top}>
          <BackArrow />
        </View>

        <View style={styles.middle}>
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>🔑</Text>
          </View>
          <Text style={styles.h1}>Восстановление пароля</Text>
          <Text style={styles.sub}>Введите свой номер телефона, чтобы восстановить пароль</Text>

          <View style={styles.form}>
            <TextField
              icon="call-outline"
              placeholder="+7 (700) 555 77 55"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
            <PrimaryButton
              label="Продолжить"
              enabled={phone.replace(/\D/g, '').length >= 10}
              onPress={() => navigation.navigate('Otp', { phone: phone.trim() })}
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
  badge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: palette.brandSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIcon: { fontSize: 32 },
  h1: { fontSize: 20, fontWeight: '800', color: palette.ink, marginTop: 20 },
  sub: { fontSize: 13, color: palette.hint, textAlign: 'center', marginTop: 8, lineHeight: 19, maxWidth: 260 },
  form: { alignSelf: 'stretch', gap: 16, marginTop: 28 },
});
