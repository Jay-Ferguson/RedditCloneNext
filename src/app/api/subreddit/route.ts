import { getAuthSession } from "@/lib/auth";
import { SubredditValidator } from "@/lib/validators/subreddit";
import { db } from "@/lib/db";
export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json()
    const {name} = SubredditValidator.parse(body)

    const subredditExists = await db.subreddit
  } catch (error) {}
}
