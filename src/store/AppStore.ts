
import { create } from 'zustand'
import { Tab } from "@/types";
import { persist, createJSONStorage } from 'zustand/middleware'

interface AppStore {
  tabs: Tab[];
  selectedTabIndex: number;
}


interface AppAction {
  addTab: (tab: Tab) => void;
  deleteTab: (tabId: string) => void;
  // updateTab: (id: string, tab: Tab) => void;
}


export const useAppStore = create<AppStore & AppAction>()(
  persist(
    (set) => ({
      tabs: [{ id: Date.now().toString(), title: 'Untitled-1' }],
      selectedTabIndex: 0,
      addTab: (tab: Tab) =>
        set((state) => ({
          tabs: [...state.tabs, tab], // Correctly updates the `tabs` array
        })),
      deleteTab: (tabId: string) =>
        set((state) => ({
          tabs: [...state.tabs.filter(tab => tab.id !== tabId)]
        }))
    }),
    {
      name: 'JSRunner', // unique name for storage key
      storage: createJSONStorage(() => localStorage), // using localStorage for persistence
    }
  )
);

