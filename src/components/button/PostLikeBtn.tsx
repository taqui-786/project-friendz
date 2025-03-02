"use client"
import { usePrevious } from '@mantine/hooks'
import { useMutation } from '@tanstack/react-query'
import React,{FC, useEffect, useState} from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import {PostVoteRequest} from '@/types/PostLikeValidator'
import axios, { AxiosError } from 'axios'
import { Button } from '../ui/button'
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'

interface postlikebtnprops{
postData: any
isLiked?: any
initialLikeAmt:any
}

const PostLikeBtn:FC<postlikebtnprops> = ({postData,isLiked,initialLikeAmt}) => {
    const postId = postData?.id
    
    const prevLike = usePrevious(initialLikeAmt)
    const [votesAmt, setVotesAmt] = useState<number>(initialLikeAmt)
    const [liked,setLiked] = useState<boolean>(false)                     
// CHECKING USER HAD LIKED POST OR NOT 
useEffect(()=>{
if(!isLiked){
    setLiked(false)
}else{
    setLiked(true)
}
},[isLiked])

useEffect(()=>{
    setVotesAmt(initialLikeAmt)
},[initialLikeAmt])

const {mutate: like , isLoading} = useMutation({
    
    mutationFn: async () => {
        const payload: PostVoteRequest ={
            postId: postId 
        }
        await axios.post('/api/user/post/newlike',payload)

    },
    mutationKey: ['like',postId],
    onError: (err) => {
        setVotesAmt(prevLike)
        if (err instanceof AxiosError) {
            if (err.response?.status === 401) {
                return toast.error(" Login First. ");

            }
        }

        return toast.error(" Unable to Like ");
    },
    onMutate: () =>{
        if( !liked){
            setLiked(true)
            setVotesAmt((prev) => prev + 1)
        }else{
            setLiked(false)
            setVotesAmt((prev) => prev - 1)
        }
    },


}) 


    return (
        <>

            {/* Like count  */}
            <div   className="relative flex justify-start  items-center mx-1 ">
                <Button disabled={isLoading} onClick={()=> like()} variant="ghost" className=" -top-[58px] -left-4 absolute h-[50px] w-[50px]  border border-[crimson] bg-white flex justify-center items-center rounded-full shadow-lg outline-none transition-colors " style={{color:!liked?"crimson":"#fff",backgroundColor:!liked?"#fff":"crimson"}}>

                <AiFillHeart className="h-[30px] w-[30px] " />
                </Button>
                
                <Button  className='h-fit w-fit p-0 outline-none' variant="ghost"  >{isLoading ? <Loader className="h-[18px] w-[18px] text-gray-500 animate-spin  "  /> :  <AiFillHeart className="h-[18px] w-[18px]  " style={{color:!liked?"#888da8":"crimson"}}  />}</Button>
              
                <span className="block text-sm mx-[6px]">{votesAmt}</span>
            </div>

        </>
    )
}

export default PostLikeBtn