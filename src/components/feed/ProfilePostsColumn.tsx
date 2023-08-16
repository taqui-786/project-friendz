import { FC } from "react"
import MyPost from "./MyPost"
import { getAuthSession } from "@/lib/auth"


interface ProfilePostsColumnprops{
profilePosts: any 
}
const ProfilePostsColumn:FC<ProfilePostsColumnprops> = async({profilePosts}) =>{
const session = await getAuthSession()


    return(
        <>
        {
            profilePosts.map((posts:any,index:number)=>{

                const isLiked = posts?.like?.find(
                    (vote:any) => vote.userId === session?.user.id
                  )
                    
                return(
                    
                    <MyPost
                    post={posts}
                    key={index}
                    isPostLiked={isLiked}

                  />
                  
                    
                )
            })
        }
        
            
          
        </>
    )
}


export default ProfilePostsColumn