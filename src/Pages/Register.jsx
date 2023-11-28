import React, { useCallback, useEffect, useState } from "react";
import {
  Flex,
  Text,
  Heading,
  Box,
  Stack,
  useToast
} from "@chakra-ui/react";
import styled from "styled-components";
import { LoginDesign } from "../Components/LoginDesign";
import { InputDesign } from "../Components/InputDesign";
import { Link } from "react-router-dom";
import { ButtonDesign } from "../Components/ButtonDesign";
import { postRegisterRecruiter } from "../Redux/AuthReducer/action";
import { postRegisterJobseeker } from "../Redux/AuthReducer/action";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import {  RESET_AUTH } from "../Redux/actionType";
export const Register = () => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState({}); 
    const toast = useToast()
    const {message, loading, error} = useSelector(store=> store.Auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
      if(error){
        toast({
position: 'bottom-right',
          title: error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      return ()=>{
        dispatch({type: RESET_AUTH})
      }
    }, [error])

    useEffect(()=>{
        if(message === "Register successfully!"){
            alert(message + ", Login to continue")
            navigate("/login")
        }
        return ()=>{
          dispatch({type: RESET_AUTH})
        }
    }, [message])
  const handleFormOne = (e) => {
    e.preventDefault();
    setData({
      ...data,
      "name": e.target.name.value,
      "email": e.target.email.value,
      "password": e.target.password.value,
    })
    let user = document.querySelector("#isRecruiter").checked
    if(user){
        setPage(3)
    }else{
        setPage(2)
    }

  };
  const handleFormTwo = (e)=>{
    e.preventDefault();
    let obj = {
      ...data,
      "address": e.target.address.value,
      "city": e.target.city.value,
      "state": e.target.state.value,
      "pincode": e.target.pincode.value,
      "phone": +e.target.phone.value
    }
    setData(obj)
    dispatch(postRegisterJobseeker(obj))

  }
  const handleFormThree = (e)=>{
    e.preventDefault();
    let obj = {
      ...data,
      "company_name": e.target.company_name.value,
      "current_jobrole": e.target.current_jobrole.value,
      "city": e.target.city.value,
      "state": e.target.state.value,
    }
    setData(obj)
    dispatch(postRegisterRecruiter(obj))
}
  
  return (
    <>
      <Box
        bg={"brand.300"}
        top={"-48px"}
        h={"100vh"}
        zIndex={-1}
        w={"47.2%"}
        left={0}
        position={"absolute"}
      ></Box>
      <Flex
        w={"70%"}
        h={"85vh"}
        m={"auto"}
        px={10}
        alignItems={"center"}
        justifyContent={'space-between'}
        boxShadow={
          "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px"
        }
        mt={12}
      >
        <LoginDesign />
       <Stack
          mb={4}
          px={24}
          h={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
        >
        <Heading as={"h6"} fontSize={24} mb={10}>
            Create Account!
          </Heading>
        {page === 1 &&  
          <DIV>
            <Text fontWeight={600}>Are you a Recruiter?</Text>
            <label className="switch" >
              <input type="checkbox" id="isRecruiter"/>
              <span className="slider"></span>
            </label>
          </DIV>
           }
          
           {page === 1 && <form onSubmit={handleFormOne}>
           <InputDesign ids="name" types="text" name={"Name"} />
            <InputDesign ids="email" types="email" name={"Email"} />
            <InputDesign ids="password" types="password" name={"Password"} />
            <ButtonDesign
             types={'submit'} values={"Next"}
            ></ButtonDesign>
           </form>}

           {page === 2 && <form onSubmit={handleFormTwo}>
            <InputDesign ids="phone" types="number" name={"Phone Number"} />
           <InputDesign ids="address" types="text" name={"Address"} />
            <InputDesign ids="city" types="text" name={"City"} />
            <InputDesign ids="state" types="text" name={"State"} />
            <InputDesign ids="pincode" types="number" name={"Pincode"} />
            <ButtonDesign isLoading={loading}
              values={"Submit"} types={'submit'}
            ></ButtonDesign>
           </form>}

           {page === 3 && <form onSubmit={handleFormThree}>
           <InputDesign ids="company_name" types="text" name={"Company Name"} />
            <InputDesign ids="current_jobrole" types="text" name={"Current Job Role"} />
            <InputDesign ids="city" types="text" name={"City"} />
            <InputDesign ids="state" types="text" name={"State"} />
            <ButtonDesign isLoading={loading}
             values={"Submit"} types={'submit'}
            ></ButtonDesign>
           </form>}
          
        <u><Link to={"/login"}>Already have an account?</Link></u>
        </Stack>
       
      </Flex>
    </>
  );
};

const DIV = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;
/* The switch - the box around the slider */
.switch {
  font-size: 11px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border: 1px solid #adb5bd;
  transition: .4s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1.4em;
  width: 1.4em;
  border-radius: 20px;
  left: 0.27em;
  bottom: 0.25em;
  background-color: #adb5bd;
  transition: .4s;
}

input:checked + .slider {
  background-color: #ade8f4;
  border: 1px solid #ade8f4;
}

input:focus + .slider {
  box-shadow: 0 0 1px #ade8f4;
}

input:checked + .slider:before {
  transform: translateX(1.4em);
  background-color: #fff;
}
`