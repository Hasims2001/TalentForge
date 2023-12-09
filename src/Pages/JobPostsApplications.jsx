import { Box, Heading, Text, Stack, useToast} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ContentNotFound } from "../Components/ContentNotFound";
import { getJobApplications, updateJobApplications } from "../Redux/RecruiterReducer/action";
import {CircleDot, CheckCheck, Eye, PhoneOutgoing, CopyX} from "lucide-react"
import { ApplicationView } from "../Components/ApplicationView";
import { RESET_RECRUITER } from "../Redux/actionType";
import { Loading } from "../Components/Loading";
export const JobPostsApplications = () => {
  const params = useParams();
  const {  error, jobposted, applications, loading } = useSelector((store) => store.Recruiter);

  const {token} = useSelector(store=> store.Auth)
  const [currentJob, setCurrentJob] = useState(null);
  const dispatch = useDispatch()
  const toast= useToast()
  useEffect(() => {
    dispatch(getJobApplications(+params.id, token))    
    let filtered = jobposted.filter((item) => item.id === +params.id);
    setCurrentJob(filtered[0]);
  }, []);
  
  useEffect(()=>{
    if(error){
      toast({
position: 'bottom-right',
        title: error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    return ()=>{
      dispatch({type: RESET_RECRUITER})
    }
  }, [error])

  const handleUpdate = (id, status)=>{
    dispatch(updateJobApplications( {status: status}, id, token))
  }

  if(loading){
    return <Loading />
  }
 
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
          {applications.length > 0 && applications.map(({id, timestamp, job_seeker, status})=> {
            let Icon;
            if(status === "Pending"){
              Icon = <CircleDot color="#ffff00" strokeWidth={3} />
            }else if(status === "Application Viewed"){
              Icon = <Eye size={20} color="#0062ff" strokeWidth={3} />
            }else if(status === "Connected with Applicant"){
              Icon = <PhoneOutgoing size={20} color="#009dff" strokeWidth={3} />
            }else if(status === "Accepted"){
              Icon = <CheckCheck size={20} color="#013220" strokeWidth={3} />
            }else if(status === "Rejected"){
              Icon = <CopyX size={20} color="#ff0000" strokeWidth={3} />
            }else{
              Icon = <CircleDot color="#ffff00" strokeWidth={3} />
            }
            return (
                <ApplicationView key={id} job_seeker={job_seeker} status={status} ind={id} Icon={Icon}  timestamp={timestamp} handleUpdate={handleUpdate}/>
            )
          })}
          {!loading && applications.length === 0 && <ContentNotFound msg="No applications found" />}
          </Stack>
        </>
      ) : (
        <ContentNotFound />
      )}
    </Box>
  );
};
