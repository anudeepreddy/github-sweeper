import React from "react";
import { Box, Heading, Flex, Text, Button,Avatar } from "@chakra-ui/core";
import { signIn, signOut, useSession } from 'next-auth/client';
import {GoMarkGithub} from 'react-icons/go';

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Header = props => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  const [ session, loading ] = useSession()

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="blue.400"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          Bulk Delete Repo
        </Heading>
      </Flex>

      <Box display={{ sm: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      {session && <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems>Repos</MenuItems>
        <MenuItems>Examples</MenuItems>
        <MenuItems>Blog</MenuItems>
      </Box>}

      <Flex align="center">
      {session && 
        <>
          <p style={{marginRight:'0.5em'}}>Hello {session.user.name}</p>
          <Avatar size="sm" name={session.user.name} src={session.user.image} style={{marginRight:'1em'}}/>
        </>
      }
      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
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