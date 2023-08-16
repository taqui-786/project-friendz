import React from 'react'
import FeedPostsBox from './FeedPostsBox'
import TopPageNavbar from '../TopPageNavbar'

async function FeedPage() {
  return (
    <>
    <div id='homePage' className='relative ml-[280px] pt-6 py-[60px] px-[12px] home_width ' >
      <div className="max-w-[1040px] m-auto relative grow w-auto">
        {/* TOP NAV TOOLBAR  */}
        <TopPageNavbar title='Home' />
        {/* POST FEED  */}
        <FeedPostsBox/>
      </div>
        {/* ACTIVITY FEED ->  */}
    </div>
    
    </>
    
  )
}

export default FeedPage