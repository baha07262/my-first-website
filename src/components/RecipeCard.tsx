import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { palette, shape } from '../constants/palette';
import { Recipe } from '../data/recipes';

type Props = {
  recipe: Recipe;
  onPress: () => void;
};

export default function RecipeCard({ recipe, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.thumb}>
        <Text style={styles.emoji}>{recipe.emoji}</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {recipe.title}
        </Text>
        <Text style={styles.meal}>{recipe.meal}</Text>
        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={13} color={palette.hint} />
          <Text style={styles.meta}>{recipe.minutes} мин</Text>
          <Ionicons name="flame-outline" size={13} color={palette.hint} />
          <Text style={styles.meta}>{recipe.kcal} ккал</Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={18} color={palette.hint} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 12,
    borderRadius: shape.card,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.white,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: palette.brandSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 32 },
  body: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', color: palette.ink },
  meal: { fontSize: 12, color: palette.brand, marginTop: 2, fontWeight: '500' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  meta: { fontSize: 12, color: palette.hint, marginRight: 8 },
});
