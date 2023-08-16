import { Post, User, Like, Comment  } from "@prisma/client";




export type ExtendedPost = Post & {
author:User,
like: Like[],
comments: Comment[],
    

}