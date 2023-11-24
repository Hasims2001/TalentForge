import React from 'react'
import { FormControl, Input,FormHelperText, FormLabel} from '@chakra-ui/react';
export const InputDesign = ({ids, types,req=true, name, helperText, placeholderValue=" ", values=""}) => {
  return (
    <FormControl mb={6} variant="floating"  isRequired={req } isInvalid>
            <Input defaultValue={values} placeholder={placeholderValue} id={ids} type={types} border={"none !important"} borderBottom={"1px solid black !important"}  outline={'none'} borderRadius={"none"} boxShadow={'none !important'}/>
            <FormLabel>{name}</FormLabel>
            <FormHelperText>{helperText}</FormHelperText>
            
            {/* <FormErrorMessage>Your First name is invalid</FormErrorMessage> */}
        </FormControl>
  )
}
