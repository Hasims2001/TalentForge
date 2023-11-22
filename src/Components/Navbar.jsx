import React from 'react'
import {Heading, Image, Flex, Button} from '@chakra-ui/react'
import logo from '../Assets/logo.png'
import { Link } from 'react-router-dom'
export const Navbar = () => {
  return (
    <Flex px={16} py={4} justifyContent={'space-between'} alignItems={'center'} fontSize={18}>
        <Link to={"/"}>
            <Flex alignItems={'center'} gap={2}><Image src={logo}  w={14}/><Heading>Talent Forge</Heading></Flex>
        </Link>
        <Flex gap={8}>
            <Link to={"/"}>Home</Link>
            <Link to={"/jobs"}>Jobs</Link>
            <Link to={"/about"}>About us</Link>
            <Link to={"/contact"}>Contact</Link>
        </Flex>
        <Flex gap={8}>
            <Link to={'/login'}><Button variant={''}>Login</Button></Link>
            <Link to={"/register"} ><Button>Create Account</Button></Link>
        </Flex>  
        
    </Flex>
  )
}
