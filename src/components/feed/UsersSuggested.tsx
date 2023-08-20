import { User } from "@prisma/client"
import Image from "next/image"
import { FC } from "react"
import FollowButton from "../button/FollowButton"
import Link from "next/link"

type usersuggestedprops ={
    user: Pick<User, 'image'| 'name' | 'username' | 'id'>
    followers:any
    sessionid:string
}

const UsersSuggested:FC<usersuggestedprops> = ({user,followers,sessionid}) =>{

    let isUserFollowed = followers.find(
        (val:any) => val.followerId === sessionid
      );

    return(
        <div className="flex justify-start items-center p-4 hover:bg-[#f2f2f2]">
            <Link href={`/profile/${user.id}`} className="decoration-transparent h-fit w-fit flex" >
        <Image src={user.image || ''} alt="user" height={40} width={40} loading="eager" priority className="max-h-[40px] rounded-full h-10 w-10 " />
        <div className="px-[10px]">
            <span className="text-sm text-[#393a4f] font-medium block ">{user.username}</span>
            <span className="text-xs text[#757a91] block">{user.name}</span>
        </div>
            </Link>
        <div className="flex justify-end items-center w-9 h-9 ml-auto rounded-md transition-all">
            <FollowButton isFollowed={isUserFollowed} myId={sessionid} toFollow={user.id} />
        </div>
    </div>
    )
}


export default UsersSuggested