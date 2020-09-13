import React from "react";
import { Box, Heading, Flex, Text, Button,Avatar } from "@chakra-ui/core";
import { signIn, signOut, useSession } from 'next-auth/client';
import {GoMarkGithub} from 'react-icons/go';

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