import Signup2 from "@/components/newuserpage/Signup2";
import Signup3 from "@/components/newuserpage/Signup3";
import Signup4 from "@/components/newuserpage/Signup4";
import { getAuthSession } from "@/lib/auth";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Settings',
  description: 'user setting page ',
}
const page = async () => {
  const session = await getAuthSession()
  return (
    <>
      <div
        id="homePage"
        className=" bg-white relative ml-[280px] pt-6 py-[60px] px-[12px] home_width"
      >
        <div className="max-w-[1040px] m-auto relative grow w-auto ">
          <div className="pt-[10px] pb-5 h-[88vh] overflow-y-scroll hidescrollbar ">
            <div>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900 px-[30px]">
                    Settings
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600 px-[30px]">
                    This information will be displayed publicly so be careful
                    what you changes.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <Signup2 existingUsername={session?.user?.username as string} />
                    </div>

                    <div className="col-span-full">
                      <Signup3 />
                    </div>

                    <div className="col-span-full">
                      <Signup4 userImage={session?.user?.image as string} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
