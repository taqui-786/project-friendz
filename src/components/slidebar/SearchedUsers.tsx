import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'


interface searcheduserprops{
name:string,
image:string,
username:string
id: string
}

const SearchedUsers:FC<searcheduserprops> = ({name,image,id,username}) => {
  return (
    <Link href={`/profile/${id}`} className='decoration-transparent hover:bg-slate-400'>
    <div className="bg-white">
      <div className="p-2 table-cell">
        <Image src={image} alt='user' height={50} width={50} loading='eager' priority className='relative m-0 p-1 rounded-full w-[50px] h-[50px] max-h-[50px] border border-[#cecece]' />
      </div>
      <div className="table-cell align-middle text-sm font-medium w-[170px] text-[#515365] py-0 px-[7px]">
      {username}
      <div><small className='text-[#999] font-normal'>{name}</small></div>
      </div>
    </div>
  </Link>
  )
}

export default SearchedUsers