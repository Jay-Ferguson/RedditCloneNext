import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { notFound } from "next/navigation";
import MiniCreatePost from "@/components/MiniCreatePost";
import PostFeed from "@/components/PostFeed";

interface pageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: pageProps) => {
  const { slug } = params;

  const session = await getAuthSession();

  const subreddit = await db.subreddit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true,
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULTS
      },
    },
  });

  
if(!subreddit) return notFound()

  return <div>

     <h1 className='font-bold text-3xl md:text-4xl h-14'>
          r/{subreddit.name}
     </h1>
     <MiniCreatePost session={session}/>
     {/* show post in user feed  */}
     {/* come back to this typescript issue with the initial post props */}
     {/* @ts-ignore */}
     <PostFeed initialPosts={subreddit.posts} subredditName={subreddit.name}/>
  </div>;
};

export default page;
