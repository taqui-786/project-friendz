import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import EditorOutput from "../EditorOutput";
import { BiSolidComment } from "react-icons/bi";
import PostLikeBtn from "../button/PostLikeBtn";
import { Post, User } from "@prisma/client";
import CommentButton from "../button/CommentButton";
import { format } from 'timeago.js'
interface mypostProps {
  post: Post & {
    author: User;
    
  };
  commentLength?:number
  isPostLiked?: any;
  LikeAmt?:any
}
const MyPost: FC<mypostProps> = ({ post, isPostLiked ,commentLength,LikeAmt}) => {
  return (
    <>
      <div className="relative mb-6  border border-[#e8e8e8] bg-white rounded-[.85rem] text-[#4a4a4a] max-w-full max-h-fit ">
        <div>
          {/* HEAD  */}
          <div className="flex justify-start items-center pt-4 px-4 pb-0">
            <div className="flex justify-start items-center">
              <div className="relative block rounded-full bg-gray-500">
                {post?.author.image && (
                  <Image
                    src={post.author.image}
                    alt="post"
                    height={42}
                    width={42}
                    loading="eager"
                    priority
                    className="block rounded-full w-[42px] h-[42px] max-h-[42px]"
                  />
                )}
              </div>
              <div className="py-0 px-[10px] flex flex-col">
                <Link
                  href={`/profile/${post.authorId}`}
                  className="text-[0.9rem] text-[#393a4f] font-medium"
                >
                  {post.author.username}
                </Link>
                <span className="text-[#999] text-[0.8rem]">{format(post.createdAt)}</span>
              </div>
            </div>
            <div className="ml-auto inline-flex relative align-top">
              {/* THREE DOT ICON AND DROPDOWN  */}
            </div>
          </div>
          {/* BODY  */}
          <div className="px-4 pt-4 pb-0">
            <Link
              href={`/post/${post.id}`}
              className="relative mx-h-80 overflow-hidden decoration-transparent"
            >
              <div>
                <h2 className="text-[#222] text-lg font-semibold ">
                  {post?.title}
                </h2>
              </div>
              <EditorOutput content={post?.content} />
            </Link>
          </div>
          {/* FOOTER  */}
          <div className="flex justify-center items-center p-4 m-0 ">
            <div className="ml-3 ">
              <div>
                {/* <Link
                  className="text-[.8rem] text-[#393a4f] font-medium"
                  href={"/"}
                >
                  Milly
                </Link>
                ,
                <Link
                  className="text-[.8rem] text-[#393a4f] font-medium"
                  href={"/"}
                >
                  
                </Link> */}
                <p className="text-[.7rem] text-[#888da8]">
                  © FRIENDZ
                </p>
              </div>
            </div>
            <div className="ml-auto relative flex items-stretch">
              {/* Like count  */}
              <PostLikeBtn postData={post} isLiked={isPostLiked} initialLikeAmt={LikeAmt}  />
              <CommentButton postId={post.id} />
              {/* comment count  */}
              <div className="flex justify-start text-[#888da8] items-center mx-1">
                <BiSolidComment className="h-[18px] w-[18px]" />
                <span className="block text-sm mx-[6px]">{commentLength}</span>
              </div>
            </div>
          </div>
        </div>
        {/* COMMENT WILL BE HERE -->  */}
      </div>
    </>
  );
};

export default MyPost;
