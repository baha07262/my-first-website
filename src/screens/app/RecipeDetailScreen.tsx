import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootRoutes } from '../../navigation/routes';
import { palette, shape } from '../../constants/palette';
import { findRecipe } from '../../data/recipes';
import { useShopping } from '../../store/ShoppingStore';
import BackArrow from '../../components/BackArrow';
import PrimaryButton from '../../components/PrimaryButton';

type Props = NativeStackScreenProps<RootRoutes, 'RecipeDetail'>;

function Pill({ icon, text }: { icon: keyof typeof Ionicons.glyphMap; text: string }) {
  return (
    <View style={styles.pill}>
      <Ionicons name={icon} size={14} color={palette.brand} />
      <Text style={styles.pillText}>{text}</Text>
    </View>
  );
}

export default function RecipeDetailScreen({ navigation, route }: Props) {
  const recipe = findRecipe(route.params.id);
  const { add } = useShopping();
  const [note, setNote] = useState('');

  if (!recipe) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.pad}>
          <BackArrow />
          <Text style={styles.missing}>Рецепт не найден</Text>
        </View>
      </SafeAreaView>
    );
  }

  const addIngredients = () => {
    const count = add(recipe.ingredients);
    setNote(count > 0 ? `Добавлено в список: ${count}` : 'Все ингредиенты уже в списке');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.pad}>
        <BackArrow />

        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>{recipe.emoji}</Text>
        </View>

        <Text style={styles.title}>{recipe.title}</Text>

        <View style={styles.pills}>
          <Pill icon="time-outline" text={`${recipe.minutes} мин`} />
          <Pill icon="flame-outline" text={`${recipe.kcal} ккал`} />
          <Pill icon="speedometer-outline" text={recipe.level} />
        </View>

        <Text style={styles.section}>Ингредиенты</Text>
        {recipe.ingredients.map((ing) => (
          <View key={ing} style={styles.ingRow}>
            <View style={styles.dot} />
            <Text style={styles.ingText}>{ing}</Text>
          </View>
        ))}

        <Text style={styles.section}>Приготовление</Text>
        {recipe.steps.map((step, i) => (
          <View key={i} style={styles.stepRow}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumText}>{i + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}

        <PrimaryButton label="Добавить в список покупок" onPress={addIngredients} style={styles.btn} />
        {note !== '' ? (
          <Text style={styles.note} onPress={() => navigation.navigate('Shopping')}>
            {note} · Открыть список
          </Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.white },
  pad: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 36 },
  missing: { textAlign: 'center', marginTop: 60, color: palette.hint },
  hero: {
    height: 170,
    borderRadius: shape.card,
    backgroundColor: palette.brandSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  heroEmoji: { fontSize: 80 },
  title: { fontSize: 26, fontWeight: '800', color: palette.ink, marginTop: 18 },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    height: 30,
    borderRadius: 15,
    backgroundColor: palette.brandSoft,
  },
  pillText: { fontSize: 12, color: palette.brandDeep, fontWeight: '600' },
  section: { fontSize: 17, fontWeight: '800', color: palette.ink, marginTop: 26, marginBottom: 10 },
  ingRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 5 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: palette.brand },
  ingText: { fontSize: 14, color: palette.ink },
  stepRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  stepNum: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: palette.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: { color: palette.white, fontSize: 12, fontWeight: '700' },
  stepText: { flex: 1, fontSize: 14, lineHeight: 20, color: palette.ink },
  btn: { marginTop: 24 },
  note: { textAlign: 'center', marginTop: 12, fontSize: 13, color: palette.brand, fontWeight: '600' },
});
