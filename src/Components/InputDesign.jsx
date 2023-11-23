import React from 'react'
import { FormControl, Input,FormHelperText, FormLabel} from '@chakra-ui/react';
export const InputDesign = ({ids, types,req=true, name, placeholderValue=" "}) => {
  return (
    <FormControl mb={6} variant="floating"  isRequired={req } isInvalid>
            <Input placeholder={placeholderValue} id={ids} type={types} border={"none !important"} borderBottom={"1px solid black !important"}  outline={'none'} borderRadius={"none"} boxShadow={'none !important'}/>
            <FormLabel>{name}</FormLabel>
            <FormHelperText></FormHelperText>
            
            {/* <FormErrorMessage>Your First name is invalid</FormErrorMessage> */}
        </FormControl>
  )
}
