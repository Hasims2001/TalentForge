import React from 'react'
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; 
export const PageNotFound = () => {
  return (
    <Box textAlign="center" p={8} minH={'70vh'} mt={20}>
      <Heading fontSize="6xl" mb={4}>
        404
      </Heading>
      <Text fontSize="xl" mb={8}>
        Oops! Page not found.
      </Text>
      <Button as={Link} to="/" size="lg">
        Go Home
      </Button>
    </Box>
  )
}
