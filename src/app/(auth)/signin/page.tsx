
import LoginButton from '@/components/button/LoginButton'
import { getAuthSession } from '@/lib/auth'

async function page() {
    const session = await getAuthSession()
  return (
        <>
    <div className='bg-[#f4f4f4] h-full w-full min-h-screen text-[#344258] overflow-hidden text-base font-normal  '>
    <div className='columns is_gapless flex bg-[#f4f4f4] h-full w-full min-h-screen text-[#344258] overflow-hidden text-base font-normal '>
        {/* LEFT SIDE  */}
        <div className='min-h-full w-2/4 flex justify-center items-center relative bg-[linear-gradient(180deg,#9cc2f0,#5596e6)] bg-[length:400%_400%] signin_animate 
        max-[900px]:hidden'>
            <div className='max-w-[400px]'>
                <h2 className='font-bold text-5xl text-white  signin_text_shadow'>Join an Exciting Social Experience.</h2>
            </div>
        </div>
        {/* RIGHT SIDE  */}
        <div className='min-h-full w-2/4 relative bg-white max-[900px]:w-full max-[900px]:flex max-[900px]:justify-center max-[900px]:items-center'>
                <div className='h-full w-full flex justify-center items-center font-serif '>
                    <div className='max-w-xl min-w-fit mx-auto'>
                        { !session ? <LoginButton/> : <h2 className='font-medium border p-4 rounded-md font-mono' >User alredy logged in</h2> }
                    </div>
                </div>
        </div>
    </div>
</div>
    </>
  )
}

export default page