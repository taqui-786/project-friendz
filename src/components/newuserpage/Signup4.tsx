

import { getAuthSession } from "@/lib/auth"
import NewUserImageUpload from "./NewUserImageUpload"

async function Signup4() {
  const session = await getAuthSession()
  return (
    <>
    <div className="w-full  bg-white common_border_e8 rounded-lg p-[30px] font-sans ">
        <NewUserImageUpload Myimage={session?.user.image || ''} />
    </div>
    </>
  )
}

export default Signup4