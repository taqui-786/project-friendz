import { getAuthSession } from '@/lib/auth'
import React from 'react'
import CreatePostActivator from './CreatePostActivator'
import FeedColumn from './FeedColumn'
import { db } from '@/lib/Prisma.db'
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import { notFound } from 'next/navigation'
import SuggestUsers from './SuggestUsers'

async function FeedPostsBox() {
    const session = await getAuthSession()
    const myPost = await db.post.findMany({
      include:{
          like: true,
          author: true,
          comments: true,
      },
      orderBy: {
          createdAt: 'desc'
      },
      take: INFINITE_SCROLL_PAGINATION_RESULTS,
  })

if (!myPost) return notFound()
  return (
    <div className='py-5 px-0'>
        <div className="-mx-3 -mt-3 last:-mb-3 md:flex ">
            {/* MIDDLE COLUMN  --> */}
            <div className="block basis-0 grow shrink p-3 max-h-[calc(100dvh-100px)] w-full md:flex-none md:w-[66.66666674%]  overflow-y-auto hidescrollbar  ">
                { session?.user?.image && <CreatePostActivator image={session?.user?.image} />}
                {/* @ts-ignore */}
                {myPost && <FeedColumn initialPosts={myPost} />}
            </div>
            {/* RIGHT COLUMN  --> */}
            <div className="hidden basis-0 grow shrink p-3 md:block md:flex-none md:w-[33.33333337%] ">
              <SuggestUsers/>
            </div>
        </div>
    </div>
  )
}

export default FeedPostsBox