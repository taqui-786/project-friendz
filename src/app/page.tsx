import CreatePostOuterBox from "@/components/CreatePostOuterBox"
import FeedPage from "@/components/feed/FeedPage"


export default  async function Home() {
// const session = await getAuthSession()  
// if(session?.user.onboardingCompleted === fa ){ 
//   return redirect('/newuser')
// } 
  

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
