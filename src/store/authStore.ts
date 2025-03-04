"use client";

import { create } from "zustand";
import { supabase } from "../lib/supabase";

interface AuthState {
  user: any;
  isLoading: boolean;
  setUser: (user: any) => void;
  logout: () => void;
  checkUser: () => Promise<void>;
}

// Crear el store de Zustand
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true, // Estado de carga inicial

  setUser: (user) => set({ user, isLoading: false }),

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, isLoading: false });
  },

  checkUser: async () => {
    set({ isLoading: true }); // Marcar que está cargando
    const { data: { session } } = await supabase.auth.getSession();
    set({ user: session ? session.user : null, isLoading: false });
  },
}));
