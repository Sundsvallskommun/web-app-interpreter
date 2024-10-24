import { create } from "zustand";
import { type InterpreterHistory } from "../types/interpreter.type";
import { type User } from "../types/user.type";

export type UserLanguage = Record<User, string>;

interface AppStore {
  languages: UserLanguage;
  setLanguages: (languages: Partial<UserLanguage>) => void;
  setLanguage: (user: User, language: string) => void;
  history: Record<User, InterpreterHistory>;
  addToHistory: (
    user: User,
    origin: User,
    language: string,
    text: string,
    id: string
  ) => void;
  updateHistoryEntry: (
    user: User,
    origin: User,
    language: string,
    text: string,
    id: string
  ) => void;
  busy: Record<User, boolean>;
  setBusy: (user: User, busy: boolean) => void;
  reset: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  languages: { 1: "sv-SE", 2: "en-GB" },
  setLanguages: (languages) =>
    set((oldValue) => ({ languages: { ...oldValue.languages, ...languages } })),
  setLanguage: (user, language) =>
    set((oldValue) => ({
      languages: { ...oldValue.languages, [user]: language },
    })),
  history: { 1: [], 2: [] },
  addToHistory: (user, origin, language, text, id) =>
    set((oldValue) => {
      const userHistory = [...oldValue.history[user]];
      userHistory.push({ origin, language, text, id });
      return { history: { ...oldValue.history, [user]: userHistory } };
    }),

  updateHistoryEntry: (user, origin, language, text, id) =>
    set((oldValue) => {
      const userHistory = [...oldValue.history[user]];
      const index = userHistory.findIndex((entry) => entry.id === id);
      if (index === -1) {
        userHistory.push({ origin, language, text, id });
      } else {
        userHistory[index] = { origin, language, text, id };
      }
      return { history: { ...oldValue.history, [user]: userHistory } };
    }),
  busy: { 1: false, 2: false },
  setBusy: (user, busy) =>
    set((oldValue) => {
      const otherUser = user === 1 ? 2 : 1;
      return {
        busy: {
          [user]: busy,
          [otherUser]: busy ? false : oldValue.busy[otherUser],
        } as Record<User, boolean>,
      };
    }),
  reset: () =>
    set(() => ({
      languages: { 1: "sv-SE", 2: "en-GB" },
      history: { 1: [], 2: [] },
      busy: { 1: false, 2: false },
    })),
}));
