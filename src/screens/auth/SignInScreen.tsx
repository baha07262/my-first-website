import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootRoutes } from '../../navigation/routes';
import { palette } from '../../constants/palette';
import { useSession } from '../../store/SessionStore';
import BackArrow from '../../components/BackArrow';
import PrimaryButton from '../../components/PrimaryButton';
import TextField from '../../components/TextField';

type Props = NativeStackScreenProps<RootRoutes, 'SignIn'>;

export default function SignInScreen({ navigation }: Props) {
  const { patch } = useSession();
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');

  const ready = phone.trim() !== '' && pass !== '';

  const submit = () => {
    patch({ phone: phone.trim() });
    navigation.reset({ index: 0, routes: [{ name: 'Recipes' }] });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.top}>
          <BackArrow />
        </View>

        <Text style={styles.h1}>Привет, с возвращением!</Text>
        <Text style={styles.sub}>Войдите в свой аккаунт</Text>

        <View style={styles.fields}>
          <TextField
            icon="call-outline"
            placeholder="Номер телефона"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <TextField icon="lock-closed-outline" placeholder="Пароль" isPassword value={pass} onChangeText={setPass} />
        </View>

        <Pressable style={styles.forgot} onPress={() => navigation.navigate('PasswordHelp')}>
          <Text style={styles.link}>Забыл пароль?</Text>
        </Pressable>

        <PrimaryButton label="Войти" enabled={ready} onPress={submit} />

        <View style={styles.bottom}>
          <Text style={styles.muted}>У вас нет аккаунта?</Text>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.link}>Зарегистрироваться</Text>
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
  forgot: { alignSelf: 'flex-end', marginVertical: 16 },
  link: { fontSize: 13, color: palette.brand, fontWeight: '600' },
  bottom: { alignItems: 'center', gap: 4, marginTop: 24 },
  muted: { fontSize: 13, color: palette.hint },
});
