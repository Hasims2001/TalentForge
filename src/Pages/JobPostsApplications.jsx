import { Box, Heading, Text, Stack, Button, Flex } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ContentNotFound } from "../Components/ContentNotFound";
import { getJobApplications } from "../Redux/RecruiterReducer/action";
export const JobPostsApplications = () => {
  const params = useParams();
  const { jobposted, applications } = useSelector((store) => store.Recruiter);
  const {token} = useSelector(store=> store.Auth)
  const [currentJob, setCurrentJob] = useState(null);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getJobApplications(+params.id, token))    
    let filtered = jobposted.filter((item) => item.id === +params.id);
    setCurrentJob(filtered[0]);
  }, []);
  console.log(applications)

  return (
    <Box my={12}>
      {currentJob ? (
        <>
          <Box>
            <Heading as={"h3"} fontSize={28}>
              All applications of {currentJob.job_title}
            </Heading>
            <Text as={"i"}>Get talent employee!</Text>
          </Box>
          <Stack my={6}>
          {applications.length > 0 && applications.map(({job_seeker, status}, ind)=> (
            <Flex justifyContent={'space-between'} px={12} py={10} boxShadow={'lg'} borderRadius={12} key={ind}>
             <Box>
             <Heading as={"h4"} fontSize={20}>
               {job_seeker.name}
              </Heading>
             </Box>
             <Stack>
              <Button>Update</Button>
             </Stack>
            </Flex>
          ))}
          </Stack>
        </>
      ) : (
        <ContentNotFound />
      )}
    </Box>
  );
};
