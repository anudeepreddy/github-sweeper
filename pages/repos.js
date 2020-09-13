import React,{useEffect,useState} from 'react';
import {useSession} from 'next-auth/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Heading, Box, Badge, Flex, Button } from "@chakra-ui/core";
import {GoPlus,GoCheck} from 'react-icons/go';
import PageLoader from '../components/PageLoader';
import Alert from '../components/Alert';
import DeleteDialog from '../components/DeleteDialog'; 
import styled from 'styled-components';

const RepoBody = styled.div`
  display: grid;
  place-items: center;
  @media (min-width: 768px) {
    padding: 1em 2em;
  }
`

const Repos = props => {
  
  const [session,loading] = useSession();
  const router = useRouter();
  const [repos,setRepos] = useState([]);
  const [deleteBatch,setDeleteBatch] = useState([]);
  const [isAlertOpen,setIsAlertOpen] = useState(false);
  const [isDeleteDialogOpen,setIsDeleteDialogOpen] = useState(false);
  const [deletedList,setDeletedList] = useState([]);
  const [warn,setWarn] = useState(false);
  const [warnMessage,setWarnMessage] = useState('');

  function addToDeleteBatch(repoUrl){
    for(let repo of repos){
      if(repo.url==repoUrl&&!deleteBatch.includes(repo)){
        setDeleteBatch([...deleteBatch,repo]);
      }
    }
  }

  function removeFromDeleteBatch(repoUrl){
    setDeleteBatch(deleteBatch.filter((d)=>{
      return d.url!=repoUrl;
    }));
  }

  function onAlertClosed(){
    setIsAlertOpen(false);
  }

  function onAlertConfirmed(){
    setIsAlertOpen(false);
    setIsDeleteDialogOpen(true);
    initiateDelete(0);
  }

  function onDeleteDialogClosed(){
    if(deletedList.length!=deleteBatch.length){
      console.log('Operation not permitted');
    } else {
      setIsDeleteDialogOpen(false);
    }
  }

  function initiateDelete(idx){
      setTimeout(()=>{
        setDeletedList([...deletedList,deleteBatch[idx].name]);
      },5000);
  }

  useEffect(()=>{
    if(deletedList.length!=deleteBatch.length){
      console.log((deletedList.length)+" >> "+deleteBatch[deletedList.length].name);
      initiateDelete(deletedList.length);
    }
  },[deletedList]);

  useEffect(()=>{
    if(!session){
      router.push('/');
    }
  },[session]);
  
  useEffect(()=>{
    if(session)
      fetch('/api/fetch_repos').then(data=>data.json()).then(setRepos);
  },[]);

  return (
  <>
    {
      session &&
      <>
      <Alert isOpen={isAlertOpen} onClose={onAlertClosed} onConfirm={onAlertConfirmed} repoList={deleteBatch}/>
      <DeleteDialog isOpen={isDeleteDialogOpen} onClose={onDeleteDialogClosed} repos={deleteBatch} deleted={deletedList}/>
      <div>
        <Flex justify='space-between' align='center' style={{padding:'1em'}}>
          <Heading as="h3" size="xl">
              {session.user.name}'s Repos
          </Heading>
          {deleteBatch.length>0 && <Button variantColor="red" style={{marginRight:'3em'}} onClick={()=>setIsAlertOpen(true)}>Delete {deleteBatch.length} {deleteBatch.length>1?'repos':'repo'}</Button>}
        </Flex>
        {repos.length!=0?
        <RepoBody>
          <Flex direction='row' wrap='wrap' gridGap="1em" style={{justifyContent:'space-around'}}>
            {
              repos.map((repo)=>
                (
                    <Box key={repo.name} minW="xs" maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" style={{padding:'0.5em',marginTop:'1em',position:'relative'}}>
                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated
                      >
                        <Link href={repo.url}>{repo.name}</Link>
                      </Box>
                      <Badge rounded="full" px="2" variantColor={`${repo.private?'purple':'green'}`}>
                        {repo.private?'Private':'Public'}
                      </Badge>
                      <div style={{display:'flex',flexDirection:'row-reverse'}}>
                        { !(deleteBatch.includes(repo)) ?
                          <Button leftIcon={GoPlus} onClick={()=>addToDeleteBatch(repo.url)} style={{alignSelf:'end'}}>Add</Button>
                          :
                          <Button leftIcon={GoCheck} onClick={()=>removeFromDeleteBatch(repo.url)}>Added</Button>
                        }
                      </div>
                    </Box>       
                )
              )}
          </Flex>
        </RepoBody>:
        <PageLoader/>
        }
      </div>
      </>
    }
    </>
  );
}


export default Repos;