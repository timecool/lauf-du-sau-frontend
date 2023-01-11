import { create } from 'zustand';

import type { IUser } from '@/models/user';

interface TodoState {
  user: IUser | undefined;
  setUser: (user: IUser | undefined) => void;
}

export const useAuthStore = create<TodoState>((set) => ({
  user: undefined,
  setUser: (user: IUser | undefined) => {
    set({ user });
  },
}));
