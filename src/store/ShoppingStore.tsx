import React, { createContext, useContext, useReducer } from 'react';

export type ShoppingItem = {
  id: string;
  title: string;
  done: boolean;
};

type Action =
  | { type: 'addMany'; titles: string[] }
  | { type: 'toggle'; id: string }
  | { type: 'remove'; id: string }
  | { type: 'clearDone' };

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

function reducer(state: ShoppingItem[], action: Action): ShoppingItem[] {
  switch (action.type) {
    case 'addMany':
      return [
        ...state,
        ...action.titles.map((title) => ({ id: makeId(), title, done: false })),
      ];
    case 'toggle':
      return state.map((it) => (it.id === action.id ? { ...it, done: !it.done } : it));
    case 'remove':
      return state.filter((it) => it.id !== action.id);
    case 'clearDone':
      return state.filter((it) => !it.done);
    default:
      return state;
  }
}

type ShoppingValue = {
  items: ShoppingItem[];
  /** Қосылғандар санын қайтарады (қайталанғандары өткізіліп кетеді) */
  add: (titles: string[]) => number;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clearDone: () => void;
};

const ShoppingContext = createContext<ShoppingValue | undefined>(undefined);

export function ShoppingProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(reducer, []);

  const value: ShoppingValue = {
    items,
    add: (titles) => {
      const known = new Set(items.map((i) => i.title.toLowerCase()));
      const fresh = titles
        .map((t) => t.trim())
        .filter((t, idx, arr) => t !== '' && !known.has(t.toLowerCase()) && arr.indexOf(t) === idx);
      if (fresh.length > 0) dispatch({ type: 'addMany', titles: fresh });
      return fresh.length;
    },
    toggle: (id) => dispatch({ type: 'toggle', id }),
    remove: (id) => dispatch({ type: 'remove', id }),
    clearDone: () => dispatch({ type: 'clearDone' }),
  };

  return <ShoppingContext.Provider value={value}>{children}</ShoppingContext.Provider>;
}

export function useShopping(): ShoppingValue {
  const value = useContext(ShoppingContext);
  if (!value) throw new Error('useShopping must be used within ShoppingProvider');
  return value;
}
