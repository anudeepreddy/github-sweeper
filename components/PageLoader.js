import React from 'react';
import { Grid,Spinner,Flex } from "@chakra-ui/core";

function PageLoader(){
  return (
    <Grid style={{placeItems:'center',minHeight:'70vh'}}>
      <Flex direction='column' align='center'>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        Fetching Repos 👷
      </Flex>
    </Grid>
  )
}

export default PageLoader;