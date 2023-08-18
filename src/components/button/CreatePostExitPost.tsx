"use client"
import { RxCross1 } from 'react-icons/rx'
export const exitPopup = () =>{
    const createPost = document.getElementById('createPost')
    createPost? createPost.style.display = "none" : ""
    
}
function CreatePostExitPost() {

    return (
        <div
           onClick={()=>exitPopup()} className='absolute px-3 right-0'><RxCross1 className="text-[#4a4a4a] h-5 w-5  " /></div>
    )
}

export default CreatePostExitPost