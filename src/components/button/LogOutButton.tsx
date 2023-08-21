"use client"
import { signOut } from "next-auth/react"
import { FiLogOut } from "react-icons/fi"


const LogOutButton = () =>{

    return(
        <div 
                        onClick={()=> signOut({callbackUrl:`${window.location.origin}/signin`})}
                         className='flex text-[#393a4f] items-center py-3 px-8 border-l-[5px] border-l-transparent cursor-pointer ' >
                            <FiLogOut className="h-5 w-5 mr-4 text-[#a2a5b9]" />
                            <span className=' text-base'>Logout</span>
                        </div>
    )
}

export default LogOutButton