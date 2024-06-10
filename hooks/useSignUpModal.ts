'use client';

import { create } from "zustand";


interface useSignUpModalProps {
    isOpen:boolean,
    onClose: () => void,
    onOpen: () => void,
}


const useSignUpModal = create<useSignUpModalProps>(
    (set) => ({
        isOpen: false,
        onClose: () => set({ isOpen: false }),
        onOpen: () => set({ isOpen: true }),
    })
)


export default useSignUpModal