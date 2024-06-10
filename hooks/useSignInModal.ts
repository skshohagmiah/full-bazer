'use client';

import { create } from "zustand";


interface UseSignInModalProps {
    isOpen:boolean,
    onClose: () => void,
    onOpen: () => void,
}


const useSignInModal = create<UseSignInModalProps>(
    (set) => ({
        isOpen: false,
        onClose: () => set({ isOpen: false }),
        onOpen: () => set({ isOpen: true }),
    })
)


export default useSignInModal