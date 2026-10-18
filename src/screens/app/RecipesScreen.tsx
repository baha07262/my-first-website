import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootRoutes } from '../../navigation/routes';
import { palette } from '../../constants/palette';
import { MEALS, Meal, RECIPES } from '../../data/recipes';
import { useSession } from '../../store/SessionStore';
import { useShopping } from '../../store/ShoppingStore';
import RecipeCard from '../../components/RecipeCard';
import TextField from '../../components/TextField';

type Props = NativeStackScreenProps<RootRoutes, 'Recipes'>;

export default function RecipesScreen({ navigation }: Props) {
  const { profile } = useSession();
  const { items } = useShopping();
  const [text, setText] = useState('');
  const [meal, setMeal] = useState<Meal | null>(null);

  const visible = useMemo(() => {
    const needle = text.trim().toLowerCase();
    return RECIPES.filter(
      (r) => (meal === null || r.meal === meal) && (needle === '' || r.title.toLowerCase().includes(needle)),
    );
  }, [text, meal]);

  const pending = items.filter((i) => !i.done).length;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.h1}>Рецепты</Text>
          <Text style={styles.city}>
            {profile.name ? `${profile.name}, ` : ''}
            {profile.city || 'добро пожаловать'}
          </Text>
        </View>

        <View style={styles.icons}>
          <Pressable onPress={() => navigation.navigate('Shopping')} hitSlop={8}>
            <Ionicons name="cart-outline" size={26} color={palette.ink} />
            {pending > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{pending}</Text>
              </View>
            ) : null}
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Account')} hitSlop={8}>
            <Ionicons name="person-circle-outline" size={28} color={palette.ink} />
          </Pressable>
        </View>
      </View>

      <View style={styles.search}>
        <TextField icon="search-outline" placeholder="Найти рецепт" value={text} onChangeText={setText} />
      </View>

      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {([null, ...MEALS] as (Meal | null)[]).map((m) => {
            const active = m === meal;
            return (
              <Pressable key={m ?? 'all'} onPress={() => setMeal(m)} style={[styles.chip, active && styles.chipActive]}>
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{m ?? 'Все'}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={visible}
        keyExtractor={(r) => r.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} onPress={() => navigation.navigate('RecipeDetail', { id: item.id })} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Рецепты не найдены</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.white },
  header: {
    paddingHorizontal: 24,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  h1: { fontSize: 26, fontWeight: '800', color: palette.ink },
  city: { fontSize: 13, color: palette.hint, marginTop: 2 },
  icons: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    backgroundColor: palette.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: palette.white, fontSize: 10, fontWeight: '700' },
  search: { paddingHorizontal: 24, marginTop: 18 },
  chips: { paddingHorizontal: 24, paddingVertical: 14, gap: 8 },
  chip: {
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: { backgroundColor: palette.brand },
  chipText: { fontSize: 13, color: palette.ink, fontWeight: '500' },
  chipTextActive: { color: palette.white, fontWeight: '700' },
  list: { paddingHorizontal: 24, paddingBottom: 32 },
  empty: { textAlign: 'center', color: palette.hint, marginTop: 40 },
});
