import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { palette, shape } from '../../constants/palette';
import { useShopping } from '../../store/ShoppingStore';
import BackArrow from '../../components/BackArrow';
import TextField from '../../components/TextField';

export default function ShoppingListScreen() {
  const { items, add, toggle, remove, clearDone } = useShopping();
  const [draft, setDraft] = useState('');

  const doneCount = items.filter((i) => i.done).length;

  const submitDraft = () => {
    add([draft]);
    setDraft('');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <BackArrow />
        <Text style={styles.h1}>Список покупок</Text>
        <Text style={styles.sub}>
          Куплено {doneCount} из {items.length}
        </Text>
      </View>

      <View style={styles.adder}>
        <View style={{ flex: 1 }}>
          <TextField
            icon="add-circle-outline"
            placeholder="Что нужно купить?"
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={submitDraft}
            returnKeyType="done"
            autoCapitalize="sentences"
          />
        </View>
        <Pressable onPress={submitDraft} style={styles.addBtn}>
          <Ionicons name="arrow-up" size={22} color={palette.white} />
        </Pressable>
      </View>

      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Pressable style={styles.itemMain} onPress={() => toggle(item.id)}>
              <Ionicons
                name={item.done ? 'checkmark-circle' : 'ellipse-outline'}
                size={24}
                color={item.done ? palette.brand : palette.hint}
              />
              <Text style={[styles.itemText, item.done && styles.itemDone]}>{item.title}</Text>
            </Pressable>
            <Pressable onPress={() => remove(item.id)} hitSlop={10}>
              <Ionicons name="trash-outline" size={20} color={palette.alert} />
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyEmoji}>🛒</Text>
            <Text style={styles.empty}>Список пуст. Добавьте ингредиенты из рецепта или впишите вручную.</Text>
          </View>
        }
      />

      {doneCount > 0 ? (
        <Pressable style={styles.clear} onPress={clearDone}>
          <Text style={styles.clearText}>Убрать купленные ({doneCount})</Text>
        </Pressable>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.white },
  header: { paddingHorizontal: 24, paddingTop: 8 },
  h1: { fontSize: 26, fontWeight: '800', color: palette.ink, marginTop: 20 },
  sub: { fontSize: 13, color: palette.hint, marginTop: 4 },
  adder: { flexDirection: 'row', gap: 10, paddingHorizontal: 24, marginTop: 20, alignItems: 'center' },
  addBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: palette.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: { padding: 24, flexGrow: 1 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 54,
    borderRadius: shape.field,
    backgroundColor: palette.surface,
  },
  itemMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  itemText: { flex: 1, fontSize: 15, color: palette.ink },
  itemDone: { color: palette.hint, textDecorationLine: 'line-through' },
  emptyBox: { alignItems: 'center', marginTop: 60, gap: 12 },
  emptyEmoji: { fontSize: 48 },
  empty: { textAlign: 'center', color: palette.hint, fontSize: 13, lineHeight: 19, maxWidth: 260 },
  clear: { alignSelf: 'center', paddingVertical: 14 },
  clearText: { color: palette.alert, fontWeight: '600', fontSize: 14 },
});
