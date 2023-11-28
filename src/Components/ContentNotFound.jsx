import {Stack, Heading, Button} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const ContentNotFound = ({msg="Content not found!"}) => {
  return (
    <Stack my={48} gap={6} alignItems={'center'}>
    <Heading as={'h4'} fontSize={"2xl"}>{msg}</Heading>
    <Button as={Link} to="/">Home</Button>
    </Stack>
  )
}
