import React from 'react'
import {Box, Flex, Text, Stack,Button, Image,useToast, Heading, Avatar} from '@chakra-ui/react'
import {useSelector} from "react-redux"
import { InputDesign } from '../Components/InputDesign';
import { ButtonDesign } from '../Components/ButtonDesign';
import {XCircle} from "lucide-react"
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export const Account = () => {
  const {  role, user } = useSelector((store) => store.Auth);
  const [skills, setSkills] = React.useState([])
  const toast = useToast()
  const navigate = useNavigate()
  const errorToast = ()=>{
    toast({
      title: 'All fields are required!',
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
  }
  const handleAdd = ()=>{
    let curr = document.querySelector("#skill").value
    if(curr !== "" && curr !== " "){
        setSkills([
            ...skills,
            curr
        ])
    }
  }
  const handleDelete  = (id)=>{
    let filtered = skills.filter((ele, index)=>{
        return index !== +id
    })
    setSkills(filtered)
  }
  const handleLogout = ()=>{
    // logout
    Cookies.remove('user')
    Cookies.remove('userToken')
    Cookies.remove('userRole')
    navigate("/")
  }


  const handlePersonal = (e)=>{
    e.preventDefault()
    let name = e.target.name.value;
    let email = e.target.email.value;
    let phone = e.target.phone.value;
    let address = e.target.address.value;
    let city = e.target.city.value;
    let state = e.target.state.value;
    let pincode = e.target.pincode.value;

   
    if(name === "" || email === "" || phone === "" || address === "" || city === "" || state === "" || pincode === ""){
      errorToast()
    }else{
        console.log(name, email, phone, address, city, state, pincode)
    }

  }
  const handleEducational = (e)=>{
    e.preventDefault()
    let degreeName = e.target.degreeName.value;
    let intitute =  e.target.intitute.value;
    let year =  e.target.year.value;

    if(degreeName === "" || intitute === "" || year === ""){
      errorToast()
    }
  }

  const handleSkills = (e)=>{
    e.preventDefault()
    if(skills.length === 0){
        toast({
            title: 'Skill box is empty!',
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
    }else{
        console.log(skills)
    }
  }
  const handleExperince= (e)=>{
    e.preventDefault()
    let companyName = e.target.companyName.value;
    let position =  e.target.position.value;
    let from =  e.target.from.value;
    let to =  e.target.to.value;

    if(companyName === "" || position === "" || from === "" || to === ""){
      errorToast()
    }else{
        console.log(companyName, position, from, to)
    }
  }
  return (
    <Flex gap={12} >
        <Stack h={'fit-content'} gap={8} px={20} my={8} py={12} boxShadow={'lg'} rounded={'xl'} textAlign={'center'} >
        <Avatar margin={'0 auto'} name={user.name} cursor={'pointer'} src={`https://ui-avatars.com/api/?name=${user.name}`} size={'xl'} />
       <Box>
       <Heading as={'h3'} size={'lg'}>{user.name}</Heading>
        <Text>{user.city}, {user.state}</Text>
       </Box>
       {role === "Jobseeker" && <Button as={Link} to={'/applications'}>My Applications</Button>}
       {role === "Recruiter" && <Button as={Link} to={'/all/postjob'}>My Posted Jobs</Button>}
       <Button onClick={handleLogout} colorScheme='red'>Logout</Button>
        </Stack>
        <Box>
            <form onSubmit={handlePersonal}>
            <Heading px={8} pt={8} as={'h3'} size={'lg'}>Personal Information!</Heading>
            <Flex flexWrap={'wrap'} maxW={"60%"} gap={8} p={8} >
                <InputDesign ids="name" types={'text'} name="Name" values={`${user.name || ""}`}></InputDesign>
                <InputDesign ids="email" types={'email'} name="Email" values={`${user.email || ""}`}></InputDesign>
                <InputDesign ids="phone" types={'number'}  name="Phone Number" values={`${user.phone || ""}`}></InputDesign>
                <InputDesign ids="address" types={'text'} name="Address" values={`${user.address || ""}`}></InputDesign>
                <InputDesign ids="city" types={'text'} name="City" values={`${user.city || ""}`}></InputDesign>
                <InputDesign ids="state" types={'text'} name="State" values={`${user.state || ""}`}></InputDesign>
                <InputDesign ids="pincode" types={'number'} name="Pincode" values={`${user.pincode || ""}`}></InputDesign>
                <ButtonDesign types={"submit"} values={"Update Profile"} ></ButtonDesign>
            </Flex>
            </form>
            <form onSubmit={handleSkills}>
            <Heading px={8} pt={8} as={'h3'} size={'lg'}>Skills!</Heading>
            <Flex flexWrap={'wrap'} maxW={"60%"} gap={4} p={8} >
            <InputDesign ids="skill" req={false} types={'text'} name="Skill"></InputDesign>
            <Button w={"full"} onClick={handleAdd}>Add</Button>
          
            <Flex gap={4}>
                {
                    skills.length > 0 && skills.map((item, ind)=>(
                        <Flex  gap={2} alignItems={'center'} p={2} borderRadius={'full'} border={"1px solid #e60000"}>
                        <Text as={'span'} fontSize={"lg"}  key={ind}>{item} </Text>
                        <XCircle id={ind} onClick={(e)=>handleDelete(e.target.id)} style={{cursor:'pointer'}} size={20} color="#e60000" />
                        </Flex>
                    ))
                }
            </Flex>
           
            <ButtonDesign types={"submit"} values={"Update Skills"}></ButtonDesign>
            </Flex>
            </form>
            <form onSubmit={handleEducational}>
            <Heading px={8} pt={8} as={'h3'} size={'lg'}>Educational Information!</Heading>
            <Flex flexWrap={'wrap'} maxW={"60%"} gap={8} p={8} >
                <InputDesign ids="degreeName" types={'text'} name="Degree/Standard name" values={`${user.degreeName || ""}`}></InputDesign>
                <InputDesign ids="intitute" types={'text'} name="Intitute name" values={`${user.intitute || ""}`}></InputDesign>
                <InputDesign ids="year" types={'number'} name="Year of completion" values={`${user.year || ""}`}></InputDesign>
                <ButtonDesign types={"submit"} values={"Update Education"}></ButtonDesign>
            </Flex>
            </form>
            <form onSubmit={handleExperince}>
            <Heading px={8} pt={8} as={'h3'} size={'lg'}>Experince Information!</Heading>
            <Flex flexWrap={'wrap'} maxW={"60%"} gap={8} p={8} >
                <InputDesign ids="companyName" types={'text'} name="Company name" values={`${user.companyName || ""}`}></InputDesign>
                <InputDesign ids="position" types={'text'} name="Position" values={`${user.position || ""}`}></InputDesign>
                <InputDesign ids="from" types={'date'} name="From" values={`${user.from || ""}`}></InputDesign>
                <InputDesign ids="to" types={'date'} name="To" values={`${user.to || ""}`}></InputDesign>
                <ButtonDesign types={"submit"} values={"Update Experince"}></ButtonDesign>
            </Flex>
            </form>
        </Box>
    </Flex>
  )
}