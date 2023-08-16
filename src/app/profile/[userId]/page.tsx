import TopPageNavbar from "@/components/TopPageNavbar";
import Image from "next/image";
import banner from "../../../../public/cover_bg.png";
import { db } from "@/lib/Prisma.db";
import { AiOutlinePlus } from "react-icons/ai";
import {
  MdAccountCircle,
  MdEmail,
  MdLocationPin,
  MdNotificationsActive,
} from "react-icons/md";
import { getAuthSession } from "@/lib/auth";
import FollowButton from "@/components/button/FollowButton";
import ProfilePostsColumn from "@/components/feed/ProfilePostsColumn";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,

  DialogTrigger,
} from "@/components/ui/dialog";
import EditProfile from "@/components/EditProfile";


interface profilepageprops {
  params: {
    userId: string;
  };
}
const Profile = async ({ params }: profilepageprops) => {
  const session = await getAuthSession();
  let user;
  user = await db.user.findUnique({
    where: {
      id: params.userId,
    },
    include: {
      followers: true,
      following: true,
      Post: {
        include: {
          like: true,
          author: true,
        },
        // take: 2
      },
    },
  });
  let isUserFollowed;
  if (user) {
    isUserFollowed = user?.followers.find(
      (val) => val.followerId === session?.user.id
    );
  }

  return (
    <Dialog>
      <div
        id="homePage"
        className="relative ml-[280px] pt-6 py-[60px] px-[12px] home_width "
      >
        <div className="max-w-[1040px] m-auto relative grow w-auto">
          {/* TOP NAV TOOLBAR  */}
          <TopPageNavbar title="Profile" />
          <div className="pt-[10px] pb-5 h-[88vh] overflow-y-scroll hidescrollbar">
            <div className="flex flex-wrap">
              <div className="block basis-0 grow shrink">
                {/* COVER IMAGE  */}
                <div className="relative">
                  <Image
                    src={banner}
                    alt="banner"
                    height={328}
                    width={656}
                    loading="eager"
                    priority
                    className="block rounded-sm object-top object-cover w-full h-auto max-h-[328px]"
                  />
                  <div className="absolute shadow-lg -bottom-[50px] left-0 right-0 m-auto flex justify-center items-center h-28 w-28 rounded-full z-10">
                    {user?.image && (
                      <Image
                        src={user.image}
                        alt="avatar"
                        height={112}
                        width={112}
                        loading="eager"
                        priority
                        className="relative object-cover rounded-full z-10 "
                      />
                    )}
                    {session?.user.id === user?.id && (
                      <div className="absolute bottom-0 right-0 h-9 w-9 rounded-full flex justify-center items-center bg-[#3d70b2] shadow-md cursor-pointer z-20">
                        <DialogTrigger asChild>
                        {/* <Button variant="outline">Edit Profile</Button> */}
                          <AiOutlinePlus className="h-5 w-5 text-white" />
                        </DialogTrigger>
                      </div>
                    )}
                  </div>
                </div>
                {/* PROFILE FOLLOW BUTTON  */}
                <div className="flex justify-between items-center pt-2">
                  <div className=""></div>
                  <div className="flex justify-between items-start py-[10px] w-[99%]">
                    <div className="w-1/4 flex justify-between">
                      <div className="h-fit w-fit flex flex-col items-center">
                        <span className="text-[1.6rem] font-mono font-bold text-[#393a4f] block">
                          {user?.followers.length}
                        </span>
                        <span className="text-xs font-medium text-[#999] block  ">
                          FOLLOWERS
                        </span>
                      </div>
                      <div className="h-fit w-fit flex flex-col items-center">
                        <span className="text-[1.6rem] font-mono font-bold text-[#393a4f] block">
                          {user?.following.length}
                        </span>
                        <span className="text-xs font-medium text-[#999] block  ">
                          FOLLOWINGS
                        </span>
                      </div>
                      <div className="h-fit w-fit flex flex-col items-center">
                        <span className="text-[1.6rem] font-mono font-bold text-[#393a4f] block">
                          {user?.Post.length}
                        </span>
                        <span className="text-xs font-medium text-[#999] block  ">
                          POSTS
                        </span>
                      </div>
                    </div>
                    {/* USER NAME  */}
                    <div className="text-center w-2/4 mt-10">
                      <h2 className="text-[#393a4f] font-semibold ">
                        {user?.name}
                      </h2>
                      <span className="block text-sm text-[#999]">
                        {user?.email}
                      </span>
                    </div>
                    <div className="text-right w-1/4 ">
                      {(session?.user.id !== user?.id) && 
                        <FollowButton
                          myId={params.userId}
                          toFollow={user?.id}
                          isFollowed={isUserFollowed}
                        />
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* POST SIDE  */}
            <div className=" -mx-3 -mt-3 last:mb-3 md:flex">
              <div className="block p-3 w-full  md:w-[33.33333337%] basis-0 grow shrink md:flex-none ">
                {/* WIDGET HEADING  */}
                <div className="w-full p-2 rounded-sm border border-[#e8e8e8] bg-white flex justify-center items-center">
                  <h4 className="font-medium px-[6px]">Basic Infos</h4>
                </div>
                {/* WIDGET BODY */}
                <div className="pt-[10px]">
                  <div className="relative mb-6 border border-[#e8e8e8] last:border last:border-[#e8e8e8] bg-white rounded-lg text-[#4a4a4a] max-w-full">
                    {/* WIDGET ITEMS  */}
                    <div className="flex justify-between items-center py-[10px] px-4">
                      <div>
                        <span className="text-sm font-medium text-[#393a4f] block">
                          Account Type
                        </span>
                        <span className="text-[0.9rem] text-[#999] font-normal block">
                          Public
                        </span>
                      </div>
                      <MdAccountCircle className="text-xl text-[#cecece] mx-1" />
                    </div>
                    <div className="flex justify-between items-center py-[10px] px-4">
                      <div>
                        <span className="text-sm font-medium text-[#393a4f] block">
                          Email
                        </span>
                        <span className="text-[0.9rem] text-[#999] font-normal block">
                          {user?.email}
                        </span>
                      </div>
                      <MdEmail className="text-xl text-[#cecece] mx-1" />
                    </div>
                    <div className="flex justify-between items-center py-[10px] px-4">
                      <div>
                        <span className="text-sm font-medium text-[#393a4f] block">
                          Lives In
                        </span>
                        <span className="text-[0.9rem] text-[#999] font-normal block">
                          Jharkhand , Ramgarh
                        </span>
                      </div>
                      <MdLocationPin className="text-xl text-[#cecece] mx-1" />
                    </div>
                    <div className="flex justify-between items-center py-[10px] px-4">
                      <div>
                        <span className="text-sm font-medium text-[#393a4f] block">
                          Followers
                        </span>
                        <span className="text-[0.9rem] text-[#999] font-normal block">
                          300 Followers
                        </span>
                      </div>
                      <MdNotificationsActive className="text-xl text-[#cecece] mx-1" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="block p-3 w-full md:w-[66.66666674%] basis-0 grow shrink md:flex-none ">
                {/* WIDGET HEADING  */}
                <div className="w-full p-2 rounded-sm border border-[#e8e8e8] bg-white flex justify-center items-center">
                  <h4 className="font-medium px-[6px]">Posts</h4>
                </div>
                <div className="py-[10px]">
                  {/* POSTS  */}
                  <Suspense
                    fallback={
                      <Loader2 className="h-5 w-5 animate-spin text-blue-700" />
                    }
                  >
                    <ProfilePostsColumn profilePosts={user?.Post} />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <EditProfile/>
    </Dialog>
  );
};

export default Profile;
