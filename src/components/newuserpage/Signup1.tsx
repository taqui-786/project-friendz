
import {SignupAsCompany, SignupAsPrivate, SignupAsPublic} from './cards/Signupcard'

function Signup1() {
  return (
    <div className='columns mt-4 min-[640px]:flex'>
       <SignupAsCompany/>
       <SignupAsPublic/>
       <SignupAsPrivate/>
    </div>
  )
}

export default Signup1