import React,{useEffect} from "react";
import {useSession} from "next-auth/client";
import { useRouter } from 'next/router'

const Header = props => {
  
  const [ session, loading ] = useSession()
  const router = useRouter();

  useEffect(()=>{
    if(session){
      router.push('/repos');
    }
  },[session]);

  return (
    <>
      <p>Login</p>
    </>
  );
};

export default Header;