import { FC } from "react";
import { VoteType, Vote, Post } from "@prisma/client";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import PostVoteClient from "./PostVoteClient";
interface PostVoteServerProps {
  postId: string;
  intialVotesAmt?: number;
  initialVote?: VoteType | null;
  getData?: () => Promise<(Post & { votes: Vote[] }) | null>;
}

const PostVoteServer = async ({
  postId,
  intialVotesAmt,
  initialVote,
  getData,
}: PostVoteServerProps) => {
  const session = await getServerSession();
  let _votesAmt: number = 0;
  let _currentVote: VoteType | null | undefined = undefined;

  if (getData) {
    const post = await getData();
    if (!post) return notFound();

    _votesAmt = post.votes.reduce((acc, vote) => {
      if (vote.type === VoteType.UP) return acc + 1;
      if (vote.type === VoteType.DOWN) return acc - 1;
      return acc;
    }, 0);
    _currentVote = post.votes.find(
      (vote) => vote.userId === session?.user.id
    )?.type;
  } else {
    _votesAmt = intialVotesAmt!;
    _currentVote = initialVote;
  }

  return <PostVoteClient postId={postId} initialVotesAmt={_votesAmt} initialVote={_currentVote} />;
};

export default PostVoteServer;