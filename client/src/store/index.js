import { createAuthSlice } from "@/slices/authSlice";
import { create } from 'zustand'; 

export const useAppStore = create()((...a)=>({
    ...createAuthSlice(...a),
}))