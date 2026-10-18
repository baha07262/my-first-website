import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootRoutes } from '../../navigation/routes';
import { palette, shape } from '../../constants/palette';
import { useSession } from '../../store/SessionStore';
import BackArrow from '../../components/BackArrow';
import PrimaryButton from '../../components/PrimaryButton';

type Props = NativeStackScreenProps<RootRoutes, 'CityPicker'>;

const CITIES = ['Алматы', 'Астана', 'Шымкент', 'Қарағанды', 'Ақтөбе', 'Қызылорда'];

export default function CityPickerScreen({ navigation }: Props) {
  const { profile, patch } = useSession();
  const [expanded, setExpanded] = useState(false);
  const [picked, setPicked] = useState(profile.city);

  const choose = (city: string) => {
    setPicked(city);
    setExpanded(false);
  };

  const proceed = () => {
    patch({ city: picked });
    navigation.reset({ index: 0, routes: [{ name: 'Recipes' }] });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.wrap}>
        <View style={styles.top}>
          <BackArrow />
        </View>

        <Text style={styles.h1}>Выберите город</Text>
        <Text style={styles.sub}>
          Заведения которые будут показываться вам, будут зависеть от вашего города
        </Text>

        <Pressable style={styles.select} onPress={() => setExpanded((e) => !e)}>
          <Ionicons name="location-outline" size={19} color={picked ? palette.brand : palette.hint} />
          <Text style={[styles.selectText, !!picked && { color: palette.ink }]}>
            {picked || 'Выбрать город'}
          </Text>
          <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={palette.brand} />
        </Pressable>

        {expanded ? (
          <View style={styles.list}>
            {CITIES.map((city, idx) => (
              <Pressable
                key={city}
                onPress={() => choose(city)}
                style={[styles.row, idx < CITIES.length - 1 && styles.rowDivider]}
              >
                <Text style={[styles.rowText, city === picked && styles.rowTextActive]}>{city}</Text>
                {city === picked ? <Ionicons name="checkmark" size={18} color={palette.brand} /> : null}
              </Pressable>
            ))}
          </View>
        ) : null}

        <View style={{ flex: 1 }} />
        <PrimaryButton label="Продолжить" enabled={picked !== ''} onPress={proceed} style={styles.btn} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.white },
  wrap: { flex: 1, paddingHorizontal: 24 },
  top: { height: 40, marginTop: 8 },
  h1: { fontSize: 26, fontWeight: '800', color: palette.ink, marginTop: 28 },
  sub: { fontSize: 14, color: palette.hint, marginTop: 6, lineHeight: 20 },
  select: {
    height: 52,
    marginTop: 28,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: shape.field,
    borderWidth: 1.5,
    borderColor: palette.line,
  },
  selectText: { flex: 1, fontSize: 15, color: palette.hint },
  list: {
    marginTop: 8,
    borderRadius: shape.field,
    borderWidth: 1.5,
    borderColor: palette.line,
    overflow: 'hidden',
  },
  row: {
    height: 48,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowDivider: { borderBottomWidth: 1, borderBottomColor: palette.line },
  rowText: { fontSize: 15, color: palette.ink },
  rowTextActive: { color: palette.brand, fontWeight: '700' },
  btn: { marginBottom: 24 },
});
