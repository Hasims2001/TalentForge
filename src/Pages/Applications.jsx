import React, { useEffect } from 'react'
import {Box,useToast, Stack, Heading, Text } from '@chakra-ui/react'
import {useDispatch, useSelector} from 'react-redux'
import { getJobApplications } from '../Redux/JobseekerReducer/action'
import {ContentNotFound} from "../Components/ContentNotFound"
import {  RESET_AUTH } from '../Redux/actionType'
export const Applications = () => {
    const dispatch = useDispatch()
    const {token} = useSelector((store)=>store.Auth)
    const {loading, error, applied} = useSelector(store=> store.Jobseeker)
    const toast = useToast()
    useEffect(() => {
        if (error) {
          toast({
            position: "bottom-right",
            title: error,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
        return () => {
          dispatch({ type: RESET_AUTH });
        };
      }, [error]);
    
     
    useEffect(()=>{
        if(applied.length === 0){
            dispatch(getJobApplications(token))
        }
    }, [])
    console.log(applied)
  return (
    <Box my={8}>
      <Box my={6}>
            <Heading as={"h3"} fontSize={28}>
              All applications
            </Heading>
            <Text as={"i"}>Get job!</Text>
      </Box>
        {applied.length > 0 && applied.map(({job_posting, id, status})=>(
            <Stack key={id} px={12} py={10} gap={4} boxShadow={'lg'} borderRadius={12} _hover={{boxShadow:'xl'}}>
               <Box>
               <Heading as={'h3'} fontSize={26}>{job_posting.job_title}</Heading>
               <Text as={'i'}>{job_posting.location}</Text>
               </Box>
              {job_posting.graduation && <Text>Graduation: {job_posting.graduation}</Text>}
             {job_posting.postgraduation && <Text>postgraduation: {job_posting.postgraduation}</Text>}
               <Text as={'i'}>{job_posting.employment_type} | Openings:{job_posting.openings}</Text>
               <Text>Required Skills: {job_posting.required_skills}</Text>
               <Text>Prefered Skills: {job_posting.prefered_skills}</Text>
               <Text>Experience: {job_posting.experience}</Text>
               <Text>Category: {job_posting.role_category}</Text>
               <Text as={'b'} fontSize={'lg'}>Status: {status}</Text>
            </Stack>
        ))}
        {!loading && applied.length === 0 && <ContentNotFound msg='No applications found!'/>}
    </Box>
  )
}
