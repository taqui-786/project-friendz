"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AiOutlineHome } from "react-icons/ai"
import { CgProfile } from "react-icons/cg"
import { FiUser, FiUsers } from "react-icons/fi"

const SlidebarLink = ({session}:any) =>{

    const router = usePathname()



    return(
        <>
         <li className=' hover:bg-[#f2f2f2]'>
                        <Link href="/" className={` flex text-[#393a4f] items-center py-3 px-8 border-l-[5px] border-l-transparent  ${router === '/' ? 'slide_link_active' :'' } `}  >
                            <AiOutlineHome className="h-5 w-5 mr-4 text-[#a2a5b9]" />
                            <span className=' text-base'>Home</span>
                        </Link>
                    </li>
                    
                  <li className=' hover:bg-[#f2f2f2]'>
                        <Link href={`/profile/${session?.user.id}`} className={`flex text-[#393a4f] items-center py-3 px-8 border-l-[5px] border-l-transparent active:slide_link_active ${router === `/profile/${session?.user.id}` ? 'slide_link_active' :'' }`} >
                            <CgProfile className="h-5 w-5 mr-4 text-[#a2a5b9]" />
                            <span className=' text-base'>Profile</span>
                        </Link>
                    </li>
        </>

    )
}

export default SlidebarLink