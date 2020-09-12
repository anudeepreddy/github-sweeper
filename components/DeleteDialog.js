import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Stack,
  Box,
  Spinner,
  Flex
} from "@chakra-ui/core";
import { FaCheckCircle } from "react-icons/fa";

function DeleteDialog(props){
  const {isOpen,repos,deleted,onClose} = props;

  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deleting Repos</ModalHeader>
          <ModalBody>
            <Stack>
              {repos.map((repo)=>(
                <Flex direction='row' align='center' key={repo.name}>
                  {
                    deleted.includes(repo.name)?
                    <Box as={FaCheckCircle} size="16px" color="green.400" />:
                    <Spinner
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
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
  )
}

export default DeleteDialog;