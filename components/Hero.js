import React from 'react';
import styled from 'styled-components';
import {Box,Heading,Text,Button} from '@chakra-ui/core';
import {FaLongArrowAltRight} from 'react-icons/fa';
import { signIn } from 'next-auth/client';

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 90vh;
  align-items: center;
  justify-content: space-around;
  background-image: linear-gradient(to top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

function Hero(){
  return (
    <Flex>
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
      
    </Flex>    
  )
}

export default Hero;