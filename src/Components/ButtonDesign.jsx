import React from 'react'
import {

    Button,
  } from "@chakra-ui/react";
export const ButtonDesign = ({isLoading, types, values, widths="100%"}) => {
  return (
    <Button
    my={4}
    type={types}
    color={"brand.200"}
    bg={"brand.300"}
    border={"none"}
    w={widths}
    _hover={{ bg: "brand.400" }}
  >{isLoading ? "Loading..." : values}</Button>
  )
}
