import {Box, Heading, Text, Button} from "@chakra-ui/react"
import { useParams } from "react-router-dom"

export const JobPostsApplications = () => {
    const params = useParams()
  return (
    <Box my={12}>
        <Box>
        <Heading as={'h3'} fontSize={28}>All applications of {}</Heading>
        <Text as={"i"}>Get talent employee!</Text>
        </Box>
    </Box>
  )
}
