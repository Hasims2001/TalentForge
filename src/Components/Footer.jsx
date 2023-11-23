import React from 'react'
import LogoImg from '../Assets/logo.png'
import {Box, Flex, Image, Text, Heading} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
export const Footer = () => {
  return (
    <Box mt={16} py={8} >
        <Flex justifyContent={'space-between'}>
            <Flex gap={2} alignItems={'center'}>
                <Image src={LogoImg}  w={14}/><Text as={'b'} fontSize={24}>Talent Forge</Text>
            </Flex>
            <Flex gap={8} alignItems={'center'}>
                <Heading>Write Us</Heading>
                <Text>office@talentforge.com</Text>
            </Flex>
            <Flex gap={8} alignItems={'center'}>
                <Heading>Call Us</Heading>
                <Text>049 885 890 478</Text>
            </Flex>
        </Flex>
        <Text borderTop={"1px solid #e0e0e0"} mt={16}></Text>
        <Flex justifyContent={'space-between'} mt={8} color={"brand.400"}>
            <Text>Talent Forge</Text>
            <Flex gap={12} color={"brand.130"}>
                <Link to={"/jobs"}>Jobs</Link>
                <Link to={"/companies"}>Companies</Link>
                <Link to={"/about"}>About us</Link>
                <Link to={"/contact"}>Contact</Link>
                <Link to={"/privacy"}>Privacy & Legal</Link>
            </Flex>
        </Flex>
    </Box>
  )
}
