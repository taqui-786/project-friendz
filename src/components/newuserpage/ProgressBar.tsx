import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { BiLockAlt, BiFlag } from "react-icons/bi";
import { MdOutlineInsertPhoto } from "react-icons/md";


function ProgressBar() {
  return (
    <div className="pt-[30px]  max-[640px]:mx-auto max-[639px]:max-w-xs">
      <div className="h-[18px] bg-white rounded-full max-w-[520px] mx-auto flex items-center">
        <div className='relative mx-3 w-calc-100-min-24 h-[6px] rounded-full '>
          {/*track*/}    <div className='track bg-[#eaeaea] w-full absolute top-0 left-0 h-full rounded-[100px]'></div>
          <div id="bar" style={{ width: `0%` }} className='bar bg-[#5596e6] transition-[width] duration-400 absolute top-0 left-0 h-full rounded-[100px]'> </div>
          {/* DOT  */}
          <div id="first" className=' activeDot left-[-19px]  absolute top-1/2 transform -translate-y-1/2 h-10 w-10 bg-white rounded-full border border-gray-300 shadow flex justify-center items-center pointer-events-none text-gray-400'>
            <BsEmojiSmile className='h-4 w-4 transition duration-300 stroke-current' />
          </div>
          <div id="second" className=' secondDot absolute top-1/2 transform -translate-y-1/2 h-10 w-10 bg-white rounded-full border border-gray-300 shadow flex justify-center items-center pointer-events-none text-gray-400'>
            <AiOutlineUser className='h-4 w-4 transition duration-300 stroke-current' />
          </div>
          <div id="third" className=' thirdDot absolute top-1/2 transform -translate-y-1/2 h-10 w-10 bg-white rounded-full border border-gray-300 shadow flex justify-center items-center pointer-events-none text-gray-400'>
            <BiLockAlt className='h-4 w-4 transition duration-300 stroke-current' />
          </div>
          <div id="fourth" className=' fourthDot absolute top-1/2 transform -translate-y-1/2 h-10 w-10 bg-white rounded-full border border-gray-300 shadow flex justify-center items-center pointer-events-none text-gray-400'>
            <MdOutlineInsertPhoto className='h-4 w-4 transition duration-300 stroke-current' />
          </div>
          <div id="fifth" className=' fifthDot absolute top-1/2 transform -translate-y-1/2 h-10 w-10 bg-white rounded-full border border-gray-300 shadow flex justify-center items-center pointer-events-none text-gray-400'>
            <BiFlag className='h-4 w-4 transition duration-300 stroke-current' />
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProgressBar