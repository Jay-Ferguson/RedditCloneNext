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
import { Label } from "./ui/Label";
import { Textarea } from "./ui/Textarea";
import { useMutation } from "@tanstack/react-query";
import { CommentRequest } from "@/lib/validators/comment";
import axios from "axios";

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
  const {data:session} = useSession()
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const {mutate: postComment, isLoading} = useMutation({
    mutationFn: async({postId, text, replyToId}: CommentRequest) => {
      const payload: CommentRequest = {
        postId,
        text,
        replyToId,
      }
      const {data} = await axios.patch(`/api/subreddit/post/${postId}/comment`, payload)
      return data
    }
  })




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

        <Textarea
          id="comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="Write a comment..."
        ></Textarea>

          <div className="mt-2 flex justify-end">
            <Button isLoading={isLoading}
            disabled={input.length === 0 || !session}
            onClick={() => {
              if(!input) return 
              postComment({
                postId, 
                text:input,
                replyToId:comment.replyToId ?? comment.id
              })
            }}>
              Post
            </Button>
          </div>


      </div>

      <p className="text-sm text-zinc-500 mt-2 truncate">{comment.text}</p>
      <CommentVotes
        commentId={comment.id}
        initialVotesAmt={votesAmt}
        initialVote={currentVote}
      />

      <Button
        onClick={() => {
          if (!session) {
            router.push("/sign-in");
            setIsReplying(true);
          }
        }}
        variant="ghost"
        size="xs"
        aria-label="reply"
      >
        <MessageSquare className="h-4 w-4 mr-1.5" />
        Reply
      </Button>

      {isReplying ? (
        <div className="grid w-full gap-1.5">
          <Label htmlFor="comment">
            Your comment
            <div className="mt-2">
              <Textarea
                onFocus={(e) =>
                  e.currentTarget.setSelectionRange(
                    e.currentTarget.value.length,
                    e.currentTarget.value.length
                  )
                }
                autoFocus
                id="comment"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={1}
                placeholder="What are your thoughts?"
              />
            </div>
          </Label>
        </div>
      ) : null}
    </div>
  );
};

export default PostComment;
