
import {SignupcardOne, SignupcardThree, SignupcardTwo} from './cards/Signupcard'

function Signup1() {
  return (
    <div className='columns mt-4 min-[640px]:flex'>
       <SignupcardOne/>
       <SignupcardTwo/>
       <SignupcardThree/>
    </div>
  )
}

export default Signup1