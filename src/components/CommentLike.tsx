"use client";
import { FC, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { Button } from "./ui/button";
import { usePrevious } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { CommentVoteRequest } from "@/lib/commentValidator";
import axios, { AxiosError } from "axios";

interface CommmentLikeProps {
  commentId: string;
  votesAmt: number;
  currentVote?: any;
}
const CommmentLike: FC<CommmentLikeProps> = ({
  commentId,
  votesAmt: _votesAmt,
  currentVote: _currentVote,
}) => {
  const [votesAmt, setVotesAmt] = useState<number>(_votesAmt);
  const [currentVote, setCurrentVote] = useState(_currentVote);
  const [liked,setLiked] = useState<boolean>(false)   
  const prevLike = usePrevious(currentVote)



  useEffect(()=>{
    if(!_currentVote){
        setLiked(false)
    }else{
        setLiked(true)
    }
    },[_currentVote])
    // LIKE FUNCTION 
    const {mutate: Like , isLoading} = useMutation({
        mutationFn: async () => {
            const payload: CommentVoteRequest = {
              commentId,
            }
      
            await axios.post('/api/user/post/comment/commentlike', payload)
          },
          onError: (err) => {
            setVotesAmt(prevLike)
            setLiked(false)
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    return console.log('login first');
    
                }
            }
    
            return window.alert(' like error ')
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
      <span className="pl-3 text-[#999] flex text-xs">
        <AiFillHeart className="text-base" style={{color:!liked?"#888da8":"crimson"}} />
        {votesAmt}
      </span>
      <Button variant="ghost" disabled={isLoading} size="sm" className="text-[#999]" isLoading={isLoading} onClick={() => Like()}>
        Like
      </Button>
    </>
  );
};

export default CommmentLike;
