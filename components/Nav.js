import React from "react";
import { Box, Heading, Flex, Text, Button,Avatar } from "@chakra-ui/core";
import { signIn, signOut, useSession } from 'next-auth/client';
import {GoMarkGithub} from 'react-icons/go';
import {useRouter} from 'next/router';

const Header = props => {
  const router = useRouter();
  const [ session, loading ] = useSession()

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg={router.pathname==='/'?"#5ffbf1":"blue.400"}
      color={router.pathname==='/'?"gray.600":"white"}
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
         Github Sweeper
        </Heading>
      </Flex>

      <Flex align="center">
        {session && 
          <>
            <p style={{marginRight:'0.5em'}}>Hello {session.user.name}</p>
            <Avatar size="sm" name={session.user.name} src={session.user.image} style={{marginRight:'1em'}}/>
          </>
        }
        <Box
          mt={{ base: 4, md: 0 }}
        >
          {!session && <Button leftIcon={GoMarkGithub} bg="transparent" border="1px" onClick={()=>signIn('github')}>
            Sign In
          </Button>}
          {session && <Button bg="transparent" border="1px" onClick={signOut}>
            Sign Out
          </Button>}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Header;