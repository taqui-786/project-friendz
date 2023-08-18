

import { getAuthSession } from "@/lib/auth"
import { NewUserNextStepBtn } from "../button/NewUserButton"
import NewUserImageUpload from "./NewUserImageUpload"

async function Signup4() {
  const session = await getAuthSession()
  return (
    <>
    <div className="w-full  bg-white common_border_e8 rounded-lg p-[30px] font-sans ">
        <NewUserImageUpload Myimage={session?.user.image || ''} />
    </div>
    {/* <NewUserNextStepBtn next={4} prev={2} disable={false}/> */}
    </>
  )
}

export default Signup4