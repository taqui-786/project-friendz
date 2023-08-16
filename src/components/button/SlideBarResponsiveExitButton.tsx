"use client"
import { useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { IoIosArrowBack } from 'react-icons/io'
import { RiMenu2Fill } from 'react-icons/ri'

export const SlideBarInnerButton = () => {
  const handleResponsiveButton =() =>{
    const slidebar = document.getElementById('slidebar')
    slidebar ? slidebar.style.transform = 'translate(-100%)' : ""
  }

  return (
    <button onClick={handleResponsiveButton}> <AiOutlineArrowLeft className="absolute top-[10px] right-3 block items-center justify-center h-8 w-8 outline-none border-none md:hidden " /></button>

  )
}
export const SlideBarOuterButton = () => {
  const [open,setOpen] = useState<boolean>(false)
  const hideSlidebar = () =>{
    const slidebar = document.getElementById('slidebar')
    const homePage = document.getElementById('homePage')
    if(!open){
      slidebar?.classList.add('slidebar_hide')
      homePage?.classList.replace('home_width','homepage_full')
      setOpen(true)
    }else{
      slidebar?.classList.remove('slidebar_hide')
      homePage?.classList.replace('homepage_full','home_width')
      setOpen(false)
    }
  }
  const handleResponsiveButton =() =>{
    const slidebar = document.getElementById('slidebar')
    slidebar ? slidebar.style.transform = 'translate(0)' : ""
  }

  return (
    <div className="mr-4 cursor-pointer block" onClick={hideSlidebar} >
      {!open && <span className="h-fit w-fit hidden md:block" onClick={hideSlidebar} ><IoIosArrowBack className="h-7 w-7 text-[#3180e1] " /></span>}
      {open && <span className="h-fit w-fit hidden md:block" onClick={hideSlidebar} ><RiMenu2Fill className="h-7 w-7 text-[#3180e1] " /> </span>}
      <span  className="h-fit w-fit block md:hidden" onClick={handleResponsiveButton} ><RiMenu2Fill className="h-7 w-7 text-[#3180e1] " /> </span>
      
    </div>
  )
}


