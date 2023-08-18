'use client'
import React, { useState } from 'react'
import SearchDropdown from './slidebar/SearchDropdown'
import { FiSearch } from 'react-icons/fi'
import axios from 'axios'
function SearchUserInput() {
    const [visible,setVisible] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false)
    const [users,setUsers] = useState([])
    const handleSearchDropdown = async(e:React.ChangeEvent<HTMLInputElement>) =>{
        if(e.target.value === '') return setVisible(false)
        setVisible(true)
        setLoading(true)
        try {
            const {data} = await axios.get(`/api/search?value=${e.target.value}`)
            setUsers(data)
            console.log(data);       
        } catch (error) {
            console.log(error);
            
        }finally{
            setLoading(false)
        }
    }
        
        
  return (
    <div className="flex justify-center focus-within:shadow-lg  mb-0">
    <div className="relative w-full   ">
        <div className="absolute p-2 h-full grid items-center focus-within:text-[#039be5] "><FiSearch className=' ' /></div>

        <input type="search" onChange={handleSearchDropdown} 
        // onBlur={() => setVisible(false)}
        placeholder='Search' className=' pr-1 outline-none border border-colorF7 bg-colorF7 w-full h-[42px] rounded-md pl-7 focus:bg-white focus:border-[#3180e1]  ' />

        {visible && <SearchDropdown users={users} loading={loading} />}
    </div>
</div>
  )
}

export default SearchUserInput