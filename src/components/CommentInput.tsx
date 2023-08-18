"use client"

import { FC, useState } from "react"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { CommentRequest } from "@/lib/commentValidator"
import { useRouter } from "next/navigation"
interface CreateCommentProps {
    postId: string
    replyToId?: string
  }
const CommentInput: FC<CreateCommentProps> = ({ postId, replyToId }) =>{
  const router = useRouter()
    const [input, setInput] = useState<string>('')
    const { mutate: comment, isLoading } = useMutation({
        mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
          const payload: CommentRequest = { postId, text, replyToId }
    
          const { data } = await axios.patch(
            `/api/user/post/comment`,
            payload
          )
          return data
        },
    
        onError: (err) => {
          if (err instanceof AxiosError) {
            if (err.response?.status === 401) {
            //   return loginToast()
            }
          }
           return window.alert('Something went wrong')
     
        },
        onSuccess: () => {
          router.refresh()
          setInput('')
        },
      })
    
    return(

        <>
        <div className="absolute bottom-0 left-0 bg-[#fbfbfc] h-[85px] w-full border-l border-l-[#dee2e5]">
            <div className="relative flex items-center w-full h-full px-4">
              {/* INPUT box */}
              <div className='mt-0 w-[80%]'>
        <Textarea
          id='comment'
          value={input}
          className="min-h-[64px] max-h-[65px]"
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder='What are your thoughts?'
        />

            </div>
        <div className='mt-2 w-[20%] flex justify-end'>
          <Button
          size="xs"
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => comment({ postId, text: input, replyToId })}>
            Send
          </Button>
        </div>
            </div>
          </div>
        
        </>
    )
}
export default CommentInput