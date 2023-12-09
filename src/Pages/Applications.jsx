import React, { useEffect, useState } from 'react'
import {Box,useToast, Stack,Flex, Input, Heading, Text } from '@chakra-ui/react'
import {useDispatch, useSelector} from 'react-redux'
import { getJobApplications } from '../Redux/JobseekerReducer/action'
import {ContentNotFound} from "../Components/ContentNotFound"
import {  RESET_AUTH } from '../Redux/actionType'
export const Applications = () => {
    const dispatch = useDispatch()
    const {token} = useSelector((store)=>store.Auth)
    const [searchApp, setSearchApp] = useState("")
    const {loading, error, applied} = useSelector(store=> store.Jobseeker)
    const [currentJob, setCurrentJob] = useState(false)
    const toast = useToast()
    const [applications, setApplications] = useState([])
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

    useEffect(()=>{
      if(applied.length > 0){
        setApplications(applied)
        setCurrentJob(applied[0])
      }
    }, [applied])
    const handleChoice =(current)=>{
      setCurrentJob(current)
    }

    useEffect(()=>{
      const getData = setTimeout(()=>{
        if(applied.length > 0 ){
          if(searchApp !== ""){
            let filtered = applications.filter((item) => {
              if(item.job_posting.job_title.toLowerCase().includes(searchApp.toLowerCase())){
                return true;
              }else{
                return false;
              }
             })
             setApplications(filtered)
          }else{
            setApplications(applied)
          }
        }
      }, 1000)

      return () => clearTimeout(getData)
    }, [searchApp])
  return (
    <Box my={8} minH={"80vh"}>
      <Box my={6}>
            <Heading as={"h3"} fontSize={28}>
              All applications
            </Heading>
            <Text as={"i"}>Get job!</Text>
      </Box>
      <Flex>
        <Stack  maxH={"60vh"} maxW={"25vw"} minW={"25vw"}>
          <Input width='80%' placeholder='Search Application' type='search' borderColor={'brand.130'} onChange={(e)=> setSearchApp(e.target.value)} />
        <Stack gap={4} overflowY={'scroll'} borderRadius={"10px 0 0 10px "}>
        {applications.length > 0 && applications.map(({job_posting, id, status})=>(
           <Box  borderRadius={"lg"}  cursor={'pointer'} onClick={()=> handleChoice({job_posting, id, status})} bgColor={currentJob.id === id ? 'brand.300' : "brand.100"}  key={id} p={4} >
              <Text fontWeight="bold" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap"  fontSize={18}>{job_posting.job_title}</Text>
              <Text as={'b'} color={"brand.130"}>{job_posting.recruiter.company_name}</Text>
           </Box>
        ))}
    
        </Stack>
        </Stack>
        <Box>
      {currentJob && <Stack minW={"60vw"} maxW={"60vw"}  px={12} py={10} gap={4}  boxShadow={'lg'} borderRadius={12} _hover={{boxShadow:'xl'}}>
       <Flex justifyContent={'space-between'}> <Box>
        <Heading as={'h3'} fontSize={26}>{currentJob.job_posting.job_title}</Heading>
        <Text as={'i'}>{currentJob.job_posting.location}</Text>
        </Box>
        <Text as={'b'} fontSize={'lg'}>Status: {currentJob.status}</Text></Flex>
        <Text as={'i'}>{currentJob.job_posting.employment_type} | Openings:{currentJob.job_posting.openings}</Text>
        {currentJob.job_posting.graduation && <Text>Graduation: {currentJob.job_posting.graduation}</Text>}
        {currentJob.job_posting.postgraduation && <Text>postgraduation: {currentJob.job_posting.postgraduation}</Text>}
       
        <Text>Required Skills: {currentJob.job_posting.required_skills}</Text>
        <Text>Prefered Skills: {currentJob.job_posting.prefered_skills}</Text>
        <Text>Experience: {currentJob.job_posting.experience}</Text>
        <Text>Category: {currentJob.job_posting.role_category}</Text>
        <Text>Description: {currentJob.job_posting.description}</Text>
        
        </Stack>}
        </Box>
        </Flex>
        {!loading && applications.length === 0 && <Box textAlign={'center'} fontSize={'4xl'} fontWeight={"bold"} ><Text>Application not found!</Text></Box>}
    </Box>
  )
}

