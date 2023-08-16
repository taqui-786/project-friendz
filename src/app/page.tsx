import CreatePostOuterBox from "@/components/CreatePostOuterBox"
import FeedPage from "@/components/feed/FeedPage"

export default  function Home() {
  

  return (
    <>
    <main >
      <FeedPage/>
      {/* CREATE POST POPUP -> */}
      <CreatePostOuterBox/>
    </main>
    </>
  )
}
