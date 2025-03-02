import { AiFillGithub  } from "react-icons/ai"
import { SlideBarOuterButton } from "./button/SlideBarResponsiveExitButton"
import { TiSocialLinkedin, TiSocialTwitter } from "react-icons/ti"
import Image from "next/image"
import { getAuthSession } from "@/lib/auth"
import { FC } from "react"
import Link from "next/link"

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
            <Link href={'https://www.linkedin.com/in/taqui-imam-88a7b325a/'} className="relative flex justify-center items-center w-[38px] h-[38px] rounded-sm decoration-transparent ">
              <TiSocialTwitter className="h-5 w-5 text-[#999] hover:text-[#3180e1] transition-all" />
            </Link>
          </div>

          <div className="px-[6px] flex items-center py-2 grow-0 shrink-0 text-[#4a4a4a] relative ">

            <Link href={"https://www.linkedin.com/in/taqui-imam-88a7b325a/"} className="relative flex justify-center items-center w-[38px] h-[38px] rounded-sm  decoration-transparent">
              <TiSocialLinkedin className="h-5 w-5 text-[#999] hover:text-[#3180e1] transition-all" />
            </Link>
          </div>
          <div className="px-[6px] flex items-center py-2 grow-0 shrink-0 text-[#4a4a4a] relative ">
            <Link href={"https://github.com/taqui-786"} className="relative flex justify-center items-center w-[38px] h-[38px] rounded-sm decoration-transparent ">

              <AiFillGithub className="h-5 w-5 text-[#999] hover:text-[#3180e1] transition-all" />
            </Link>
          </div>
          {/* profile opition --> */}
          <div className="flex justify-start items-center cursor-pointer grow-0 shrink-0 text-[#4a4a4a] px-3 py-2 relative">
            <div className="relative max-h-[38px]">

              {session?.user?.image && <Image src={session.user.image} alt='user' height={38} width={38} className='rounded-full max-h-auto w-auto' />}
            </div>
          </div>
        </div>

      </div>
    )
}

export default TopPageNavbar