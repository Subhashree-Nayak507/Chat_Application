import {create} from "zustard"

export const useAuthStore = create((set)=>({
    authUser:null,
    isCheckingAuth:true,
}))