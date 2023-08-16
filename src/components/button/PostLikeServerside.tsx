import { getAuthSession } from "@/lib/auth";
import { Comment, Like, Post } from "@prisma/client";
import { notFound } from "next/navigation";
import { AiOutlineHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";

interface PostVoteServerProps {
  postId: string;
  initialVotesAmt?: number;
  initialVote?: any;
  getData?: () => Promise<(Post & { like: Like[] } & { comments: Comment[] }) | null>;
}

const PostLikeServer = async ({
  postId,
  initialVotesAmt,
  initialVote,
  getData,
}: PostVoteServerProps) => {
  const session = await getAuthSession();

  let _votesAmt: number = 0;
  let _commentAmt: number = 0;
  let _currentVote: Like[];

  if (getData) {
    // fetch data in component
    const post = await getData();
    if (!post) return notFound();


    _votesAmt = post.like.length;
    _commentAmt = post.comments.length;

    // @ts-ignore
    _currentVote = post.like.find((vote) => vote.userId === session?.user?.id);
  } else {
    // passed as props
    _votesAmt = initialVotesAmt!;
    _currentVote = initialVote;
  }

  return (
    <>
      <div className="flex items-stretch ">
        <div className="flex justify-start items-center text-[#888da8] mx-[3px]">
          <AiOutlineHeart className="h-[15px] w-[15px] " />
          <span className="block text-sm mx-1 ">{_votesAmt}</span>
        </div>

        <div className="flex justify-start items-center text-[#888da8] mx-[3px]">
          <BiComment className="h-[15px] w-[15px] " />
          <span className="block text-sm mx-1 ">{_commentAmt}</span>
        </div>
      </div>
      <div className="flex items-stretch ml-auto">
        <div className="flex justify-start items-center mx-1 text-[#888da8]">
          <span className="block text-sm mx-1 ">{_commentAmt}</span>
          <span className="block text-sm mx-[2px]">
            <small>Comments</small>
          </span>
        </div>
      </div>
    </>
  );
};

export default PostLikeServer;
