import { db } from "@/lib/Prisma.db";
import { getAuthSession } from "@/lib/auth";
import {
  FollowUserValidator,
} from "@/types/PostLikeValidator";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { toFollowId } = FollowUserValidator.parse(body);
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    // IF THE FOLLOWING USER IS THE USER ONLY 
    if (session.user.id === toFollowId) {
      return new Response("Action Prohibited !", { status: 40 });
    }
    // check if user has already voted on this post
    const existingUser = await db.follows.findFirst({
      where: {
        followingId: toFollowId,
        followerId: session.user.id,
      },
    });

    if (existingUser) {
      await db.follows.delete({
        where: {
          id: existingUser.id,
        },
      });

      return new Response("unfollowed");
    } else {
      await db.follows.create({
        data: {
          followerId: session.user.id,
          followingId: toFollowId,
        },
      });

      return new Response("followed");
    }

    return new Response("ok");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Could not like.. Please try later" + error, {
      status: 500,
    });
  }
}
