import React , {useState,useEffect} from 'react'
import { logo } from '../assets'
import SignOut from '../components/SignOut';
import { auth  } from '../firebase/firebase';



const Footer=()=> {


  const [authUser,setAuthUser ]= useState(null);
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((user)=>{
      setAuthUser(user);
    });
    return unsubscribe;
  },[]);
  return (
    <div>

      
<div className=' w-full h-14  px-3 py-4 place-items-center flex  bg-gray-200 '>

<img src={logo} alt="" className=' logo  ' />
{authUser && <SignOut/>}
{/* <img src={logo} alt="" /> */}
</div>
    </div>
  )
}

export default Footer;