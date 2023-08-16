import { FiLogOut, FiSearch, FiUser, FiUsers } from 'react-icons/fi'
import React from 'react'
import {  AiOutlineHome, AiOutlineSetting } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { getAuthSession } from '@/lib/auth'
import Image from 'next/image'
import Link from 'next/link'
import  { SlideBarInnerButton } from '../button/SlideBarResponsiveExitButton'
import SearchUserInput from '../SearchUserInput'
import { signOut } from 'next-auth/react'
import LogOutButton from '../button/LogOutButton'
async function Slidebar() {
    const session = await getAuthSession()
    return (
       <div id='slidebar' className='absolute top-0 left-0 h-full w-[280px] bg-white border-r  border-r-borderE3 shadow-md z-30 transition-transform myslidebar'>
            {/* top section -->  */}
            <div className='h-[40%] w-full flex  pt-8 px-8 pb-4 flex-col justify-between'>
                <SlideBarInnerButton />
              <SearchUserInput/>
                {/* USER BLOCK  */}
                {session?.user &&
                    <div>
                        <Image src={session.user?.image || ''} alt="user" height={70} width={70} loading='eager' priority className='block max-w-full mb-4 rounded-full' />
                        <div className="">
                            <span className='block font-bold text-xl text-[#393a4f] font-sans '>{session.user.name}</span>
                            <span className=' block text-sm text-[#a2a5b9] font-serif '>Public</span>
                        </div>
                    </div>
                }

            </div>
            {/* Bottom section -->  */}
            <div className='h-[60%] w-full relative pt-8 pb-12'>
                <ul className='mb-12 list-none'>
                    <li className=' hover:bg-[#f2f2f2]'>
                        <Link href="/" className='slide_link_active flex text-[#393a4f] items-center py-3 px-8 border-l-[5px] border-l-transparent' >
                            <AiOutlineHome className="h-5 w-5 mr-4 text-[#a2a5b9]" />
                            <span className=' text-base'>Home</span>
                        </Link>
                    </li>
                    <li className=' hover:bg-[#f2f2f2]'>
                        <Link href="/" className='flex text-[#393a4f] items-center py-3 px-8 border-l-[5px] border-l-transparent' >
                            <FiUser className="h-5 w-5 mr-4 text-[#a2a5b9]" />
                            <span className=' text-base'>Friends</span>
                        </Link>
                    </li>
                    <li className=' hover:bg-[#f2f2f2]'>
                        <Link href="/" className='flex text-[#393a4f] items-center py-3 px-8 border-l-[5px] border-l-transparent' >
                            <FiUsers className="h-5 w-5 mr-4 text-[#a2a5b9]" />
                            <span className=' text-base'>Groups</span>
                        </Link>
                    </li>
                    <li className=' hover:bg-[#f2f2f2]'>
                        <Link href={`/profile/${session?.user.id}`} className='flex text-[#393a4f] items-center py-3 px-8 border-l-[5px] border-l-transparent' >
                            <CgProfile className="h-5 w-5 mr-4 text-[#a2a5b9]" />
                            <span className=' text-base'>Profile</span>
                        </Link>
                    </li>
                </ul>
                {/* SETTING AND LOGOUT  */}
                <ul className='list-none'>
                    <li className=' hover:bg-[#f2f2f2]'>
                        <Link href="/" className='flex text-[#393a4f] items-center py-3 px-8 border-l-[5px] border-l-transparent' >
                            <AiOutlineSetting className="h-5 w-5 mr-4 text-[#a2a5b9]" />
                            <span className=' text-base'>Settings</span>
                        </Link>
                    </li>
                    <li className=' hover:bg-[#f2f2f2]'>
                        <LogOutButton/>
                    </li>
                </ul>
            </div>

        </div>
        
    )
}

export default Slidebar

