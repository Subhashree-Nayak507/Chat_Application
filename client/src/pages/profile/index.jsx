import { useAppStore } from '@/store'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { colors, getColor } from '@/lib/utils';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { ADD_PROFILE_IMAGE_ROUTES, HOST, REMOVE_PROFILE_IMAGE_ROUTES, UPDATE_PROFILE_ROUTES } from '@/utils/constant';

const Profile = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectColor, setSelectColor] = useState(0);
  const fileInputRef= useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.profileSetup ) {
      setFirstName(userInfo.firstName );
      setLastName(userInfo.lastName );
      setSelectColor(userInfo.color);
    }
    if(userInfo.image){
      setImage(`${HOST}/${userInfo.image}`)
    }
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstName || !lastName) {
      toast.error("First name and last name required");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTES,
          { 
            firstName, 
            lastName, 
            color: selectColor 
          },
          { withCredentials: true }
        );
        if (response.status === 200) {
          const updatedUserInfo = {
            ...userInfo,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            color: response.data.color,
            profileSetup: response.data.profileSetup,
            email: response.data.email
          };
         // console.log("Updating userInfo to:", updatedUserInfo); 
          toast.success("Profile Updated Successfully");
          navigate("/chat");
        }
      } catch (err) {
        console.error("Profile update error:", err);
        toast.error(err?.response?.data?.message || "Failed to update profile");
      }
    }
  };

  const getInitial = () => {
    if (firstName) {
      return firstName.charAt(0);
    }
    return userInfo.email ? userInfo.email.charAt(0) : '';
  };
  const handleNavigate= ()=>{
    if(userInfo.profileSetup){
      navigate('/chat')
    }else{
      toast.error("Please setup Profile.")
    }
  }

  const handleFileInputClick=()=>{
   fileInputRef.current.click();
  }
  const handleImageChange =async(e)=>{
    const file = e.target.files[0];
    console.log(file);

    const formData = new FormData();
    formData.append("profile-image", file);

    const response= await apiClient.post(ADD_PROFILE_IMAGE_ROUTES,formData,
      {withCredentials:true});
      
      if(response.status === 200 && response.data.image){
        setUserInfo({...userInfo,image:response.data.image})
        toast.success("image upadted successfully");
      }

  }
  const handleDeleteImage= async(e)=>{
    try{
    const response= await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTES,{
      withCredentials:true
    });
    console.log( "response",response);
    if(response.status === 200){
      setUserInfo({...userInfo,image:null})
      toast.success("image  deleted successfully");
      setImage(null);
    }
    }catch(e){
      console.log(e)
    }

  }

  return (
    <div className="bg-black h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div onClick={handleNavigate}>
          <IoArrowBack 
          
          className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl text-white border-[1px] flex justify-center items-center rounded-full
                    ${getColor(selectColor).bg} ${getColor(selectColor).text} ${getColor(selectColor).border}`}
                >
                  {getInitial()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div 
              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer"
              onClick={image? handleDeleteImage: handleFileInputClick}>
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <Input 
            type='file' 
            className='hidden' 
            ref={fileInputRef}
            onChange={handleImageChange}
            name='profile-image'
            accept='.png,.jpg,.svg,.webp'
            />
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo?.email || ""}
                className="rounded-lg p-6 bg-[#3e3838] border-none"
              />
              <Input
                placeholder="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded-lg p-6 mt-3 bg-[#7f5b5b] border-none"
              />
              <Input
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="rounded-lg p-6 mt-3 bg-[#775757] border-none"
              />
            </div>
            <div className="w-full flex gap-5">
              {colors.map((color, index) => (
                <div
                  className={`${color.bg} ${color.text} ${color.border} h-8 w-8 rounded-full cursor-pointer transition-all duration-300
                    ${selectColor === index ? "outline outline-white/50 outline-2" : ""}`}
                  key={index}
                  onClick={() => setSelectColor(index)}
                />
              ))}
            </div>
            <div>
              <Button
                className="h-16 w-full bg-purple-500 hover:bg-purple-900 transition-all duration-300"
                onClick={saveChanges}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;