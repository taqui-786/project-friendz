import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'


interface searcheduserprops{
name:string,
image:string
}

const SearchedUsers:FC<searcheduserprops> = ({name,image}) => {
  return (
    <Link href='/' className='decoration-transparent hover:bg-slate-400'>
    <div className="bg-white">
      <div className="p-2 table-cell">
        <Image src={image} alt='user' height={50} width={50} loading='eager' priority className='relative m-0 p-1 rounded-full min-h-[50px] border border-[#cecece]' />
      </div>
      <div className="table-cell align-middle text-sm font-medium w-[170px] text-[#515365] py-0 px-[7px]">
      {name}
      <div><small className='text-[#999] font-normal'>Jenna Davis</small></div>
      </div>
    </div>
  </Link>
  )
}

export default SearchedUsers