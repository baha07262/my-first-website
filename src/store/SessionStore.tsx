import React, { createContext, useContext, useState } from 'react';

export type Profile = {
  name: string;
  phone: string;
  city: string;
};

type SessionValue = {
  profile: Profile;
  patch: (changes: Partial<Profile>) => void;
  clear: () => void;
};

const EMPTY: Profile = { name: '', phone: '', city: '' };

const SessionContext = createContext<SessionValue | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(EMPTY);

  const value: SessionValue = {
    profile,
    patch: (changes) => setProfile((prev) => ({ ...prev, ...changes })),
    clear: () => setProfile(EMPTY),
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionValue {
  const value = useContext(SessionContext);
  if (!value) throw new Error('useSession must be used within SessionProvider');
  return value;
}
