import React from 'react'
import {Box, Flex, Text, Stack,Button, Image, Heading, Avatar} from '@chakra-ui/react'
import {useSelector} from "react-redux"
export const Account = () => {
  const { isAuth, role, user } = useSelector((store) => store.Auth);
  return (
    <Flex gap={12}>
        <Stack gap={8} px={12} py={8} boxShadow={'lg'} rounded={'xl'} textAlign={'center'} >
        <Avatar name={user.name} cursor={'pointer'} src={`https://ui-avatars.com/api/?name=${user.name}`} size={'xl'} />
       <Box>
       <Heading as={'h3'} size={'lg'}>{user.name}</Heading>
        <Text>{user.city}, {user.state}</Text>
       </Box>

       <Button colorScheme='red'>Logout</Button>
        </Stack>
        <Box>
            <Heading as={'h3'}>Profile!</Heading>
        </Box>
    </Flex>
  )
}
