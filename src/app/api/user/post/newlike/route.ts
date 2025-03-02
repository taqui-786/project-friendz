import { db } from "@/lib/Prisma.db";
import { getAuthSession } from "@/lib/auth";
import { PostVoteValidator } from "@/types/PostLikeValidator";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    // Parse request and check auth in parallel
    const [body, session] = await Promise.all([
      req.json(),
      getAuthSession()
    ]);

    const { postId } = PostVoteValidator.parse(body);
    
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Use upsert with delete for atomic operation
    const result = await db.like.deleteMany({
      where: {
        userId: session.user.id,
        postId,
      },
    });

    if (result.count === 0) {
      // No like existed, so create one
      await db.like.create({
        data: {
          userId: session.user.id,
          postId,
        },
      });
      return new Response('Liked successfully', { status: 200 });
    }

    return new Response('Unliked successfully', { status: 200 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data", { status: 400 });
    }

    console.error('Like operation failed:', error);
    return new Response(
      "Operation failed. Please try again later",
      { status: 500 }
    );
  }
}
