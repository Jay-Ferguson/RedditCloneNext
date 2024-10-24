import { PostVoteValidator } from "@/lib/validators/vote";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CommentVoteValidator } from "@/lib/validators/vote";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const body = req.json();

    const { commentId, voteType } = CommentVoteValidator.parse(body);

    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const existingVote = await db.commentVote.findFirst({
      where: {
        userId: session.user.id,
        commentId,
      },
    });

    if (existingVote) {
      if (existingVote.type === voteType) {
        await db.commentVote.delete({
          where: {
            userId_commentId: {
              commentId,
              userId: session.user.id,
            },
          },
        });

        return new Response("OK");
      } else {
        await db.commentVote.update({
          where: {
            userId_commentId: {
              commentId: commentId,
              userId: session.user.id,
            },
          },
          data: {
            type: voteType,
          },
        });
        return new Response("OK");
      }
    }

    await db.commentVote.create({
      data: {
        type: voteType,
        userId: session.user.id,
        commentId,
      },
    });

    //recount the votes
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("invalid request passed", { status: 400 });
    }
    return new Response(
      "Could not post to subreddit at this time, please try again later",
      {
        status: 500,
      }
    );
  }
}
