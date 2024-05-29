import { create } from 'zustand';
interface styleTag {
  id: number;
  name: string;
}
interface StyleTagStore {
  styleTag: styleTag[];
  setStyleTag: (styleTag: styleTag[]) => void;
}

const useStyleTagStore = create<StyleTagStore>(set => ({
  styleTag: [],
  setStyleTag: styleTag => set({ styleTag }),
}));
export default useStyleTagStore;
