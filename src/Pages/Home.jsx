import React from "react";
import HomeImg from "../Assets/home.png";
import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  Select,
  Stack,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { InputDesign } from "../Components/InputDesign";
import { Paintbrush,MapPin, MoveRight, Factory, Computer, DatabaseBackup,CircleDollarSign, PercentCircle } from "lucide-react";
import OffersImg from "../Assets/search.png";
import companies from "../Assets/companies.png"
import companiesTwo from '../Assets/companies-two.png';
import svgIconLite from '../Assets/svgBGlite.png';
import {useNavigate} from 'react-router-dom'

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
            gap={4}
            px={4}
            pt={6}
            borderRadius={12}
            bgColor={"brand.100"}
          >
            <InputDesign
              req={false}
              types="search"
              placeholderValue="Job Title"
            />
            <Select border={"none !important"} outline={"none !important"}>
              <option value={""}>Select City</option>
              <option value={"Vadodara"}>Vadodara</option>
              <option value={"Ahemdabad"}>Ahemdabad</option>
            </Select>
            <Button px={8} py={4}>
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
            <Flex gap={12}>
            <Stack >
              <Text>1 day ago</Text>
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
            <Factory color="#ff7300" />
            <Text>Bussiness Development</Text>
              </Flex> 
              <Text mt={4} fontSize={24} as={'b'}>Operation Manager</Text>
             <Flex gap={6}>
            <Flex> <MapPin color="#19d600" />&nbsp;Mumbai</Flex>
            <Text>Full-time</Text>
             </Flex>
             <Text  mt={24} p={-12} w={"100%"} borderTop={"1px solid #c7c7c7"}></Text>
            <Flex gap={12}>
            <Stack >
              <Text>1 day ago</Text>
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
            zIndex={2}
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
            <Flex gap={12}>
            <Stack >
              <Text>1 day ago</Text>
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
            zIndex={2}
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
            <Flex gap={12}>
            <Stack >
              <Text>1 day ago</Text>
              <Text as={'b'} fontSize={18}>Logitech Group</Text>
             </Stack>
             <Image w={"5vw"} objectFit={'contain'} src="https://media.wired.com/photos/59549ff18e8cc150fa8ec6c2/master/w_1600%2Cc_limit/Logi_RGB-copy.jpg" alt="Logitech Group" />
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
                <Image w={"5vw"} objectFit={'contain'} src="https://media.wired.com/photos/59549ff18e8cc150fa8ec6c2/master/w_1600%2Cc_limit/Logi_RGB-copy.jpg" alt="Logitech Group" />
                <Text as={'b'}>Logitech Group</Text>
                <Text mt={12} color={"brand.130"}>Loremrem ipsum dolor sit amet consectetur adipisicing elit. Loremrem ipsum Loremrem ipsum dolor sit amet consectetur adipisicing elit. Loremrem ipsum Loremrem ipsum dolor sit. </Text>
               <Flex mt={6} gap={8}>
               <Flex > <MapPin color="#19d600" />&nbsp;Mumbai</Flex>
               <Text as={'b'} color={"brand.600"}>3 jobs</Text>
               </Flex>
                </Box>
              </GridItem>
            </Grid>
        </Flex>
    </Box>
  );
};
