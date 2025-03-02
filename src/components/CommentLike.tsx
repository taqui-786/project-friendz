"use client";
import { FC, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentVoteRequest } from "@/lib/commentValidator";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

interface CommmentLikeProps {
  commentId: string;
  votesAmt: number;
  currentVote?: any;
}

const CommmentLike: FC<CommmentLikeProps> = ({
  commentId,
  votesAmt: initialVotesAmt,
  currentVote: initialVote,
}) => {
  const [optimisticVotes, setOptimisticVotes] = useState<number>(initialVotesAmt);
  const [optimisticLiked, setOptimisticLiked] = useState<boolean>(!!initialVote);
  const queryClient = useQueryClient();

  const { mutate: like, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CommentVoteRequest = { commentId };
      return await axios.post('/api/user/post/comment/commentlike', payload);
    },
    mutationKey: ['comment-like', commentId],
    onError: (err) => {
      // Revert optimistic update
      setOptimisticVotes(initialVotesAmt);
      setOptimisticLiked(!!initialVote);
      
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return toast.error('Please login to like comments');
        }
      }
      return toast.error('Failed to update like');
    },
    onMutate: () => {
      // Optimistic update
      setOptimisticLiked((current) => !current);
      setOptimisticVotes((prev) => prev + (optimisticLiked ? -1 : 1));
    },
    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['comments', commentId]);
    },
  });

  return (
    <>
      <div className="pl-3 text-[#999] flex items-center gap-2 text-xs">
        <Button
          variant="ghost"
          size="sm"
          disabled={isLoading}
          onClick={() => like()}
          className="p-0 h-auto hover:bg-transparent"
        >
          <AiFillHeart 
            className={`text-lg transition-colors ${
              optimisticLiked ? 'text-red-500' : 'text-[#888da8]'
            } hover:scale-110 active:scale-95`}
          />
        </Button>
        <span>{optimisticVotes}</span>
      </div>
    </>
  );
};

export default CommmentLike;
