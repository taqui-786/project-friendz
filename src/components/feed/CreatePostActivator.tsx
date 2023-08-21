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
    <div className="relative mb-6 border border-[#e8e8e8] bg-white cursor-text rounded-xl shadow-none max-w-full text-[#4a4a4a]"
    onClick={popupCreatePost} >
                    <div className="rounded-xl">
                        <div className="p-4 border border-[#e8e8e8]">
                            <div className="flex justify-start items-center">
                                { image && <Image src={image} alt='user' height={44} width={44} className='rounded-full w-11 h-11' loading='eager' priority />}
                                <div className="ml-12 bg-[#f7f7f7] rounded-md border border-[#e8e8e8]  w-full clear-both  relative sm:ml-4">
                                    <h3 className='text-[.9rem] mt-[13px] mb-[51px] ml-[18px] mr-[9px] '>Write Something here to create your post...</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
  )
}

export default CreatePostActivator