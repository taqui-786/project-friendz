import React from "react";
import Image from "next/image"
import publicImg from "../../../../public/publicaccount.svg";
import companyImg from "../../../../public/companyaccount.svg";
import privateImg from "../../../../public/privateaccount.svg";
import { AccountTypeSubmitBtn } from "@/components/button/NewUserButton";
export const SignupAsCompany = () => {
  return (
    <div className=' block shrink grow basis-0 p-3 mt-4 '>
      <div className="w-full bg-white border border-gray-300 rounded-lg p-6 text-center relative ">
        <div className="relative max-[640px]:hidden">
          <Image priority loading='eager' src={companyImg} className='max-h-[11rem]' alt='signup' sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>
        <h3 className="font-semibold text-base py-2 font-montserrat">Company</h3>
        <p className="text-gray-500 text-sm">
          Create a company account to be able to do some awesome things.
        </p>
        <AccountTypeSubmitBtn value={1} />
      </div>
    </div>
  )
}
export const SignupAsPublic = () => {
  return (
    <div className=' block shrink grow basis-0 p-3 mt-4 '>
      <div className="w-full bg-white border border-gray-300 rounded-lg p-6 text-center relative">
        <div className="relative  max-[640px]:hidden">
          <Image priority loading='eager' src={publicImg} alt='signup' className='max-h-[11rem]' sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>
        <h3 className="font-semibold text-base py-2 font-montserrat">Public</h3>
        <p className="text-gray-500 text-sm">
          Create a company account to be able to do some awesome things.
        </p>
        <AccountTypeSubmitBtn value={1}/>

      </div>
    </div>
  )
}
export const SignupAsPrivate = () => {
  return (
    <div className=' block shrink grow basis-0 p-3 mt-4 '>
      <div className="w-full bg-white border border-gray-300 rounded-lg p-6 text-center relative">
        <div className="relative max-[640px]:hidden">
          <Image priority  loading='eager' src={privateImg} alt='signup' className='max-h-[11rem]'  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  />
        </div>
        <h3 className="font-semibold text-base py-2 font-montserrat">Private</h3>
        <p className="text-gray-500 text-sm">
          Create a company account to be able to do some awesome things.
        </p>
        <AccountTypeSubmitBtn value={1}/>

      </div>
    </div>
  )
}

