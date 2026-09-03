"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { demoUsers } from "./mock-data";
import type { SessionUser } from "./types";

const KEY = "acme-copilot-user";

type SessionValue = {
  user: SessionUser | null;
  ready: boolean;
  login: (email: string) => boolean;
  logout: () => void;
};

const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw) as SessionUser);
      } catch {
        localStorage.removeItem(KEY);
      }
    }
    setReady(true);
  }, []);

  const value = useMemo<SessionValue>(
    () => ({
      user,
      ready,
      login: (email: string) => {
        const match = demoUsers.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
        if (!match) return false;
        localStorage.setItem(KEY, JSON.stringify(match));
        setUser(match);
        return true;
      },
      logout: () => {
        localStorage.removeItem(KEY);
        setUser(null);
      },
    }),
    [user, ready],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}

export function useRequireUser() {
  const { user, ready, logout } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) router.replace("/");
  }, [ready, user, router]);

  return { user, ready, logout };
}
