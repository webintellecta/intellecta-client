import { create } from "zustand";


interface storeState {
    isChatOpen : Boolean,
    setIsChatOpen : ()=> void
}



export const useToggleStore = create<storeState>((set)=>({
    isChatOpen : false,
    setIsChatOpen : () => set((state) => ({ isChatOpen: !state.isChatOpen })),
}))



