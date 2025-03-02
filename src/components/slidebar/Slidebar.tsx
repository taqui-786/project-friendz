import { FiUser, FiUsers } from 'react-icons/fi'
import React from 'react'
import {   AiOutlineSetting } from 'react-icons/ai'
import { getAuthSession } from '@/lib/auth'
import Image from 'next/image'
import Link from 'next/link'
import  { SlideBarInnerButton } from '../button/SlideBarResponsiveExitButton'
import SearchUserInput from '../SearchUserInput'
import LogOutButton from '../button/LogOutButton'
import SlidebarLink from './SlidebarLink'
import SettingBtn from '../button/SettingBtn'
async function Slidebar() {
    const session = await getAuthSession()
    
    return (
       <div id='slidebar' className='absolute top-0 left-0 h-full w-[280px] bg-white border-r border-r-borderE3 shadow-md z-30 transition-transform myslidebar'>
            {/* Top section */}
            <div className='flex flex-col gap-6 p-8'>
                <SlideBarInnerButton />
                <SearchUserInput/>
                {/* USER BLOCK  */}
                {session?.user &&
                    <div>
                        <Image src={session.user?.image || ''} alt="user" height={70} width={70} loading='eager' priority className='block h-[70px] w-[70px] max-w-full mb-4 rounded-full' />
                        <div className="">
                            <span className='block font-bold text-xl text-[#393a4f] font-sans '>{session.user.name}</span>
                            <span className='block text-sm text-[#a2a5b9] font-serif '>Public</span>
                        </div>
                    </div>
                }
            </div>
            {/* Bottom section */}
            <div className='flex flex-col justify-between h-[calc(100%-280px)] py-8'>
                <ul className='list-none'>
                   <SlidebarLink session={session} />
             
                    <li className='hover:bg-[#f2f2f2]'>
                        <SettingBtn/>
                    </li>
                    <li className='hover:bg-[#f2f2f2]'>
                        <LogOutButton/>
                    </li>
                </ul>
            </div>
        </div>
        
    )
}

export default Slidebar

