


import { NewUserNextStepBtn } from "../button/NewUserButton"
import NewUserImageUpload from "./NewUserImageUpload"

async function Signup4({userImage}:{userImage:string}) {
 
  return (
    <>
    <div className="w-full  bg-white common_border_e8 rounded-lg p-[30px] font-sans ">
        <NewUserImageUpload Myimage={userImage} />
    </div>
    <NewUserNextStepBtn next={4} prev={2} disable={false}/>
    </>
  )
}

export default Signup4