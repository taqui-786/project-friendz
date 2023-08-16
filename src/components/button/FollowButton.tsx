"use client";
import { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import axios, { AxiosError } from "axios";
import { FollowUserRequest } from "@/types/PostLikeValidator";
import { useMutation } from "@tanstack/react-query";
import { ExtendedPost } from "@/types/db";
import { User } from "@prisma/client";

interface FollowButtonprops {
  myId?: string;
  toFollow?: any;
  isFollowed?: any;
}

const FollowButton: FC<FollowButtonprops> = ({
  myId,
  toFollow,
  isFollowed,
}) => {
  const [followed, setFollowed] = useState(isFollowed);
  const [isFollow, setIsFollow] = useState<boolean>(false);

  useEffect(() => {
    if (isFollowed) {
      setIsFollow(true);
    } else {
      setIsFollow(false);
    }
  }, [isFollowed]);

  const { mutate: follow, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: FollowUserRequest = {
        toFollowId: toFollow,
      };
      await axios.post("/api/user/follow", payload);
    },
    onError: (err) => {
      setIsFollow(false);
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return console.log("login first");
        }
      }

      return window.alert(" like error ");
    },
    onMutate: () => {
      if (isFollow) {
        setIsFollow(false);
      } else {
        setIsFollow(true);
      }
    },
  });

  return (
    <Button
      onClick={() => follow()}
      className={`ml-auto py-[14px] px-[18px] `}
      variant="outline"
      isLoading={isLoading}
    >
      {!isLoading && <AiOutlinePlus className="h-3 w-3 mr-2" />}
      {/* {followed} */}
      {isFollow ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
