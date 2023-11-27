import {Box, Heading, Text, Stack} from "@chakra-ui/react"
import { useParams} from "react-router-dom"
import {useEffect, useState} from 'react'
import {useSelector} from "react-redux"
export const JobPostsApplications = () => {
    const params = useParams()
    const {jobposted } = useSelector(store=> store.Recruiter)
    const [currentJob, setCurrentJob] = useState(null)

    useEffect(()=>{
      let filtered = jobposted.filter((item)=> item.id === +params.id)
      setCurrentJob(filtered[0])
    }, [])
    console.log(currentJob)
  return (
    <Box my={12}>
        <Box>
        <Heading as={'h3'} fontSize={28}>All applications of {currentJob.job_title}</Heading>
        <Text as={"i"}>Get talent employee!</Text>
        </Box>
        <Stack my={6}>
      <Box>
        <Heading as={'h4'} fontSize={20}>{currentJob.applications}</Heading>
      </Box>
        </Stack>
    </Box>
  )
}
