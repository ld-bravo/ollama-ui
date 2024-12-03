import { create } from "zustand";
import { Message } from "../interfaces/Message";

interface State {
  runningModel: string;
  messages: Message[];
  setRunningModel: (value: string) => void;
  addMessage: (value: Message) => void;
  clearMessages: () => void;
}

const useStore = create<State>((set) => ({
  runningModel: "",
  messages: [],
  setRunningModel: (value) => set({ runningModel: value }),
  addMessage: (item: Message) => set((state) => ({ messages: [...state.messages, item] })),
  clearMessages: () => set({ messages: []})
}));

export default useStore;
