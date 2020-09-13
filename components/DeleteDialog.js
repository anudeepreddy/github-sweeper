import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Stack,
  Box,
  Spinner,
  Flex,
  Button,
  Divider
} from "@chakra-ui/core";
import { FaCheckCircle,FaExclamationCircle } from "react-icons/fa";
import {
  Alert,
  AlertIcon,
} from "@chakra-ui/core";

function DeleteDialog(props){
  const {isOpen,repos,deleted,failed,onClose,finished} = props;
  const [showFail,setShowFail] = React.useState(false);
  const [showSuccess,setShowSuccess] = React.useState(false);
  React.useEffect(()=>{
    console.log('finished >> '+finished);
    if(finished){
      if(deleted.length!=repos.length){
        setShowFail(true);
      } else{
        setShowSuccess(true);
      }
    }
  },[finished]);
  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deleting Repos</ModalHeader>
          <Divider/>
          <ModalBody>
            <Stack>
              {repos.map((repo)=>(
                <Flex direction='row' align='center' key={repo.name}>
                  {
                    deleted.includes(repo.name)&&<Box as={FaCheckCircle} size="16px" color="green.400" />
                  }
                  {
                    failed.includes(repo.name)&&<Box as={FaExclamationCircle} size="16px" color="red.400" />
                  }
                  {
                    !failed.includes(repo.name)&&!deleted.includes(repo.name)&&<Spinner
                    thickness="2px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="sm"
                  />
                  }
                  <p style={{marginLeft:'1em'}}>{repo.name}</p>
                </Flex>
              ))}
              {finished&&showFail&&<Alert status="error" variant="left-accent">
              <AlertIcon/>
              Some Repos could not be deleted
            </Alert>}
            {finished&&showSuccess&&<Alert status="success" variant="left-accent">
              <AlertIcon/>
              The above repos are successfully deleted
            </Alert>}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button isLoading={!finished} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default DeleteDialog;