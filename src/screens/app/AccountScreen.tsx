import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootRoutes } from '../../navigation/routes';
import { palette, shape } from '../../constants/palette';
import { useSession } from '../../store/SessionStore';
import { useShopping } from '../../store/ShoppingStore';
import BackArrow from '../../components/BackArrow';

type Props = NativeStackScreenProps<RootRoutes, 'Account'>;

type RowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  danger?: boolean;
  onPress: () => void;
};

function Row({ icon, label, value, danger = false, onPress }: RowProps) {
  const color = danger ? palette.alert : palette.ink;
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Ionicons name={icon} size={20} color={danger ? palette.alert : palette.brand} />
      <Text style={[styles.rowLabel, { color }]}>{label}</Text>
      {value ? <Text style={styles.rowValue}>{value}</Text> : null}
      {!danger ? <Ionicons name="chevron-forward" size={16} color={palette.hint} /> : null}
    </Pressable>
  );
}

export default function AccountScreen({ navigation }: Props) {
  const { profile, clear } = useSession();
  const { items } = useShopping();

  const initial = (profile.name || 'Г').charAt(0).toUpperCase();

  const logout = () =>
    Alert.alert('Выйти из аккаунта?', 'Вам придётся войти снова.', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Выйти',
        style: 'destructive',
        onPress: () => {
          clear();
          navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
        },
      },
    ]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.wrap}>
        <BackArrow />

        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <Text style={styles.name}>{profile.name || 'Гость'}</Text>
          <Text style={styles.phone}>{profile.phone || 'Номер не указан'}</Text>
        </View>

        <View style={styles.card}>
          <Row
            icon="cart-outline"
            label="Список покупок"
            value={String(items.length)}
            onPress={() => navigation.navigate('Shopping')}
          />
          <Row
            icon="location-outline"
            label="Город"
            value={profile.city || '—'}
            onPress={() => navigation.navigate('CityPicker')}
          />
          <Row
            icon="lock-closed-outline"
            label="Сменить пароль"
            onPress={() => navigation.navigate('NewPassword')}
          />
        </View>

        <View style={[styles.card, { marginTop: 14 }]}>
          <Row icon="log-out-outline" label="Выйти" danger onPress={logout} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.white },
  wrap: { flex: 1, paddingHorizontal: 24, paddingTop: 8 },
  profile: { alignItems: 'center', marginVertical: 24 },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: palette.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: palette.white, fontSize: 34, fontWeight: '800' },
  name: { fontSize: 20, fontWeight: '800', color: palette.ink, marginTop: 12 },
  phone: { fontSize: 13, color: palette.hint, marginTop: 2 },
  card: { borderRadius: shape.card, backgroundColor: palette.surface, overflow: 'hidden' },
  row: {
    height: 54,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowLabel: { flex: 1, fontSize: 15, fontWeight: '500' },
  rowValue: { fontSize: 13, color: palette.hint },
});
