import { db } from "@/lib/Prisma.db";
import { getAuthSession } from "@/lib/auth";
import { redis } from "@/lib/redis";
import { PostVoteValidator } from "@/types/PostLikeValidator";
import { CachedPost } from "@/types/redis";
import { z } from "zod";



export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { postId } = PostVoteValidator.parse(body);
    const session = await getAuthSession();
    
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    // check if user has already voted on this post
    const existingLike = await db.like.findFirst({
      where: {
        userId: session.user.id,
        postId,
      },
    });

    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true,
        like: true,
      },
    });







    if(existingLike){
        await db.like.delete({

            where: {
                id:existingLike.id
            },
        });
        
          //@ts-ignore
          const cachePayload: CachedPost = {
            //@ts-ignore
            authorUsername: post?.author?.username ?? '',
            //@ts-ignore
            content: JSON.stringify(post.content),
            //@ts-ignore
            id: post?.id,
            //@ts-ignore
            title: post?.title,
            //@ts-ignore
            createdAt: post?.createdAt,
          }

          await redis.hset(`post:${postId}`, cachePayload) // Store the post data as a hash

        return new Response('reddis OK')
      

    }else{

        await db.like.create({
            data: {
                userId: session.user.id,
                postId,
            },
        });

        
                  //@ts-ignore
                  const cachePayload: CachedPost = {
                    //@ts-ignore
                    authorUsername: post?.author?.username ?? '',
                    //@ts-ignore
                    content: JSON.stringify(post.content),
                    //@ts-ignore
                    id: post?.id,
                    //@ts-ignore
                    title: post?.title,
                    //@ts-ignore
                    createdAt: post?.createdAt,
                  }
        
                  await redis.hset(`post:${postId}`, cachePayload) // Store the post data as a hash
        
                return new Response('reddis liked ')
              
    }

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }
    return new Response("ok");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not like.. Please try later" + error,
      { status: 500 }
    );
  }
}
