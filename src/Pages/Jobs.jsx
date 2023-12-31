import {
  Box,
  Button,
  useToast,
  Flex,
  Stack,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Textarea,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs, getAllJobsByCategory, getJobsBytitle, postJobApplication } from "../Redux/JobseekerReducer/action";
import { Flag } from "lucide-react";
import {useParams, useSearchParams} from "react-router-dom"
import { ContentNotFound } from "../Components/ContentNotFound";
import { Loading } from "../Components/Loading";
export const Jobs = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const reportRef = useRef();
  const { jobs, loading, recommendedJobs } = useSelector((store) => store.Jobseeker);
  const { token, role } = useSelector((store) => store.Auth);
  const params = useParams()
  const [reportId, setReportId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchParam] = useSearchParams()

  const [allJobs, setAllJobs] = useState([])
  useEffect(() => {
    if(searchParam.get("search")){
      dispatch(getJobsBytitle(searchParam.get("search"), token))
    }else if(params.category){
      if(params.category === "recommend" && recommendedJobs.length > 0){
        setAllJobs(recommendedJobs)
      }else{
        dispatch(getAllJobsByCategory(params.category, token));
      }
    }
  }, [searchParam, params]);
  
  useEffect(()=>{
    if(allJobs.length === 0){
      dispatch(getAllJobs(token));
    }
  }, [])
 
    useEffect(()=>{
      setAllJobs(jobs);
    }, [jobs])
  const handleApply = (job_id) => {
    if (role === "Jobseeker") {
      dispatch(postJobApplication({"job_posting_id": job_id}, token))
    } else {
      toast({
        position: "bottom-right",
        title: "Please login as Jobseeker",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleReport = (job_id) => {
    if (isOpen === false) {
      setReportId(job_id);
      onOpen();
    } else {
      let reportText = reportRef.current.value;
      console.log(reportText);
      toast({
        position: "bottom-right",
        title: "Thank you for reporting. We will take action.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
    }
  };

    if(loading){
      return (
       <Loading />
      )
    }
  return (
    <Stack gap={8} px={12} py={6}>
      {
        recommendedJobs.length > 0 && 
          recommendedJobs.map((item) => (
          <Flex
            key={item.id}
            justifyContent={"space-between"}
            maxH={96}
            textOverflow={"ellipsis"}
            _hover={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
            boxShadow={"lg"}
            px={12}
            py={6}
            borderRadius={12}
          >
            <Stack textOverflow={"ellipsis"} gap={4}>
              <Heading as={"h4"} fontSize={20}>
                {item.job_title} - Recommended Jobs
              </Heading>

              <Flex gap={4}>
                <Text>Graduation: {item.graduation || "None"}</Text>
                <Text>Post Graduation: {item.postgraduation || "None"}</Text>
              </Flex>
              <Text>Required Skills: {item.required_skills}</Text>
              <Text>Prefered Skills: {item.prefered_skills}</Text>
              <Text>Department: {item.department}</Text>
              <Text>Experience: {item.experience}</Text>
              <Text>Location: {item.location}</Text>
              <Flex gap={2}>
                <Text>{item.employment_type}</Text>|
                <Text as={"i"}>Openings: {item.openings}</Text>
              </Flex>
            </Stack>
            <Flex flexDir={"column"} justifyContent={"space-between"}>
              <Text as={"b"} color={"brand.130"}>
                Expected Salary: {item.salary}
              </Text>
              <Stack gap={4}>
                <Button onClick={() => handleApply(item.id)}>Apply Now</Button>
                <Button
                  colorScheme="red"
                  onClick={() => handleReport(item.id)}
                  variant="outline"
                  gap={4}
                >
                  <Flag size={20} color="#ff0000" strokeWidth={2} /> Report
                </Button>
              </Stack>
            </Flex>
          </Flex>
        ))
        }
      
      {allJobs.length > 0 &&
        allJobs.map((item) => (
          <Flex
            key={item.id}
            justifyContent={"space-between"}
            maxH={96}
            textOverflow={"ellipsis"}
            _hover={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
            boxShadow={"lg"}
            px={12}
            py={6}
            borderRadius={12}
          >
            <Stack textOverflow={"ellipsis"} gap={4}>
              <Heading as={"h4"} fontSize={20}>
                {item.job_title}
              </Heading>

              <Flex gap={4}>
                <Text>Graduation: {item.graduation || "None"}</Text>
                <Text>Post Graduation: {item.postgraduation || "None"}</Text>
              </Flex>
              <Text>Required Skills: {item.required_skills}</Text>
              <Text>Prefered Skills: {item.prefered_skills}</Text>
              <Text>Department: {item.department}</Text>
              <Text>Experience: {item.experience}</Text>
              <Text>Location: {item.location}</Text>
              <Flex gap={2}>
                <Text>{item.employment_type}</Text>|
                <Text as={"i"}>Openings: {item.openings}</Text>
              </Flex>
            </Stack>
            <Flex flexDir={"column"} justifyContent={"space-between"}>
              <Text as={"b"} color={"brand.130"}>
                Expected Salary: {item.salary}
              </Text>
              <Stack gap={4}>
                <Button onClick={() => handleApply(item.id)}>Apply Now</Button>
                <Button
                  colorScheme="red"
                  onClick={() => handleReport(item.id)}
                  variant="outline"
                  gap={4}
                >
                  <Flag size={20} color="#ff0000" strokeWidth={2} /> Report
                </Button>
              </Stack>
            </Flex>
          </Flex>
        ))}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Report the job</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              ref={reportRef}
              placeholder="Write the issue here"
              id="report"
            ></Textarea>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              variant={"outline"}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Button onClick={handleReport}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {!loading && allJobs.length === 0 && <ContentNotFound msg="No Jobs Found!"/>}
    </Stack>
  );
};
