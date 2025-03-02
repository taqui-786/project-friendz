import { db } from "@/lib/Prisma.db";
import { CommentVote, User } from "@prisma/client";
import { FC } from "react";
import Comments from "./Comments";
import { getAuthSession } from "@/lib/auth";
import { BsArrowReturnRight } from "react-icons/bs";
import { CommentInputBox } from "./CustomComponents/CommentInputBox";

type ExtendedComment = Comment & {
  votes: CommentVote[];
  author: User;
  replies: ReplyComment[];
};

type ReplyComment = Comment & {
  votes: CommentVote[];
  author: User;
};

interface CommentOuterBoxProps {
  postId: string;
  comments: ExtendedComment[];
}
const CommentOuterBox = async ({ postId }: CommentOuterBoxProps) => {
  const session = await getAuthSession();
  const comments = await db.comment.findMany({
    where: {
      postId: postId,
      replyToId: undefined, // only fetch top-level comments
    },
    include: {
      author: true,
      like: true,
      replies: {
        // first level replies
        include: {
          author: true,
          like: true,
        },
      },
    },
  });

  return (
    <>
      {/* COMMENT OUTER BOX   */}
      <div
        className="bg-[#f5f6f7] py-5 px-[14px] overflow-y-auto "
        style={{ height: "calc(100% - 220px)" }}
      >
        {/* COMMENTS  */}
        {comments
          .filter((comment) => !comment.replyToId)
          .map((topLevelComment, index, array) => {
            // CHECKING THAT COMMENT IS LIKED OR NOT
            const isLiked = topLevelComment.like.find(
              (vote) => vote.userId === session?.user.id
            );
            // LIKES
            const topLevelCommentVotesAmt = topLevelComment?.like.length;
            return (
              <>
                <Comments
                  currentVote={isLiked}
                  votesAmt={topLevelCommentVotesAmt}
                  postId={postId}
                  comment={topLevelComment}
                  key={topLevelComment.id}
                  islastComment={index === array.length - 1}
                />
                {topLevelComment.replies
                  .sort((a, b) => b.like.length - a.like.length) // Sort replies by most liked
                  .map((reply) => {
                    const replyVote = reply.like.find(
                      (vote) => vote.userId === session?.user.id
                    );

                    const replyVoteAmt = reply?.like.length;

                    return (
                      <div className="relative ml-10 h-fit " key={reply.id}>
                        <h3 className="absolute  -top-[20px] left-0 p-2">
                          <BsArrowReturnRight className="text-2xl text-[#999]" />{" "}
                        </h3>
                        <Comments
                          currentVote={replyVote}
                          votesAmt={replyVoteAmt}
                          postId={postId}
                          comment={reply }
                        />
                      </div>
                    );
                  })}
              </>
            );
          })}
      </div>
      {/* COMMENT SENT   INPUT BOX  */}
      <CommentInputBox postId={postId} />
    </>
  );
};

export default CommentOuterBox;
