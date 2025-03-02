"use client";
import { HandleNext } from "@/lib/Functions";
import { Button } from "../ui/button";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import {  usePathname } from "next/navigation";

export const AccountTypeSubmitBtn = (props: { value: number }) => {
  return (
    <Button
      onClick={() => HandleNext(props.value)}
      variant={"custom"}
      size={"lg"}
      className={`mt-2 px-16 max-[640px]:absolute max-[640px]:top-0 max-[640px]:left-0 max-[640px]:m-0 max-[640px]:h-full max-[640px]:w-full max-[640px]:opacity-0 `}
    >
      Continue
    </Button>
  );
};

export const NewUserNextStepBtn = (props: {next: number , prev:number , disable:boolean}) =>{

  const params = usePathname()


    return(
        <div className={`p-5   items-center flex-wrap justify-end gap-1 ${params === '/newuser' ? 'flex' : 'hidden'}`}>
            <Button onClick={() => HandleNext(props.prev)} size={'sm'} variant={'outline'} >
            <BsArrowLeft className='mx-2' />
            Back
            </Button>
            <Button disabled={props.disable} onClick={() => HandleNext(props.next)} size={'sm'} variant={'outline'} className="bg-green-100 text-primary hover:bg-green-200" >
                Next
                <BsArrowRight className="mx-2" />
            </Button>
        </div>
    )
}