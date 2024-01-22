import { ExtendedPost } from "@/types/db";
import { FC } from "react";

interface PostFeedProps {
  intialPosts: ExtendedPost[];
  subredditName?: string;
}

const PostFeed: FC<PostFeedProps> = ({ intialPosts, subredditName }) => {
  return <div>PostFeed</div>;
};

export default PostFeed;
