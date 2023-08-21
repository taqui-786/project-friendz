import { getAuthSession } from "@/lib/auth";
import UsersSuggested from "./UsersSuggested";
import { db } from "@/lib/Prisma.db";

const SuggestUsers = async () => {
  const session = await getAuthSession();
  const randomIndex = Math.floor(Math.random() * 5);
  const users = await db.user.findMany({
    // skip: randomIndex,
    where:{
      id:{
        not:session?.user.id
      },
      NOT:{
         followers:{
          some:{
            followerId:session?.user.id
          }
        }
      }
    },
    include: {
      followers: true,
    },
   

  });
  const randomUsers = users.sort(() => 0.5 - Math.random()).slice(0, 5);
  
  return (
    <>
      <div className="relative mb-6 border border-[#e8e8e8] bg-white rounded-lg text-[#4a4a4a] max-w-full">
        <div className="border-b border-b-[#e8e8e8] flex justify-start items-center p-4">
          <h4 className="text-sm text-[#757a91] font-normal">
            Suggested Friends
          </h4>
        </div>
        <div className="">
          {/* USERS  */}
          {randomUsers.map((val) => {
            const isFollowed = val.followers.find((is) => is.followerId === session?.user.id)

             if(!isFollowed){
              return (
                <UsersSuggested
                key={val.id}
                user={{
                  id: val.id,
                  name: val.name,
                  username: val.username,
                  image: val.image,
                }}
                followers={val.followers}
                sessionid={session?.user?.id || "12"}
                />
                );
             }
              
              })}
        </div>
      </div>
    </>
  );
};

export default SuggestUsers;
