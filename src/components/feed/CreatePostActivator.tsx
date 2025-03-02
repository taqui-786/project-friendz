"use client"

import Image from 'next/image'
import React,{FC} from 'react'
interface CreatePostActivatorprops{
    image:string
}

const CreatePostActivator:FC<CreatePostActivatorprops>  = ({image}) => {

    const popupCreatePost = () =>{
        const createPost = document.getElementById('createPost')
        createPost? createPost.style.display = "flex" : ""
    }


  return (
    <div className="relative mb-4 sm:mb-6 border border-[#e8e8e8] bg-white cursor-text rounded-lg sm:rounded-xl shadow-none max-w-full text-[#4a4a4a]"
    onClick={popupCreatePost} >
        <div className="rounded-lg sm:rounded-xl">
            <div className="p-2 sm:p-4 border border-[#e8e8e8]">
                <div className="flex justify-start items-start">
                    { image && <Image src={image} alt='user' height={44} width={44} className='rounded-full w-8 h-8 sm:w-11 sm:h-11 border' loading='eager' priority />}
                    <div className="ml-3 sm:ml-4 bg-[#f7f7f7] rounded-md border border-[#e8e8e8] w-full clear-both relative">
                        <h3 className='text-[0.8rem] sm:text-[0.9rem] mt-2 sm:mt-[13px] mb-6 sm:mb-[51px] ml-3 sm:ml-[18px] mr-2 sm:mr-[9px]'>Write Something here to create your post...</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreatePostActivator