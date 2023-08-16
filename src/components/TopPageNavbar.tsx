import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai"
import { SlideBarOuterButton } from "./button/SlideBarResponsiveExitButton"
import { IoMdNotificationsOutline } from "react-icons/io"
import Image from "next/image"
import { getAuthSession } from "@/lib/auth"
import { FC } from "react"

interface TopPageNavbarprop{
    title: string
}

const TopPageNavbar:FC<TopPageNavbarprop> = async ({title}) =>{

    const session = await getAuthSession()



    return(
        <div className="my-0 mx-auto relative flex items-center w-full max-w-[1040px] z-10">
        {/* ARROW ICON  */}
        <SlideBarOuterButton />
        <h1 className='text-[#393a4f] font-bold text-2xl hidden sm:block  '>{title} Page</h1>

        <div className="flex ml-auto items-center ">
          <div className="px-[6px] flex items-center py-2 grow-0 shrink-0 text-[#4a4a4a] relative ">
            <div className="relative flex justify-center items-center w-[38px] h-[38px] rounded-sm ">
              <AiOutlineHeart className="h-5 w-5 text-[#999] transition-all" />
            </div>
          </div>

          <div className="px-[6px] flex items-center py-2 grow-0 shrink-0 text-[#4a4a4a] relative ">
            <div className="relative flex justify-center items-center w-[38px] h-[38px] rounded-sm ">

              <IoMdNotificationsOutline className="h-5 w-5 text-[#999] transition-all" />
            </div>
          </div>
          <div className="px-[6px] flex items-center py-2 grow-0 shrink-0 text-[#4a4a4a] relative ">
            <div className="relative flex justify-center items-center w-[38px] h-[38px] rounded-sm ">

              <AiOutlineShoppingCart className="h-5 w-5 text-[#999] transition-all" />
            </div>
          </div>
          {/* profile opition --> */}
          <div className="flex justify-start items-center cursor-pointer grow-0 shrink-0 text-[#4a4a4a] px-3 py-2 relative">
            <div className="relative max-h-[38px]">

              {session?.user?.image && <Image src={session.user.image} alt='user' height={38} width={38} className='rounded-full max-h-[38px]' />}
            </div>
          </div>
        </div>

      </div>
    )
}

export default TopPageNavbar