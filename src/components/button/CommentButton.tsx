import { BiSolidComment } from "react-icons/bi";
import { FC } from "react";
import Link from "next/link";
interface commentButtonProps{
    postId:string
}
const CommentButton:FC<commentButtonProps> = ({postId}) => {
  return (
    <>
      <Link
        href={`/post/${postId}`}
        className=" -top-[58px] right-0 absolute h-[50px] w-[50px] text-white border border-[#6aa2e6] bg-[#6aa2e6] flex justify-center items-center rounded-full shadow-lg outline-none transition-colors "
      >
        <BiSolidComment className="h-5 w-5 " />
      </Link>
    </>
  );
};

export default CommentButton;
