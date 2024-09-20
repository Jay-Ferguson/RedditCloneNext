import { use, useRef, useState } from "react";
import { FC } from "react";
import { Comment, User } from "@prisma/client";
import UserAvatar from "./UserAvatar";
import { formatTimeToNow } from "@/lib/utils";
import { CommentVote } from "@prisma/client";
import CommentVotes from "./CommentVotes";
import { Button } from "./ui/Button";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { set } from "date-fns";
import { Label } from "@radix-ui/react-dropdown-menu";

type ExtendedComment = Comment & {
  votes: CommentVote[];
  author: User;
};
interface PostCommentProps {
  comment: ExtendedComment;
  votesAmt: number;
  currentVote?: CommentVote | undefined;
  postId: string;
}

const PostComment: FC<PostCommentProps> = ({
  comment,
  votesAmt,
  currentVote,
  postId,
}) => {
  const commentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const {data:session} = useSession()
  return (
    <div ref={commentRef} className="flex flex-col">
      <div className="flex flex-center">
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
          className="h-6 w-6 "
        ></UserAvatar>

        <div className="ml-2 flex items-center gap-x-2">
          <div className="text-sm font-medium text-grey-900">
            u/{comment.author.username}
          </div>
          <p className="max-h-40 truncate text-xs text-zinc-500">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>
      <p className="text-sm text-zinc-500 truncate">{comment.text}</p>
      <CommentVotes
        commentId={comment.id}
        initialVotesAmt={votesAmt}
        initialVote={currentVote}
      />


  <Button onClick={() => {
    if(!session) {
      router.push('/sign-in')
      setIsReplying(true)
    }
  }} variant='ghost' size='xs' aria-label='reply'>
    <MessageSquare className="h-4 w-4 mr-1.5" />
    Reply
    </Button>

    {isReplying ? (
      <div className="grid w-full gap-1.5">
        <Label>Your comment</Label>
      </div>
    ): null}
    </div>
  );
};

export default PostComment;
