'use client'
import { FC, useState } from "react"
import { Button } from "../ui/button"
import {FcGoogle} from 'react-icons/fc'
import { signIn } from 'next-auth/react'
import toast from "react-hot-toast"

const LoginButton: FC = () => {

    const [loading,setLoading] = useState<boolean>(false)
  const loginwithGoogle = async () => {
    setLoading(true)
    try {

      await signIn('google')
    } catch (error) {
      console.log(error);

    }finally{
      // LOADING OR ANY OTHER STUF 
      setLoading(false)
       toast.success(" Login successfull. ");
    }
  }


    return (
        <>
            <Button variant="outline" size="lg" isLoading={loading}   onClick={loginwithGoogle}  >
             {!loading && <FcGoogle className="mr-4 h-6 w-6" />}  
             <span className="text-base font-semibold" >Login with Email</span>
            </Button>
             

        </>
    )

}


export default LoginButton