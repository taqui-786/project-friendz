import Image from 'next/image'
import Link from 'next/link'
import congratz from '../../../public/congratz.svg'
function Signup5() {
    return (
        <div className='w-full  bg-white common_border_e8 rounded-lg p-[30px] font-sans '>
            <Image src={congratz} alt='emage' className='block max-w-[120px] mx-auto h-auto' loading='eager' priority />
            <div className='text-center my-3 mx-auto max-w-[370px] '>
                <h3 className='text-[100%] font-semibold text-[#393a4f]'>Congratz, you successfully created your account.</h3>
                <p className='text-sm text-[#999]'>Thankyou for registering, Your data will be secure in our data base</p>
                <Link href={"/"}
                    className='bg-white text-base no-underline py-4 px-5 rounded-lg transition-all duration-300 cursor-pointer justify-center my-5 mx-auto max-w-[280px] border-[1.4px] border-solid border-[#039be5] text-[#039be5] text-center whitespace-nowrap flex w-full hover:bg-[#039be5] hover:text-white'> Let me in</Link>
            </div>
        </div>
    )
}

export default Signup5