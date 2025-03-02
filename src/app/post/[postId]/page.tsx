import CommentInput from "@/components/CommentInput";
import CommentOuterBox from "@/components/CommentOuterBox";
import { CommentInputBox } from "@/components/CustomComponents/CommentInputBox";
import EditorOutput from "@/components/EditorOutput";
import ExitProfileBtn from "@/components/button/ExitProfileBtn";
import FollowButton from "@/components/button/FollowButton";
import PostLikeServer from "@/components/button/PostLikeServerside";
import { db } from "@/lib/Prisma.db";
import { getAuthSession } from "@/lib/auth";
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
  
  const post = await db.post.findFirst({
    where: {
      id: params.postId,
    },
    include: {
      like: true,
      author: true
    },
  });

  const isFollowed = await db.user.findUnique({
    where:{
      id: post?.author.id
    },
    include:{
      followers:true
    }
  })
  let isUserFollowed = isFollowed?.followers.find(
    (val) => val.followerId === session?.user.id
  );
  
  if (!post) return notFound();

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
                  <h2 className="text-[#222] text-lg">{post.title}</h2>
                </div>
                <EditorOutput content={post.content} />
              </div>
            </div>
            {/* FOOTER  */}
          </div>
        </div>
      </div>

      <div className="h-full w-full  md:w-[32%] flex">
        <div className="relative bg-[#f5f6f7]  text-[#6c6f73] py-3 h-full w-[89%] flex flex-col">
          <div className="bg-white">
          {/* **** HEAD --->  */}
          <div className="w-full flex justify-start items-center p-3 bg-transparent">
            {post.author.image && (
              <Image
                src={post.author.image}
                alt="user"
                height={42}
                width={42}
                loading="eager"
                className="rounded-full w-[42px] h-[42px] max-h-[42px]"
              />
            )}
            <div className="px-[10px]">
              <span className="block text-sm font-medium text-black">{post.author.name}</span>
              <span className="block text-xs text-left text-gray-500">
                {format(post.createdAt)}
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
                  postId={post.id}
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
          </div></div>
          {/* COMMENT BOX ->  */}
          {/* <CommentOuterBox postId={params.postId} /> */}
          <Suspense
            fallback={
              <div className="flex flex-col gap-4 p-4">
                {/* Multiple skeleton comments for better UX */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3 animate-pulse">
                    {/* Avatar skeleton */}
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    <div className="flex-1">
                      {/* Username and time skeleton */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-4 w-24 bg-gray-200 rounded" />
                        <div className="h-3 w-16 bg-gray-100 rounded" />
                      </div>
                      {/* Comment text skeleton */}
                      <div className="space-y-2">
                        <div className="h-4 w-3/4 bg-gray-100 rounded" />
                        <div className="h-4 w-1/2 bg-gray-100 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }
          >
            {/* @ts-expect-error Server Component */}
            <CommentOuterBox postId={post.id} />
          </Suspense>

   
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
