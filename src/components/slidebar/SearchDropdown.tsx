
import React, { FC } from 'react'
import SearchedUsers from './SearchedUsers'
import { Loader2 } from 'lucide-react'


interface searchdropdownprops {
  users: any
  loading: boolean
}
const SearchDropdown: FC<searchdropdownprops> = ({ users, loading }) => {
  return (
    <div className='flex absolute w-[300px] my-5 mx-0 z-50 '>
      <div className="relative bg-white border border-[#dcdcdc] rounded-sm shadow-md popupbox">
        <div className="m-1">
          {
            users.length > 0 ? (
              users.map((val: any) => <SearchedUsers key={val.id} id={val.id} name={val.name} image={val.image} username={val.username} />)
            ) : (
              !loading ? <div className='py-12 px-[3.65rem] w-full flex'> No User Found</div> : <div className="py-8 px-[3.65rem] w-full flex">
                <Loader2 className='text-[#3180e1] animate-spin mr-1' /> searching...
              </div>
            )
          }

        </div>
      </div>
    </div>
  )
}

export default SearchDropdown