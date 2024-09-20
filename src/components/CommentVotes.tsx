"use client";

import { CommentVote, VoteType } from "@prisma/client";
import { FC, useEffect } from "react";
import { useState } from "react";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { usePrevious } from "@mantine/hooks";
import { Button } from "./ui/Button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import {
  CommentVoteRequest,
  CommentVoteValidator,
} from "@/lib/validators/vote";
import axios, { AxiosError } from "axios";
import { toast } from "./ui/use-toast";



type PartialVote = Pick<CommentVote, 'type'>
interface CommentVoteProps {
  commentId: string;
  initialVotesAmt: number;
  initialcommentVote?: VoteType | null;
  initialVote?: PartialVote
}

const CommentVote: FC<CommentVoteProps> = ({
  commentId,
  initialVotesAmt,
  initialVote,
}) => {
  const { loginToast } = useCustomToast();
  const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const preVote = usePrevious(currentVote);


  const { mutate: vote } = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload: CommentVoteRequest = {
        commentId,
        voteType,
      };
      await axios.patch("/api/subreddit/post/vote", payload);
    },

    onError: (err, voteType) => {
      if (voteType === "UP") setVotesAmt((prev) => prev - 1);
      else setVotesAmt((prev) => prev + 1);

      //reset current vote
      setCurrentVote(preVote);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }return toast({
          title: "something went wrong",
          description: "your vote was not registered",
          variant: "destructive",
        });
      }
      return toast({
        title: "something went wrong",
        description: "your vote was not registered",
        variant: "destructive",
      });
    },
    onMutate: (type) => {
      if (currentVote?.type === type) {
        setCurrentVote(undefined);
        if (type === "UP") setVotesAmt((prev) => prev - 1);
        else if (type === "DOWN") setVotesAmt((prev) => prev + 1);
      }
      // set upvotes back to neutral position
      else {
        setCurrentVote({type});
        if (type === "UP") setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
        else if (type === "DOWN")
          setVotesAmt((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });

  return (
    <div className="flex sm:flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
      <Button
        size="sm"
        variant="ghost"
        aria-label="upvote"
        onClick={() => vote("UP")}
      >
        <ArrowBigUp
          className={cn("h-5 w-5 text-zinc-700", {
            "text-emerald-500 fill-emerald-500": currentVote?.type === "UP",
          })}
        ></ArrowBigUp>
      </Button>
      CommentVote
      <p className="text-center py-2 font-medium text-sm text-zinc-900">
        {votesAmt}
      </p>
      <Button
        size="sm"
        variant="ghost"
        aria-label="upvote"
        onClick={() => vote("DOWN")}
      >
        <ArrowBigDown
          className={cn("h-5 w-5 text-zinc-700", {
            "text-red-700 fill-red-600": currentVote?.type === "DOWN",
          })}
        ></ArrowBigDown>
      </Button>
    </div>
  );
};

export default CommentVote;
