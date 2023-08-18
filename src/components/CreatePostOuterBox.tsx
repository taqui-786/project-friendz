import { getAuthSession } from '@/lib/auth'
import Image from 'next/image'
import React from 'react'
import CreatePostExitPost from './button/CreatePostExitPost'
import Editor from './Editor'
import { Button } from './ui/button'
async function CreatePostOuterBox() {
    const session = await getAuthSession()
  return (
    <div id='createPost' className=' overflow-auto hidden justify-center items-center opacity-100 fixed h-full w-full top-0 right-0 left-0 bottom-0 m-auto z-50' style={{background:"rgba(0,0,0,.6)"}}>
        <div className="p-4 rounded-md bg-white relative m-auto max-w-[95%] w-auto md:w-[60%] min-h-[75%] ">
            <div className="flex w-full p-3 relative border-b border-b-borderE3">
                {session?.user?.image && <Image src={session.user.image} alt='img' height={45} width={45} loading='eager' className='rounded-full' />}
                <div className='flex flex-col ml-2 font-serif' >
                    <h3 className='text-[#4a4a4a] text-base font-medium '>{session?.user.username}</h3>
                    <span className='text-[#666] text-sm'>{session?.user.name}</span>
                </div>
                <Button  form='create_post' className='ml-3 bg-[#3d70b2]'>Post</Button>
                <CreatePostExitPost/>
            </div>
            <div className='relative'>
                <Editor userId={session?.user?.id} />
            </div>
        </div>
    </div>
  )
}

export default CreatePostOuterBox