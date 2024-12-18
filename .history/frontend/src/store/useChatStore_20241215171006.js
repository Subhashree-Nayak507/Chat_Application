 import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

 export const useChatStore = create((set)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    
    getUsers:async()=>{
        set({isUsersLoading:true});
        try{
            const res= await axiosInstance.get("/message/users");
            set({ users: res.data});
        }catch(error){
            toast.error(error.response.data.message)
        }finally{
            set({ isUsersLoading: false})
        }
    },

    getMessages:async(userId)=>{
        set({isUsersLoading:true});
        try{
            const res= await axiosInstance.get(`/messages/${userId}`);
            set({ users: res.data});
        }catch(error){
            toast.error(error.response.data.message)
        }finally{
            set({ isUsersLoading: false})
        }
    },

    getSelectedUser:async(selectedUser)=>{
        set({isUsersLoading:true});
        try{
            const res= await axiosInstance.get(`/messages/${userId}`);
            set({ users: res.data});
        }catch(error){
            toast.error(error.response.data.message)
        }finally{
            set({ isUsersLoading: false})
        }
    }
 }))