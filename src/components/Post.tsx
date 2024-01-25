'use client'

import { FC, useRef } from "react";
import type { Post, User, Vote } from "@prisma/client";

type PartialVote = Pick<Vote, "type">;
interface PostProps {
  post: Post & {
    author: User,
    votes: Vote[],
  };
  votesAmt: number;
  subredditName: string;
  currentVote?: PartialVote;
  commentAmt: number;
}

const Post: FC<PostProps> = ({ subredditName, post }) => {
  return (
    <div className="round-md bg-white shadow">
      <div className="px-6 py-6 flex justify-between">
        {/* Postvotes */}
        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            {subredditName ? (
              <>
                <a
                  className="underline text-zinc-900 text-sm underline-offset-2"
                  href={`/r/${subredditName}`}
                >
                  r/{subredditName}
                </a>
                <span className="px-1">-</span>
              </>
            ) : null}
            <span>Posted by u/{post.author.name}</span>

            {formatTimeToNow}
          </div>
        </div>
      </div>
      Post
    </div>
  );
};

export default Post;
