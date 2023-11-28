import {Flex, Stack, Heading, Text, Box, Button, Select, Spacer} from '@chakra-ui/react'
import { useState } from 'react'
export const ApplicationView = ({job_seeker, Icon, status, ind, timestamp, handleUpdate }) => {
    
    const [currStatus, setCurrStatus] = useState(status)
    const handleChange = (e)=>{
        setCurrStatus(e.target.value)
    }

    
  return (
    <Flex justifyContent={'space-between'} px={12} py={10} boxShadow={'lg'} borderRadius={12} key={ind}>
    <Stack>
   <Flex alignItems={'center'} gap={2}>
    <Box p={2} bgColor={"brand.110"} borderRadius={"lg"}>
    {Icon}
    </Box>
    <Heading as={"h3"} fontSize={26}>
    {job_seeker.name}
     </Heading>
   </Flex>
     <Text as={'i'} fontSize={14}>{job_seeker.city}, {job_seeker.state}</Text>
     <Box my={2}>
     <Text >Graduate: {job_seeker.graduate.join(",") || "None"}</Text>
     <Text>Post graduate: {job_seeker.postgraduate.join(",") || "None"}</Text>
     </Box>
     <Text>Skills: {job_seeker.user_skills.join(", ") || "None"}</Text>
     <Text>Experience: {job_seeker.experience || "None"}</Text>
     <Text>Projects: {job_seeker.projects || "None"}</Text>
     <Text>Message: {job_seeker.message || "None"}</Text>
     <Text mt={4}>Contact: {job_seeker.email}</Text>
    </Stack>
    <Stack spacing={4}>
     <Select value={currStatus} onChange={handleChange}>
       <option value="Pending">Pending</option>
       <option value="Application Viewed">Application Viewed</option>
       <option value="Connected with Applicant">Connected with Applicant</option>
       <option value="Accepted">Accepted</option>
       <option value="Rejected">Rejected</option>
     </Select>
    
     <Button isDisabled={currStatus === status} onClick={()=> {
        handleUpdate(ind, currStatus)
     }}>Update</Button>
     <Spacer />
     <Text as={'i'} textAlign={'end'}>Applied on {timestamp.split(" ").map((value, index) => index < 4 ? value : '').join(' ')}</Text>
    </Stack>
   </Flex>
  )
}
