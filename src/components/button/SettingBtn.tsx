"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineSetting } from "react-icons/ai";

const SettingBtn = () => {
    const router = usePathname()
  return (
    <Link
      href="/settings"
      
      className={`flex text-[#393a4f] items-center py-3 px-8 border-l-[5px] border-l-transparent ${router === '/settings' ? 'slide_link_active' :'' } `}
    >
      <AiOutlineSetting className="h-5 w-5 mr-4 text-[#a2a5b9]" />
      <span className=" text-base">Settings</span>
    </Link>
  );
};

export default SettingBtn;
