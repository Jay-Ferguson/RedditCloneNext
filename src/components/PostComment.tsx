import { useRef } from "react";
import { FC } from "react";
import { Comment, User } from "@prisma/client";
import UserAvatar from "./UserAvatar";
import { formatTimeToNow } from "@/lib/utils";
import { CommentVote } from "@prisma/client";

type ExtendedComment = Comment & {
  votes: CommentVote[];
  author: User;
};
interface PostCommentProps {
  comment: ExtendedComment;
  votesAmt: number;
  currentVote?: CommentVote | undefined;
  postId:string
}

const PostComment: FC<PostCommentProps> = ({comment, votesAmt, currentVote, postId}) => {
  const commentRef = useRef<HTMLDivElement>(null);
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

      <p className="text-sm text-zinc-500 truncate">
          {comment.text}
      </p>
      PostComment
    </div>
  );
};

export default PostComment;
