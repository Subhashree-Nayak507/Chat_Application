import React, { useState } from 'react';
import victory from '../../assets/victory.jpg'; // Adjust path as needed
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constant'
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/index';

const Auth = () => {

  const [ email,setEmail]= useState('');
  const[password,setPassword]=useState('');
  const[confirmPassword,setConfirmPassword]= useState('');
 const navigate = useNavigate();
 const {setUserInfo}= useAppStore();

  const validateSignup = () =>{
    if(!email.length){
      toast.error("Email is Required");
      return false
    }
    if(!password.length){
      toast.error("password is Required");
      return false
    }
    if( password !== confirmPassword){
      toast.error("Password and Confirm password should be same");
      return false
    }
    return true
  };

  const validateLogin = () =>{
    if(!email.length){
      toast.error("Email is Required");
      return false
    }
    if(!password.length){
      toast.error("password is Required");
      return false
    }
    return true
  };

  const handleLogin = async()=>{
    if(validateLogin()){
      const response = await apiClient.post(LOGIN_ROUTE,{ email,password },{ withCredentials:true });
      console.log(response);
      console.log(response.data.user._id)
      if(response.data.user._id){
        setUserInfo(response.data.user)
        if(response.data.user.profileSetup === true){
          navigate("/chat");
        }else{
          navigate("/profile");
        }
      }
     }
  }
  const handleSignup =async()=>{
    if(validateSignup()){
     const response = await apiClient.post(SIGNUP_ROUTE,{ email,password },{ withCredentials:true });
     if (response.status === 201){
      setUserInfo(response.data.user);
      navigate("/profile");
     }
     console.log(response);
    }
  }
  
 
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
            <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
            <img src={victory} alt="Victory" className="h-[100px] mt-4" />
            </div>
            <p className='font-medium text-center'>
              Fill in the details to get started with chatify!
            </p>
          </div>
          <div className='flex items-center justify-center w-full'>
          <Tabs className='w-3/4' defaultValue='Login'>
           <TabsList className='bg-transparent rounded-none w-full'>
            <TabsTrigger value= 'Login'
            className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full 
            data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all
            duration-300'
            > Login</TabsTrigger>
            <TabsTrigger value='Signup'
             className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full 
             data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all
             duration-300'>Signup </TabsTrigger>
           </TabsList>
           <TabsContent className='flex flex-col gap-5 mt-10 ' value='Login'>
            <Input
             placeholder="Email"
             type="Email"
             className="rounded-full p-6"
             value={email} 
             onChange={(e)=>setEmail(e.target.value)} />
             <Input
             placeholder="Password"
             type="password"
             className="rounded-full p-6"
             value={password} 
             onChange={(e)=>setPassword(e.target.value)} />
             <Button className='rounded-full p-6' onClick={handleLogin}>Login</Button>
             </TabsContent>
           <TabsContent className='flex flex-col gap-5 ' value= 'Signup'>
           <Input
             placeholder="Email"
             type="Email"
             className="rounded-full p-6"
             value={email} 
             onChange={(e)=>setEmail(e.target.value)} />
             <Input
             placeholder="Password"
             type="password"
             className="rounded-full p-6"
             value={password} 
             onChange={(e)=>setPassword(e.target.value)} />
             <Input
             placeholder=" Confirm Password"
             type="password"
             className="rounded-full p-6"
             value={confirmPassword} 
             onChange={(e)=>setConfirmPassword(e.target.value)} />
             <Button className='rounded-full p-6' onClick={handleSignup} >
              Signup
             </Button>
           </TabsContent>
          </Tabs>
          </div>
        </div>
        <div className='flex justify-center items-center'>

        </div>
      </div>
    </div>
  );
};

export default Auth;
