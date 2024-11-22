import { createContext } from 'react';

interface AppStore {
  code: string;
  setCode: (code: string) => void;
}

export const AppContext = createContext<AppStore>({
  code: '',
  setCode: () => null
})

