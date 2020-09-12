import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/core";
import { List, ListItem, Button } from "@chakra-ui/core";

function Alert(props){
  const {isOpen,onClose,repoList,onConfirm} = props;
  const cancelRef = React.useRef();

  return (
    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Repositories
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.<br/>
            The following {repoList.length} repositories are going to be deleted:
            <List styleType="disc" style={{maxHeight:'10em',overflow:'auto',paddingLeft:'1em',marginTop:'1em'}}>
              {repoList.map((repo)=><ListItem key={repo.name}>{repo.name}</ListItem>)}
            </List>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button variantColor="red" onClick={onConfirm} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  )
}

export default Alert;