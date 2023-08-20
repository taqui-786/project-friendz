'use client'
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"
import { FC, useEffect, useRef } from "react"
import MyPost from "./MyPost"
import { useIntersection } from '@mantine/hooks'
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config"
import { ExtendedPost } from "@/types/db"
import { Loader2 } from "lucide-react"

interface postfeedprops {
  initialPosts: ExtendedPost[]
}


const FeedColumn: FC<postfeedprops> = ({ initialPosts }) => {

  const lastPostRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 0.5,
  })
  const { data: session } = useSession()

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['infinite-query'],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/user/post?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}`

      const { data } = await axios.get(query)
      return data as ExtendedPost[]
    },

    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  )

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage() // Load more posts when the last post comes into view
    }
  }, [entry, fetchNextPage])

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts

// console.log(isFetchingNextPage);

  return (

    <>
      <ul className='flex flex-col col-span-2 space-y-6'>

        {
          posts.map((post, index) => {

            // CHECKING USER HAD LIKED THIS POST OR NOT 
            const isLiked = post?.like?.find(
              (vote) => vote.userId === session?.user.id
            )
            // LIKES AMOUNT 
            const LikeAmount = post?.like.length
            // COMMENTS COUNT 
            const commentLength = post?.comments.length                

            if (index === posts.length - 1) {
              // Add a ref to the last post in the list
              return (
                <li key={post.id}
                 ref={ref}
                >
                  <MyPost
                    post={post}
                    key={index}
                    isPostLiked={isLiked}
                    commentLength={commentLength}
                    LikeAmt={LikeAmount}
                  />
                </li>
              )
            } else {
              return <MyPost
                post={post}
                key={index}
                isPostLiked={isLiked}
                commentLength={commentLength}
                LikeAmt={LikeAmount}
              />
            }
          })
        }
        {isFetchingNextPage && (
          <li className='flex justify-center  mb-3 p-4'>
            <Loader2 className='w-6 h-6 text-2xl text-[#3180e1] animate-spin' />
          </li>
        )}
      </ul>
    </>





  )
}





export default FeedColumn