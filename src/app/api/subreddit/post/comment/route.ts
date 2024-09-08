import { CommentValidator } from "@/lib/validators/comment"
import { db } from "@/lib/db"
import { getAuthSession } from "@/lib/auth"
import z from "zod"
export async function PATCH(req: Request) {
     try {
          const body = await req.json()
          const {postId, text, replyToId} = CommentValidator.parse(body)
          const session = await getAuthSession()

          if(!session?.user) {
               return new Response('Unauthorized', {status:401})
          }

          await db.comment.create({
            data: {
              text,
              postId,
              authorId: session.user.id,
              replyToId,
            },
          });

          return new Response ('this is a ok response', {status:200})
     } catch(error) {
          if (error instanceof z.ZodError) {
            return new Response("Invalid request data passed", { status: 422 });
          }

          return new Response("Could not create the posted comment", {
            status: 500,
          });

     }
}
