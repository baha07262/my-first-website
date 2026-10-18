import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootRoutes } from '../../navigation/routes';
import { palette } from '../../constants/palette';
import { useSession } from '../../store/SessionStore';
import BackArrow from '../../components/BackArrow';
import ConsentRow from '../../components/ConsentRow';
import PrimaryButton from '../../components/PrimaryButton';
import TextField from '../../components/TextField';

type Props = NativeStackScreenProps<RootRoutes, 'SignUp'>;

export default function SignUpScreen({ navigation }: Props) {
  const { patch } = useSession();
  const [form, setForm] = useState({ name: '', phone: '', pass: '' });
  const [agreed, setAgreed] = useState(false);

  const setField = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const valid = form.name.trim() !== '' && form.phone.trim() !== '' && form.pass.length >= 6 && agreed;

  const submit = () => {
    patch({ name: form.name.trim(), phone: form.phone.trim() });
    navigation.navigate('CityPicker');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.top}>
          <BackArrow />
        </View>

        <Text style={styles.h1}>Регистрация</Text>
        <Text style={styles.sub}>Создайте учетную запись, чтобы продолжить!</Text>

        <View style={styles.fields}>
          <TextField
            icon="person-outline"
            placeholder="Ваше имя"
            autoCapitalize="words"
            value={form.name}
            onChangeText={setField('name')}
          />
          <TextField
            icon="call-outline"
            placeholder="Номер телефона"
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={setField('phone')}
          />
          <TextField
            icon="lock-closed-outline"
            placeholder="Пароль"
            isPassword
            value={form.pass}
            onChangeText={setField('pass')}
          />
        </View>

        <View style={styles.consent}>
          <ConsentRow value={agreed} onChange={setAgreed} />
        </View>

        <PrimaryButton label="Зарегистрироваться" enabled={valid} onPress={submit} />

        <View style={styles.bottom}>
          <Text style={styles.muted}>Уже есть аккаунт?</Text>
          <Pressable onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.link}>Войти</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.white },
  content: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 28 },
  top: { height: 40, marginTop: 8 },
  h1: { fontSize: 26, fontWeight: '800', color: palette.ink, marginTop: 28 },
  sub: { fontSize: 14, color: palette.hint, marginTop: 6 },
  fields: { gap: 14, marginTop: 28 },
  consent: { marginVertical: 20 },
  bottom: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 20 },
  muted: { fontSize: 13, color: palette.hint },
  link: { fontSize: 13, color: palette.brand, fontWeight: '600' },
});
