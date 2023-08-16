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
    <div className="relative mb-6 border border-[#e8e8e8] bg-white rounded-xl shadow-none max-w-full text-[#4a4a4a]"
    onClick={popupCreatePost} >
                    <div className="rounded-xl">
                        <div className="p-8 border border-[#e8e8e8]">
                            <div className="flex justify-center items-center">
                                { image && <Image src={image} alt='user' height={42} width={42} className='rounded-full' loading='eager' priority />}
                                <div className="ml-12 w-full clear-both  relative">
                                    <h3 className='text-[.9rem] '>Write Somethig here to create post...</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
  )
}

export default CreatePostActivator