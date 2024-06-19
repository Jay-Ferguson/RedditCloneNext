"use client";

import { FC, useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { PostCreationRequest, PostValidator } from "@/lib/validators/post";
import { uploadFiles } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useRef } from "react";
import type EditorJS from "@editorjs/editorjs";
import { toast } from "./ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import MiniCreatePost from "./MiniCreatePost";
import { FileEsque } from "uploadthing/types";

interface EditorProps {
  subredditId: string;
}

const Editor: FC<EditorProps> = ({ subredditId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      subredditId,
      title: "",
      content: null,
    },
  });

  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const _titleRef = useRef<HTMLAreaElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);
  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByfile(file: File) {
                  // @ts-ignore
                  const [res] = await uploadFiles([file], "imageUploader")

                  return {
                    sucess: 1,
                    file: {
                      url: res.url,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value;
        toast({
          title: "Somwething went wrong",
          description: (value as { message: string }).message,
          variant: "destructive",
        })
      }
    }
  }, [errors]);


  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        // set focus to title

        _titleRef.current?.focus();
      }, 0);
    };
    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);


  const { mutate: createPost } = useMutation({
    mutationFn: async ({
      title,
      content,
      subredditId,
    }: PostCreationRequest) => {
      const payload: PostCreationRequest = {
        subredditId,
        title,
        content,
      };

      const { data } = await axios.post("/api/subreddit/post/create", payload);
      return data;
    },
    onError: () => {
      return toast({
        title: "something went wrong",
        variant: "destructive",
        description: "your post was not published, please try again later",
      });
    },

    onSuccess: () => {
      // r/my community/submit into r/mycommunity
      const newPathname = pathname.split("/").slice(0, -1).join("/");
      router.push(newPathname); 

      router.refresh();

      return toast({
        description: "your post been published",
      });
    },
  });
  async function onSubmit(data: PostCreationRequest) {
    const blocks = await ref.current?.save();

    const payload: PostCreationRequest = {
      title: data.title,
      content: blocks,
      subredditId,
    };

    createPost(payload);
  }

  if (!isMounted) {
    return null;
  }

  const { ref: titleRef, ...rest } = register("title");

  return (
    <div className="w-full p-4 bg-zinc-50 rouded-lg border-zinc-200">
      Editor
      <form
        id="subreddit-post-form"
        className="w-fit text-gray-400"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            //@ts-ignore
            ref={(e) => {
              titleRef(e);
              //@ts-ignore
              _titleRef.current = e;
            }}
            {...rest}
            placeholder="Title"
            className="w-full reasize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          ></TextareaAutosize>

          <div id="editor" className="min-h-[500]px" />
        </div>
      </form>
    </div>
  );
};

export default Editor;
