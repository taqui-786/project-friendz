import ProgressBar from "@/components/newuserpage/ProgressBar";
import Progresstitle from "@/components/newuserpage/Progresstitle";
import { getAuthSession } from "@/lib/auth";
import { sessionUserType } from "@/types/types";
import dynamic from "next/dynamic";
const Signup1 = dynamic(() => import("@/components/newuserpage/Signup1"));
const Signup3 = dynamic(() => import("@/components/newuserpage/Signup3"), {
  ssr: false,
});
const Signup2 = dynamic(() => import("@/components/newuserpage/Signup2"), {
  ssr: false,
});
const Signup4 = dynamic(() => import("@/components/newuserpage/Signup4"), {
  ssr: false,
});
const Signup5 = dynamic(() => import("@/components/newuserpage/Signup5"), {
  ssr: false,
});

const page = async () => {
  const session = await getAuthSession();
  

  return (
    <>
      <div className="min-h-screen bg-gray-100 relative h-full w-full overflow-hidden text-gray-700">
        {/* FAKE NAVBAR  */}
        <div className="h-[55px] w-full flex justify-center items-center bg-white z-50"></div>
        {/* PROGRESSBAR  */}
        <ProgressBar />
        <div className="flex items-center h-calc-100-min-113">
          <div className="w-full">
            {/* POST TITLE  */}
            <div className="max-w-3xl mx-auto text-center pt-4">
              <Progresstitle />
            </div>
            {/* SIGNUP STEP 1 _ PUBLIC - PRIVATE - COMPANY  */}
            <div
              id="stepOne"
              className=" block animate-[fadeInLeft] duration-500 max-w-[1040px] mx-auto py-5 px-0 max-[640px]:px-3 "
            >
              <Signup1 />
            </div>
            {/* SIGNUP STEP 2 _ NAME AND EMAIL  */}
            <div
              id="stepTwo"
              className="hidden  max-w-lg animate-[fadeInLeft] duration-500 mx-auto py-5 px-0 max-[640px]:px-3"
            >
              <Signup2 existingUsername={session?.user.username || ''} />
            </div>
            {/* SIGNUP STEP 3 Password - OTP */}
            <div
              id="stepThree"
              className="hidden max-w-lg animate-[fadeInLeft] duration-500 mx-auto py-5 px-0 max-[640px]:px-3"
            >
              <Signup3 />
            </div>
            {/* SIGNUP STEP 4 PHOTO UPLOAD  */}
            <div
              id="stepFour"
              className="hidden max-w-lg animate-[fadeInLeft] duration-500 mx-auto py-5 px-0 max-[640px]:px-3"
            >
              <Signup4 userImage={session?.user.image || ''} />
            </div>
            {/* SIGNUP FINAL STEP CONGRATZ  */}
            <div
              id="stepFive"
              className="hidden max-w-lg animate-[fadeInLeft] duration-500  mx-auto py-5 px-0 max-[640px]:px-3"
            >
              <Signup5 />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
