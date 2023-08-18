import { User } from "@prisma/client"
import { FC } from "react"
import {SiAboutdotme} from 'react-icons/si'
import { MdNotificationsActive, MdLocationPin, MdAccountCircle, MdEmail } from "react-icons/md"

type basicinfowidgetprops ={
user:Pick<User, 'email' | 'Bio' | 'location'  >
follower: number
}


const BasicInfoWidget:FC<basicinfowidgetprops> = ({user , follower}) =>{



    return(
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
                          {user.email}
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
                          {user.location}
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
                          {follower} Followers
                        </span>
                      </div>
                      <MdNotificationsActive className="text-xl text-[#cecece] mx-1" />
                    </div>
                    <div className="flex justify-between items-center py-[10px] px-4">
                      <div>
                        <span className="text-sm font-medium text-[#393a4f] block">
                          About Me
                        </span>
                        <span className="text-[0.9rem] text-[#999] font-normal block">
                          {user.Bio}
                        </span>
                      </div>
                      <SiAboutdotme className="text-xl text-[#cecece] mx-1" />
                    </div>
                  </div>
                </div>
              </div>
    )
}

export default BasicInfoWidget