import React from 'react'
import logo from '../Assets/logo.png'
import {Text,Heading,  Image,    Stack,} from '@chakra-ui/react';
export const LoginDesign = () => {
  return (
    
           <Stack  bg={"brand.300"}  pr={20} pl={10} h={"100%"} justifyContent={'center'}>
                <Image src={logo} alt='logo' w={14}/>
                <Heading>Talent Forge</Heading>
                <Text >India's top job <br></br> matching platform</Text>
           </Stack>
          
  )
}
