"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useTextareaResize } from "./hooks";
import { ArrowUpIcon, Send } from "lucide-react";
import type React from "react";
import { createContext, useContext, useState } from "react";
import { RiLoader2Line } from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";
import { CommentRequest } from "@/lib/commentValidator";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ChatInputContextValue {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onSubmit?: () => void;
  loading?: boolean;
  onStop?: () => void;
  variant?: "default" | "unstyled";
  rows?: number;
}

const ChatInputContext = createContext<ChatInputContextValue>({});

interface ChatInputProps extends Omit<ChatInputContextValue, "variant"> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "unstyled";
  rows?: number;
}

function ChatInput({
  children,
  className,
  variant = "default",
  value,
  onChange,
  onSubmit,
  loading,
  onStop,
  rows = 1,
}: ChatInputProps) {
  const contextValue: ChatInputContextValue = {
    value,
    onChange,
    onSubmit,
    loading,
    onStop,
    variant,
    rows,
  };

  return (
    <ChatInputContext.Provider value={contextValue}>
      <div
        className={cn(
          variant === "default" &&
            "flex flex-col items-end w-full p-2 rounded-2xl border border-input bg-transparent focus-within:ring-1 focus-within:ring-ring focus-within:outline-none",
          variant === "unstyled" && "flex items-start gap-2 w-full",
          className
        )}
      >
        {children}
      </div>
    </ChatInputContext.Provider>
  );
}

ChatInput.displayName = "ChatInput";

interface ChatInputTextAreaProps extends React.ComponentProps<typeof Textarea> {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onSubmit?: () => void;
  variant?: "default" | "unstyled";
}

function ChatInputTextArea({
  onSubmit: onSubmitProp,
  value: valueProp,
  onChange: onChangeProp,
  className,
  variant: variantProp,
  ...props
}: ChatInputTextAreaProps) {
  const context = useContext(ChatInputContext);
  const value = valueProp ?? context.value ?? "";
  const onChange = onChangeProp ?? context.onChange;
  const onSubmit = onSubmitProp ?? context.onSubmit;
  const rows = context.rows ?? 1;

  // Convert parent variant to textarea variant unless explicitly overridden
  const variant =
    variantProp ?? (context.variant === "default" ? "unstyled" : "default");

  const textareaRef = useTextareaResize(value, rows);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!onSubmit) {
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      if (typeof value !== "string" || value.trim().length === 0) {
        return;
      }
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <Textarea
      ref={textareaRef}
      {...props}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      className={cn(
        "max-h-[400px] min-h-0 resize-none overflow-x-hidden",
        variant === "unstyled" &&
          "border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none",
        className
      )}
      rows={rows}
    />
  );
}

ChatInputTextArea.displayName = "ChatInputTextArea";

interface ChatInputSubmitProps extends React.ComponentProps<typeof Button> {
  onSubmit?: () => void;
  loading?: boolean;
  onStop?: () => void;
}

function ChatInputSubmit({
  onSubmit: onSubmitProp,
  loading: loadingProp,
  onStop: onStopProp,
  className,
  ...props
}: ChatInputSubmitProps) {
  const context = useContext(ChatInputContext);
  const loading = loadingProp ?? context.loading;
  const onStop = onStopProp ?? context.onStop;
  const onSubmit = onSubmitProp ?? context.onSubmit;

  if (loading ) {
    return (
      <Button
        onClick={onStop}
        className={cn(
          "shrink-0 rounded-full p-1.5 h-fit border dark:border-zinc-600",
          className
        )}
        {...props}
      >
        <RiLoader2Line className="h-5 w-5 animate-spin text-zinc-500" />
      </Button>
    );
  }

  const isDisabled =
    typeof context.value !== "string" || context.value.trim().length === 0;

  return (
    <Button
      className={cn(
        "shrink-0 rounded-full p-1.5 h-fit border dark:border-zinc-600",
        // loading && "hidden",
        className
      )}
      disabled={isDisabled}
      onClick={(event) => {
        event.preventDefault();
        if (!isDisabled) {
          onSubmit?.();
        }
      }}
      {...props}
    >
      <Send className="h-5 w-5" />
    </Button>
  );
}

ChatInputSubmit.displayName = "ChatInputSubmit";

const CommentInputBox = ({ postId, replyToId }: { postId: string, replyToId?: string }) => {
    const router = useRouter()
    const [input, setInput] = useState<string>('')
    const { mutate: comment, isLoading } = useMutation({
        mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
          const payload: CommentRequest = { postId, text, replyToId }
    
          const { data } = await axios.patch(
            `/api/user/post/comment`,
            payload
          )
          return data
        },
        mutationKey: ['comment'],
        onError: (err) => {
          if (err instanceof AxiosError) {
            if (err.response?.status === 401) {
            //   return loginToast()
            }
          }
           return toast.error('Something went wrong')
     
        },
        onSuccess: () => {
          router.refresh()
          setInput('')
        },
      })
  return (
    <ChatInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onSubmit={() => comment({ postId, text: input, replyToId })}
        loading={isLoading}
        className="bg-white"
    >
      <ChatInputTextArea placeholder="Type a message..." />
      <ChatInputSubmit  />
    </ChatInput>
  );
};
export { ChatInput, ChatInputTextArea, ChatInputSubmit, CommentInputBox };
