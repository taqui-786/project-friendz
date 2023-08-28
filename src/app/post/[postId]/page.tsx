import CommentInput from "@/components/CommentInput";
import CommentOuterBox from "@/components/CommentOuterBox";
import EditorOutput from "@/components/EditorOutput";
import ExitProfileBtn from "@/components/button/ExitProfileBtn";
import FollowButton from "@/components/button/FollowButton";
import PostLikeServer from "@/components/button/PostLikeServerside";
import { db } from "@/lib/Prisma.db";
import { getAuthSession } from "@/lib/auth";
import { redis } from "@/lib/redis";
import { CachedPost } from "@/types/redis";
import { Like, User, Post } from "@prisma/client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { format } from 'timeago.js'
interface postpagerpops {
  params: {
    postId: string;
  };
}
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
const page = async ({ params }: postpagerpops) => {
  const session = await getAuthSession();
  const cachedPost = (await redis.hgetall(
    `post:${params.postId}`
  )) as CachedPost;
  let cachedUser;
  if (cachedPost) {
    cachedUser = await db.user.findUnique({
      where: {
        username: cachedPost.authorUsername,
      },
      
    });
  }
  let post: (Post & { like: Like[]; author: User }) | null = null;

  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        like: true,
        author:true
      },
    });
    
  }

  const isFollowed = await db.user.findUnique({
    where:{
      id: cachedUser?.id ?? post?.author.id
    },
    include:{
      followers:true
    }
  })
  let isUserFollowed = isFollowed?.followers.find(
    (val) => val.followerId === session?.user.id
  );
  
  if (!post && !cachedPost) return notFound();

  return (
    <div className="z-50 h-screen w-screen relative overflow-y-auto md:overflow-hidden grid md:flex   justify-center md:items-center  ">
      {/* pageId: {params.postId} */}
      {/* left  side */}
      <div className="p-4 h-full w-[inherit] md:w-[68%] bg-colorF7 flex justify-center items-center">
        <div className="relative mb-6 border w-fit min-w-[35%] min-h-[30%] border-[#e8e8e8] bg-white rounded-[.85rem] text-[#4a4a4a] max-h-[600px] md:max-h-[520px] ">
          <div>
            {/* HEAD  */}
            <div className="flex justify-start items-center pt-4 px-4 pb-0"></div>
            {/* BODY  */}
            <div className="px-4 py-4 ">
              <div className="relative mx-h-80 overflow-hidden decoration-transparent">
                <div>
                  <h2 className="text-[#222] text-lg">
                    {" "}
                    {post?.title ?? cachedPost.title}
                  </h2>
                </div>
                <EditorOutput content={post?.content ?? cachedPost.content} />
              </div>
            </div>
            {/* FOOTER  */}
          </div>
        </div>
      </div>

      <div className="h-full w-full  md:w-[32%] flex">
        <div className="relative bg-white text-[#6c6f73] py-3 h-full w-[89%] flex flex-col">
          {/* **** HEAD --->  */}
          <div className="w-full flex justify-start items-center p-3 bg-transparent">
            {post?.author?.image && !cachedUser && (
              <Image
                src={post.author.image}
                alt="user"
                height={42}
                width={42}
                loading="eager"
                className="rounded-full w-[42px] h-[42px] max-h-[42px]"
              />
            )}
            {cachedUser?.image && (
              <Image
                src={cachedUser.image}
                alt="user"
                height={42}
                width={42}
                loading="eager"
                className="rounded-full w-auto h-auto max-h-[42px] "
              />
            )}
            <div className="px-[10px]">
              <span className="block text-sm font-medium">
                {cachedUser ? cachedUser?.name : post?.author.name}
              </span>
              <span className="block text-[.78rem] text-left text-[#999]">
                <small>{format(cachedPost?.createdAt ?? post?.createdAt)}</small>
              </span>
            </div>
            {/* FOLLOW BUTTON  */}
            <FollowButton
              myId={session?.user.id}
              toFollow={isFollowed?.id}
              isFollowed={isUserFollowed}
            />
          </div>
          {/* ----- Inner Content LIKE ANd Comment */}
          <div className="p-3">
            <div className="flex justify-between items-center pb-5 border-b border-b-[#e8e8e8]">
              {/* LIKE SERVER SIDE  */}
              <Suspense fallback={<MyLoader />}>
                <PostLikeServer
                  postId={post?.id ?? cachedPost.id}
                  getData={async () => {
                    return await db.post.findUnique({
                      where: {
                        id: params.postId,
                      },
                      include: {
                        like: true,
                        comments: true,
                      },
                    });
                  }}
                />
              </Suspense>
            </div>
            <div className="flex justify-between items-center pt-3">
              <div className="flex justify-center items-center cursor-pointer">
                <AiOutlineHeart className="h-[17px] w-[17px] " />
                <span className="block text-sm mx-1">Like</span>
              </div>
              <div className="flex justify-center items-center cursor-pointer">
                <div className="flex justify-center items-center cursor-pointer">
                  <BiComment className="h-[17px] w-[17px] " />
                  <span className="block text-sm mx-1">Comment</span>
                </div>
              </div>
            </div>
          </div>
          {/* COMMENT BOX ->  */}
          {/* <CommentOuterBox postId={params.postId} /> */}
          <Suspense
            fallback={
              <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
            }
          >
            {/* @ts-expect-error Server Component */}
            <CommentOuterBox postId={post?.id ?? cachedPost.id} />
          </Suspense>

          {/* COMMENT SENT   INPUT BOX  */}
          <CommentInput postId={post?.id ?? cachedPost.id} />
          {/* EXIT BUTTON  */}
        </div>
        <div className="relative z-50 bg-[#5596e6]  h-full w-[11%] pt-2">
          <ExitProfileBtn />
        </div>
      </div>
    </div>
  );
};

export default page;

function MyLoader() {
  return (
    <>
      <Loader2 className="h-3 w-3 p-4 m-auto text-[blue] animate-spin" />
    </>
  );
}
