import React, { useEffect, useRef, useState } from "react";
import HomeImg from "../Assets/home.png";
import {
  Box,
  Flex,
  Image,
  Heading,
  Input,
  Text,
  Stack,
  Button,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import { InputDesign } from "../Components/InputDesign";
import { Paintbrush,MapPin, MoveRight, Factory, Computer, DatabaseBackup,CircleDollarSign, PercentCircle , X} from "lucide-react";
import OffersImg from "../Assets/search.png";
import companies from "../Assets/companies.png"
import companiesTwo from '../Assets/companies-two.png';
import svgIconLite from '../Assets/svgBGlite.png';
import {useNavigate,} from 'react-router-dom'
import chatbotImg from "../Assets/chatboat.png";
import closeImage from "../Assets/close.png";
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {  getRecommendedJobs } from "../Redux/JobseekerReducer/action";
import { getRecommendedJobseeker } from "../Redux/RecruiterReducer/action";
import { RESETALL, RESETMSG, RESET_JOBSEEKER, RESET_RECRUITER } from "../Redux/actionType";
const categories = [
  {
    "id": 1,
    "Icon": <Paintbrush size={28} />,
    "name": "Designer"
  },
  {
    "id": 2,
    "Icon": <Factory size={28} />,
    "name": "Business"
  },
  {
    "id": 3,
    "Icon": <Computer size={28} />,
    "name": "Software"
  },
  {
    "id": 4,
    "Icon": <PercentCircle size={28} />,
    "name": "SEO Expert"
  },
  {
    "id": 5,
    "Icon": <DatabaseBackup size={28} />,
    "name": "Data Analytics"
  },
  {
    "id": 6,
    "Icon": <CircleDollarSign size={28} />,
    "name": "Marketing"
  },

]
export const Home = () => {
  const navigate = useNavigate()
  const handleCategory = (category_name)=>{
    navigate(`/jobs/${category_name}`)
  }
  const toast = useToast()
  const queryRef = useRef()
  const {user, token, role} = useSelector(store=> store.Auth)
  const {recommendedJobs} = useSelector(store=> store.Jobseeker)
  const {recommendedApplicant} = useSelector(store=> store.Recruiter)
  const jobseekerMsg = useSelector(store=> store.Jobseeker.message)
  const RecruiterMsg = useSelector(store=> store.Recruiter.message)
  const JobseekerAI = useSelector(store=> store.Jobseeker.chatWithAI)
  const RecruiterAI = useSelector(store=> store.Recruiter.chatWithAI)
  const [chat, setChat] = useState([{"content": `Hello ${user.name || ""}!\nHow can I help you?`, "role": "system"}])
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  
  useEffect(()=>{
    if(jobseekerMsg === "here is the some recommendation according to your skills:"){
      setChat([
        ...chat,
        {"content": jobseekerMsg, "role": "system"}
      ])
      dispatch({type: RESETMSG})
    }else if(JobseekerAI.length > 0 && chat.length > 1){
      let output = JobseekerAI[JobseekerAI.length-1]
      if(!Array.isArray(output)){
        setChat([
          ...chat,
          output
        ])
      }
     
    }else if(chat.length === 1){
      dispatch({type: RESET_JOBSEEKER})
    } 
  }, [JobseekerAI])

  useEffect(()=>{
    if(RecruiterMsg === "here is the some recommendation according to job requirements:"){
      setChat([
        ...chat,
        {"content": RecruiterMsg, "role": "system"}
      ])
      dispatch({type: RESETMSG})
    }else if(RecruiterAI.length > 0 && chat.length > 1){
      let output = RecruiterAI[RecruiterAI.length-1]
      if(!Array.isArray(output)){
        setChat([
          ...chat,
          output
        ])
      }
     
    }else if(chat.length === 1){
      dispatch({type: RESET_RECRUITER})
    } 
  }, [RecruiterAI])
  
  
  const handleSend = ()=>{
    let query = queryRef.current.value;
    let queryObj = {"role": "user", "content": query}
    if(query && role === "Jobseeker"){
      dispatch(getRecommendedJobs([...JobseekerAI, queryObj], token))
      setChat([
        ...chat,
        queryObj
      ])
      queryRef.current.value = ""
    }else if(query && role === "Recruiter"){
      dispatch(getRecommendedJobseeker([...RecruiterAI, queryObj], token))
      setChat([
        ...chat,
        queryObj
      ])
      queryRef.current.value = ""
    }
   
  }
  

  const handleSearch = ()=>{
    let search = document.querySelector("#searchBox").value;
    if(search){
      navigate(`/jobs?search=${search}`)
    }
  }
  const handleOpen =()=>{
    if(user.name){
      setIsOpen(!isOpen)
    }else{
      toast({
        title: "Please login first!",
        status: "info",
        duration: 9000,
        isClosable: true
      })
    }
  }
  return (
    <Box px={12} mx={-12}>
      {/* section 1 */}
      <Flex justifyContent={"center"} gap={28} >
        <Box
          bg={"brand.300"}
          borderRadius={12}
          px={20}
          py={12}
          my={16}
          lineHeight={2}
          boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"}
        >
          <Heading fontSize={42} as={"h2"}>
            New{" "}
            <Text
              as={"span"}
              bg={"brand.100"}
              px={2}
              borderRadius={"90px 20px 20px 50px "}
              color={"brand.500"}
            >
              offers{" "}
            </Text>
            <br></br> are watting<br></br> for you
          </Heading>
          <Text fontSize={24}>find a new job</Text>

          <Flex
            mt={12}
            gap={8}
            px={6}
            pt={6}
            borderRadius={12}
            bgColor={"brand.100"}
          >
            <InputDesign
              req={false}
              ids={"searchBox"}
              types="search"
              placeholderValue="Job Title"
            />
            <Button px={8} py={4} onClick={handleSearch}>
              Search
            </Button>
          </Flex>
        </Box>
        <Image src={svgIconLite}  pos={'absolute'} right={12} />
        <Image
          src={HomeImg}
          alt="Home image"
          w={"35%"}
          mt={12}
          transform={"scale(1.3)"}
          objectFit={"contain"}
        />
      </Flex>
      {/* section 2 */}
      <Box  mt={12}>
        <Flex my={12} gap={16} alignItems={"flex-end"}>
          <Heading fontSize={42} as={"h2"}>
            Search <br></br>by Category
          </Heading>
          <Flex gap={4} alignItems={"center"}>
            <Text as={"b"}>All categories</Text> <MoveRight />
          </Flex>
        </Flex>
        <Flex flexWrap={"wrap"} gap={12}>
         {categories.map(({id, name, Icon})=>(
           <Box
           key={id}
           bgColor={"brand.140"}
           _hover={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
           minW={50}
           cursor={"pointer"}
           p={12}
           borderRadius={12}
           textAlign={"center"}
           onClick={()=>handleCategory(name)}
         >
           <Box
             p={6}
             margin={'0 auto'}
             borderRadius={"full"}
             _hover={{
               transform: "rotate(-50deg)",
               transition: "all 0.5s ease",
             }}
           >
             {Icon}
           </Box>
           <Text mt={4}>{name}</Text>
         </Box>
         ))}

        </Flex>
      </Box>

      {/* section 3 */}
      <Box  mx={-24} mt={36} py={12}  bgColor={"brand.300"}>
        <Box px={32}>
        <Flex my={12} gap={16} alignItems={"flex-end"}>
          <Heading fontSize={42} as={"h2"}>
            Job<br></br>Offers
          </Heading>
          <Flex gap={4} alignItems={"center"}>
            <Text as={"b"}>All offers</Text> <MoveRight />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} gap={12} pos={'relative'}>
          <Image
            src={OffersImg}
            w={"45%"}
            pos={"absolute"}
            zIndex={0}
            right={6}
            bottom={-12}
          />
          {/* put real time data */}
          <span>
            <Text fontSize={40}>641</Text>
            <Text>offers</Text>
          </span>
          <Box>
            <Text
              px={6}
              py={5}
              borderRadius={"100%"}
              bgColor={"brand.100"}
              as={"b"}
            >
              in
            </Text>
          </Box>
          <span>
            <Text fontSize={40}>18</Text>
            <Text>Categories</Text>
          </span>
        </Flex>
        </Box>
        <Grid px={20} templateColumns='repeat(3, 1fr)' gap={8} mt={12} zIndex={2}>
          <Stack
            p={12}
            borderRadius={12}
            boxShadow={"lg"}
            bgColor={"brand.100"}
            cursor={"pointer"}
            _hover={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
          >
            <Flex gap={4}>
            <Factory color="#ff7300" />
            <Text>Bussiness Development</Text>
              </Flex> 
              <Text mt={4} fontSize={24} as={'b'}>Operation Manager</Text>
             <Flex gap={6}>
            <Flex> <MapPin color="#19d600" />&nbsp;Mumbai</Flex>
            <Text>Full-time</Text>
             </Flex>
             <Text  mt={24} p={-12} w={"100%"} borderTop={"1px solid #c7c7c7"}></Text>
            <Flex justifyContent={'space-between'}>
            <Stack >
              <Text>2 day ago</Text>
              <Text as={'b'} fontSize={18}>Logitech Group</Text>
             </Stack>
             <Image w={"5vw"} objectFit={'contain'} src="https://media.wired.com/photos/59549ff18e8cc150fa8ec6c2/master/w_1600%2Cc_limit/Logi_RGB-copy.jpg" alt="Logitech Group" />
            </Flex>
          </Stack>
          <Stack
            p={12}
            borderRadius={12}
            boxShadow={"lg"}
            bgColor={"brand.100"}
            cursor={"pointer"}
            _hover={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
          >
            <Flex gap={4}>
            <Computer color="#0000FF" />
            <Text>Software Development</Text>
              </Flex> 
              <Text mt={4} fontSize={24} as={'b'}>Android Developer</Text>
             <Flex gap={6}>
            <Flex> <MapPin color="#19d600" />&nbsp;Delhi</Flex>
            <Text>Full-time</Text>
             </Flex>
             <Text  mt={24} p={-12} w={"100%"} borderTop={"1px solid #c7c7c7"}></Text>
            <Flex justifyContent={'space-between'}>
            <Stack >
              <Text>1 day ago</Text>
              <Text as={'b'} fontSize={18}>Newgen Software</Text>
             </Stack>
             <Image w={"5vw"} objectFit={'contain'} src="https://contentstatic.techgig.com/photo/102076932/newgen-plans-to-hire-500-techies-for-expansion-as-revenue-soars-by-34.jpg?11590" alt="Logitech Group" />
            </Flex>
          </Stack>
          <Stack
            p={12}
            borderRadius={12}
            boxShadow={"lg"}
            bgColor={"brand.100"}
            zIndex={2}
            cursor={"pointer"}
            _hover={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
          >
            <Flex gap={4}>
            <Paintbrush color="#FF0000" />
            <Text>Designer</Text>
              </Flex> 
              <Text mt={4} fontSize={24} as={'b'}>UI-UX Designer</Text>
             <Flex gap={6}>
            <Flex> <MapPin color="#19d600" />&nbsp;Hydrabad</Flex>
            <Text>Internship</Text>
             </Flex>
             <Text  mt={24} p={-12} w={"100%"} borderTop={"1px solid #c7c7c7"}></Text>
            <Flex justifyContent={'space-between'}>
            <Stack >
              <Text>1 day ago</Text>
              <Text as={'b'} fontSize={18}>Microsoft</Text>
             </Stack>
             <Image w={"5vw"} objectFit={'contain'} src="https://www.freepnglogos.com/uploads/microsoft-logo-png-transparent-background-1.png" alt="Microsoft" />
            </Flex>
          </Stack>
          <Stack
            p={12}
            borderRadius={12}
            boxShadow={"lg"}
            bgColor={"brand.100"}
            zIndex={2}
            cursor={"pointer"}
            _hover={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
          >
            <Flex gap={4}>
            <Factory color="#ff7300" />
            <Text>Marketing</Text>
              </Flex> 
              <Text mt={4} fontSize={24} as={'b'}>Facebook Ads</Text>
             <Flex gap={6}>
            <Flex> <MapPin color="#19d600" />&nbsp;Bangluru</Flex>
            <Text>Full-time</Text>
             </Flex>
             <Text  mt={24} p={-12} w={"100%"} borderTop={"1px solid #c7c7c7"}></Text>
            <Flex justifyContent={'space-between'}>
            <Stack >
              <Text>3 day ago</Text>
              <Text as={'b'} fontSize={18}>Inspiron Labs</Text>
             </Stack>
             <Image w={"5vw"} objectFit={'contain'} src="https://www.inspironlabs.com/assets/img/logo/logo.svg" alt="Logitech Group" />
            </Flex>
          </Stack>
        </Grid>
      </Box>


      {/* section 4 */}
        <Flex px={20} mt={24} pos={'relative'} gap={36}>
          <Stack gap={6}>
            <Heading  fontSize={42} >Find best <br></br> companies</Heading>
            <Flex gap={4} alignItems={'center'}><Text  as={'b'} >All companies </Text>  <MoveRight /></Flex>
          </Stack>
            <Image src={companies} w={"25%"}  borderRadius={12} top={44} alt="companies" pos={'absolute'}  left={8}  />
            <Image src={companiesTwo} w={"15%"}  borderRadius={12} top={"30rem"} alt="companies" pos={'absolute'}  left={48}  />
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem maxW={"90%"}>
                <Stack p={12} borderRadius={12} boxShadow={"lg"} bgColor={"brand.100"} zIndex={2} cursor={"pointer"} _hover={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                <Image w={"10vw"} objectFit={'contain'} src="https://www.inspironlabs.com/assets/img/logo/logo.svg" alt="inspiron labs" />
                <Text  mt={2} as={'b'}>Inspiron labs</Text>
                <Text mt={12} color={"brand.130"}>Loremrem ipsum dolor sit amet consectetur adipisicing elit. Loremrem ipsum Loremrem ipsum dolor sit amet consectetur adipisicing elit. Loremrem ipsum Loremrem ipsum dolor sit. </Text>
               <Flex mt={6} gap={8}>
               <Flex > <MapPin color="#19d600" />&nbsp;Bangluru</Flex>
               <Text as={'b'} color={"brand.600"}>4 jobs</Text>
               </Flex>
                </Stack>
              </GridItem>
              <GridItem maxW={"90%"}>
                <Box p={12} borderRadius={12} boxShadow={"lg"} bgColor={"brand.100"} zIndex={2} cursor={"pointer"} _hover={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                <Image w={"5vw"} objectFit={'contain'} src="https://media.wired.com/photos/59549ff18e8cc150fa8ec6c2/master/w_1600%2Cc_limit/Logi_RGB-copy.jpg" alt="Logitech Group" />
                <Text as={'b'}>Logitech Group</Text>
                <Text mt={12} color={"brand.130"}>Loremrem ipsum dolor sit amet consectetur adipisicing elit. Loremrem ipsum Loremrem ipsum dolor sit amet consectetur adipisicing elit. Loremrem ipsum Loremrem ipsum dolor sit. </Text>
               <Flex mt={6} gap={8}>
               <Flex > <MapPin color="#19d600" />&nbsp;Mumbai</Flex>
               <Text as={'b'} color={"brand.600"}>3 jobs</Text>
               </Flex>
                </Box>
              </GridItem>
              <GridItem maxW={"90%"}>
                <Box p={12} borderRadius={12} boxShadow={"lg"} bgColor={"brand.100"} zIndex={2} cursor={"pointer"} _hover={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                <Image w={"5vw"} objectFit={'contain'} src="https://contentstatic.techgig.com/photo/102076932/newgen-plans-to-hire-500-techies-for-expansion-as-revenue-soars-by-34.jpg?11590" alt="Newgen Software" />
                <Text as={'b'}>Newgen Software</Text>
                <Text mt={12} color={"brand.130"}>Loremrem ipsum dolor sit amet consectetur adipisicing elit. Loremrem ipsum Loremrem ipsum dolor sit amet consectetur adipisicing elit. Loremrem ipsum Loremrem ipsum dolor sit. </Text>
               <Flex mt={6} gap={8}>
               <Flex > <MapPin color="#19d600" />&nbsp;Delhi</Flex>
               <Text as={'b'} color={"brand.600"}>1 jobs</Text>
               </Flex>
                </Box>
              </GridItem>
            </Grid>
        </Flex>

        {/* chatbot */}
        <Box  zIndex={10} borderRadius={'lg'} pos={'fixed'} bgColor={"brand.300"} right={24} bottom={28} maxW={"20vw"}  display={isOpen === false && "none"} >
             <Flex justifyContent={'space-between'} px={4} py={2}>
             <Text as={'b'}>Welcome {user.name || ""}!</Text>
             <X onClick={handleOpen} cursor={'pointer'} />
             </Flex>
             <Box minH={"45vh"} maxH={"45vh"} bgColor={"brand.100"} overflowY={"scroll"} py={4}>
              {
                chat.length > 0 && chat.map((item, ind)=>{
                  if(item && item.role !== "user"){
                    return (
                      <Text px={4} key={ind} py={2} bgColor={'brand.500'} w={'fit-content'} color={"brand.100"} borderRadius={"20px 20px 20px 0"} mx={4} my={2}>{item.content}</Text>
                    )
                  }else{
                    return (
                      <Flex key={ind} justifyContent={'flex-end'}>
                      <Text px={4} py={2} bgColor={'brand.300'} w={'fit-content'} borderRadius={"20px 20px 0px 20px"} mx={4} my={2}>{item.content}</Text>
                      </Flex>
                    )
                  }
                })
              }
              {
                recommendedJobs.length > 0 && <Stack  >
                  <Text fontWeight={'bold'} textAlign={'end'} px={4} py={2} bgColor={"brand.300"} as={Link} to={"/jobs/recommend"}>View All</Text>
                 {recommendedJobs.length > 0 && recommendedJobs.map((item)=>(
                    <Box key={item.id} mx={4} py={8} px={4} boxShadow={'lg'}>
                      <Text as={'b'}>{item.job_title}</Text>
                      <Text>Required Skills: {item.required_skills}</Text>
                      <Text>Prefered Skills: {item.prefered_skills}</Text>
                      <Text>Cateogry: {item.role_category}</Text>
                      <Text>Salary: {item.salary}</Text>
                    </Box>
                  ))}
                </Stack>
              }
              {
                recommendedApplicant.length > 0 && <Stack  >
                <Text fontWeight={'bold'} textAlign={'end'} px={4} py={2} bgColor={"brand.300"} as={Link} to={"/jobposts/applications/recommend"}>View All</Text>
               {recommendedApplicant.length > 0 && recommendedApplicant.map((item)=>(
                  <Box key={item.id} mx={4} py={8} px={4} boxShadow={'lg'}>
                    <Text as={'b'}>{item.name}</Text>
                    <Text>Skills: {item.skills}</Text>
                    <Text>graduation: {item.graduation.join(",")}</Text>
                    
                  </Box>
                ))}
              </Stack>
              }
             </Box>
             <Flex >
              <Input id="query" ref={queryRef} bgColor={"brand.110"}  type="text" placeholder="Write your query!" border={"none !important"} outline={"none !important"} _focus={{borderColor: "none !important"}}></Input>
              <Button onClick={handleSend}>Send</Button>
             </Flex>
        </Box>
        <Box >
             <Image display={isOpen === true && "none" } onClick={handleOpen} cursor={"pointer"} pos={'fixed'} right={12} bottom={8} zIndex={10} src={chatbotImg}  w={"8vw"}/>
             <Image display={isOpen === false && "none"} onClick={handleOpen} cursor={"pointer"} pos={'fixed'} right={12} bottom={8} zIndex={10} src={closeImage}  w={"7vw"}/>
        </Box>
    </Box>
  );
};
