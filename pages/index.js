import React,{useEffect} from "react";
import {useSession} from "next-auth/client";
import { useRouter } from 'next/router';
import Hero from '../components/Hero';

const Header = props => {
  
  const [ session, loading ] = useSession()
  const router = useRouter();

  useEffect(()=>{
    if(session){
      router.push('/repos');
    }
  },[session]);

  return (
    <Hero/>
  );
};

export default Header;