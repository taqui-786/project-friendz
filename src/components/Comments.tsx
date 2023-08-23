"use client";
import { Comment, CommentVote, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC, useRef, useState } from "react";
import { Button } from "./ui/button";
import CommmentLike from "./CommentLike";
import { Textarea } from "./ui/textarea";
import axios, { AxiosError } from "axios";
import { CommentRequest } from "@/lib/commentValidator";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { format } from 'timeago.js'
type ExtendedComment = Comment & {
  like: CommentVote[];
  author: User;
};

interface PostCommentProps {
  comment: ExtendedComment;
  votesAmt: number;
  currentVote: CommentVote | undefined;
  postId: string;
}

const Comments: FC<PostCommentProps> = ({
  comment,
  postId,
  currentVote,
  votesAmt,
}) => {
  // const { data: session } = useSession();
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const commentRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<string>(`@${comment.author.name} `)


// COMMENT REPLY FINCTION 
const router = useRouter()
const { mutate: replyComment, isLoading } = useMutation({
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
      setIsReplying(false)
      router.refresh()
      setInput('')
    },
  })




  return (
    <div className="flex items-center mb-4 flex-col  "  ref={commentRef}>
        <div className="h-full w-full flex items-center ">

      <figure className="mr-[10px] mb-auto mt-3  basis-0 grow-0 shrink-0 block ">
        <p className="h-8 w-8 block relative ">
          {comment.author.image && (
              <Image
              src={comment.author.image}
              alt="img"
              height={32}
              width={32}
              loading="eager"
              priority
              className="block h-8 w-8 rounded-full"
              />
              )}
        </p>
      </figure>
      <div className="p-4 rounded-md bg-white basis-auto grow shrink">
        <div className="text-sm font-bold ">{comment.author.name}</div>
        <p className="text-xs text-[#999]"  >{comment.text} </p>
        <div className="flex items-center pt-1">
          <span className="px-3 text-[#999] block text-xs">{format(comment.createdAt)}</span>
          <CommmentLike
            commentId={comment.id}
            votesAmt={votesAmt}
            currentVote={currentVote}
            />
          <Button
            variant="ghost"
            size="sm"
            className="text-[#999]"
            onClick={() => setIsReplying(true)}
          >
            Reply
          </Button>
        </div>
      </div>
      </div>
        {isReplying ? 
      <div className="relative bottom-0 left-0 bg-transparent h-[85px] w-full ">
        <div className="relative flex items-center w-full h-full px-4">
          {/* INPUT box */}
          <div className="mt-0 w-[80%]">
            <Textarea
                 onFocus={(e) =>
                    e.currentTarget.setSelectionRange(
                      e.currentTarget.value.length,
                      e.currentTarget.value.length
                    )
                  }
                  autoFocus
                  id='comment'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={1}
                  placeholder='What are your thoughts?'
            />
          </div>
          <div className="mt-2 w-[20%] h-full flex justify-evenly flex-col items-center">
            <Button
              size={"xs"}
              isLoading={isLoading}
              onClick={() => {
                if (!input) return
                replyComment({
                  postId,
                  text: input,
                  replyToId: comment.replyToId ?? comment.id, // default to top-level comment
                })}}
            >
              Reply
            </Button>
            <Button
            variant="destructive"
            size="xs"
            onClick={() => setIsReplying(false)}
            >
                Cancel
            </Button>
          </div>
        </div>
      </div>
    : null}
    </div>

  );
};
export default Comments;
