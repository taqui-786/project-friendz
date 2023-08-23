"use client";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReactTextareaAutosize from "react-textarea-autosize";
import { zodResolver } from "@hookform/resolvers/zod";
import EditorJS from "@editorjs/editorjs";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { handleImageUpload } from "@/lib/Functions";
import { PostCreationRequest, postValidator } from "./CreatePostValidator";
import { Loader2 } from "lucide-react";
import { exitPopup } from "./button/CreatePostExitPost";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface editorProp {
  userId: any;
}

const Editor: FC<editorProp> = ({ userId }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(postValidator),
    defaultValues: {
      userId,
      title: "",
      content: null,
    },
  });
  const router = useRouter()
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }

  }, []);

  //   EDITOR INITALISATION FUNCTION --- >
  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    // @ts-ignore
    const Header = (await import("@editorjs/header")).default;
    // @ts-ignore
    const Embed = (await import("@editorjs/embed")).default;
    // @ts-ignore
    const Table = (await import("@editorjs/table")).default;
    // @ts-ignore
    const List = (await import("@editorjs/list")).default;
    // @ts-ignore
    const Code = (await import("@editorjs/code")).default;
    // @ts-ignore
    const LinkTool = (await import("@editorjs/link")).default;
    // @ts-ignore
    const InlineCode = (await import("@editorjs/inline-code")).default;
    // @ts-ignore
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
                uploadByFile: handleImageUpload,
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          embed: Embed,
          table: Table,
        },
      });
    }
  }, []);

  // INITIALIZING
  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef?.current?.focus();
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

  //   ERROR HANDLING OF EDITOR
  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        toast.error((value as { message: string }).message);
      }
    }
  }, [errors]);

  const { mutate: createPost, isLoading } = useMutation({
    mutationFn: async ({ title, content, userId }: PostCreationRequest) => {
      const payload: PostCreationRequest = { title, content, userId };
      const { data } = await axios.post("/api/user/post/create", payload);
      return data;
    },
    onError: () => {
      toast.error("Post submit Error");
    },
    onSuccess: () => {
      // A WAY TO HANDLE CREATE POST AND REDIRECT IT
      router.refresh()
      ref.current?.blocks.clear();
      toast.success("Successfull Posted")
      exitPopup();
    },
  });

  //   EDITOR ON SUBMIT
  async function onSubmit(data: PostCreationRequest) {
    const blocks = await ref.current?.save();

    const payload: PostCreationRequest = {
      title: data.title,
      content: blocks,
      userId,
    };

    createPost(payload);
  }

  if (!isMounted) {
    return null;
  }
  //   CUSTOM REF SETTING
  const { ref: titleRef, ...rest } = register("title");

  return (
    <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200 ">
      {/* On SUBMIT LOADING  */}
      {isLoading && (
        <div className="absolute h-full w-full m-auto top-0 bottom-0 left-0 right-0 z-[+9999] flex justify-center items-center bg-zinc-50">
          <Loader2 className="h-14 w-14 text-[#3d70b2] animate-spin" />
        </div>
      )} 
      <form
        id="create_post"
        className="w-fit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="max-w-full">
          {/* TEXTAREA FOR POST TITLE  */}
          <ReactTextareaAutosize
            placeholder="Title"
            disabled={isLoading}
            ref={(e) => {
              titleRef(e);
              // @ts-ignore
              _titleRef.current = e;
            }}
            {...rest}
            className="w-full resize-none overflow-hidden bg-transparent appearance-none text-5xl font-bold focus:outline-none"
          />
          <div id="editor" className="min-h-[50%]" />
        </div>
      </form>
    </div>
  );
};

export default Editor;
