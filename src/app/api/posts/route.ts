import { z } from "zod";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const session = await getAuthSession();
  let followedCommunitiesIds: string[] = [];

  if (session) {
    const followedCommunities = await db.subscription.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        subreddit: true,
      },
    })
    followedCommunitiesIds = followedCommunities.map(
      ({subreddit}) => subreddit.id
    )
  }

  try {
     const {limit, page, subredditName} = z.object({
          limit:z.string(),
          page:z.string(),
          subredditName:z.string().nullish().optional(),
     }).parse({
          subredditName:url.searchParams.get('subredditName'),
          limit: url.searchParams.get('limit'),
          page: url.searchParams.get('page'),
     })

     let whereClause = {}

     if (subredditName) {
       whereClause = {
         subreddit: {
           name: subredditName,
         },
       };
     } else if (session) {
       whereClause = {
         subreddit: {
           id: {
             in: followedCommunitiesIds,
           },
         },
       };
     }
  } catch (error) {}
}
