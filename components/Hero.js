import React from 'react';
import {Box,Heading,Text,Button} from '@chakra-ui/core';
import {FaLongArrowAltRight} from 'react-icons/fa';
import { signIn } from 'next-auth/client';


function Hero(){
  return (
    <div className='hero'>
      <Box maxW="32rem">
        <Heading mb={4}>Do you have a lot of Github repos to Delete?</Heading>
        <Text fontSize="xl">
          Get Started to clean up your mess
        </Text>
        <Button onClick={()=>signIn('github')}size="lg" bg="transparent" border="1px" mt="24px" rightIcon={FaLongArrowAltRight}>
          Create a free account
        </Button>
      </Box>
      <img src="/hero.svg" width="400"/>
    </div>    
  )
}

export default Hero;