"use client"
import { handleImageUpload } from '@/lib/Functions'
import axios from 'axios'
import Image from 'next/image'
import React,{useState} from 'react'
import {IoAdd} from 'react-icons/io5'
import { NewUserNextStepBtn } from '../button/NewUserButton'
import toast from 'react-hot-toast'

type NewUserImagetype = {
    Myimage: string
}
 const NewUserImageUpload =  ({Myimage}:NewUserImagetype) =>{
   const [img,setImg] = useState<any>(Myimage)
   const [loading ,setLoading] = useState<boolean>(false)
  //  FUNCTION IMAGE UPLOAD 
  const onImageChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
      try {
      const [file]:any = e.target.files;
      if(!file) return
      
      const uploading = await handleImageUpload(file)
      setImg(uploading.file.url)
      const { data }=  await axios.patch('/api/user/avatar',{uploading})
      toast.success('Avatar changed.')
      
    } catch (error) { 
      console.log(error);
      
    } finally{
      setLoading(false)
    }
    };
    return(
      <>
        <div className='text-center'>
        <div className='relative h-[120px] w-[120px] flex justify-center items-center rounded-full border-2 border-solid border-[#cecece] mx-auto '>
            <i className='cursor-pointer absolute top-0 right-0 flex justify-center items-center h-9 w-9 rounded-full border-2 border-solid border-[#fff] bg-[#cecece] transition-all duration-100 hover:bg-[#039be5]'>
            <IoAdd className='h-[18px] w-[18px] text-white stroke-2 ' />
              <input type="file"   accept='image/*' onChange={onImageChange}
              className='h-full w-full opacity-0 absolute '/>
            </i>
            <Image
              src={img}
              id="UploadImg"
              
              width={100}
              height={100}
              alt="UploadImg"
              loading='eager'
              priority
              className='block rounded-full h-auto w-auto max-h-[120px] '
              />
        </div>
              {loading && <span className=" z-50 my-2 relative font-medium text-base p-3 text-[#039be5]" >Uploading...</span> }
        <div className='mt-5 text-center'>
            <small className='text-sm text-[#999] '>
            Only images with a size lower than 3MB are allowed.
            </small>
        </div>
    </div>
    

              </>
    )
 }

 export default NewUserImageUpload