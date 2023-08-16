"use client"
import { ImCross } from 'react-icons/im'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

function ExitProfileBtn() {
    const router = useRouter()
    
  return (
    <Button onClick={() => router.back()} variant="ghost" className='outline-none hover:bg-blue-700' ><ImCross className="text-white text-lg" />  </Button>
    )
}

export default ExitProfileBtn