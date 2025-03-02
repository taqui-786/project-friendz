import { db } from "@/lib/Prisma.db";
import { getAuthSession } from "@/lib/auth";
import { CommentVoteValidator } from "@/lib/commentValidator";

import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { commentId } = CommentVoteValidator.parse(body);
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    // check if user has already voted on this post
    const existingLike = await db.commentVote.findFirst({
      where: {
        userId: session.user.id,
        commentId,
      },
    });

    if (existingLike) {
      await db.commentVote.delete({
        where: {
          id: existingLike.id,
        },
      });

      return new Response("Deleted Comment like");
    } else {
      await db.commentVote.create({
        data: {
          userId: session.user.id,
          commentId,
        },
      });
      return new Response("Liked Comment");
    }

    return new Response("error");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Could not like.. Please try later" + error, {
      status: 500,
    });
  }
}
