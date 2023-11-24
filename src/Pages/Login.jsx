import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Heading,
  Box,
  Stack,
} from "@chakra-ui/react";
import styled from "styled-components";
import { LoginDesign } from "../Components/LoginDesign";
import { InputDesign } from "../Components/InputDesign";
import { Link } from "react-router-dom";
import { ButtonDesign } from "../Components/ButtonDesign";
import {useDispatch, useSelector} from "react-redux"
import { postLoginRecruiter } from "../Redux/AuthReducer/action";
import { postLoginJobseeker } from "../Redux/AuthReducer/action";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
export const Login = () => {
    const [data, setData] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {message, loading, error,  user, token} = useSelector(store=> store.Auth)
    useEffect(()=>{
      if(error){
          alert(error)
      }
      if(token){
        Cookies.set('user', JSON.stringify(user))
        Cookies.set("userRole", user.role)
        Cookies.set('userToken', token)
        alert("login success")
        navigate("/")
      }
  }, [error, message, token])
    const handleForm = (e)=>{
        e.preventDefault()
        let obj = {
          ...data,
          "email": e.target.email.value,
          "password": e.target.password.value,
      }
        setData(obj)
        let isRecruiter = document.querySelector("#isRecruiter").checked
        if(isRecruiter){
          dispatch(postLoginRecruiter(obj))
        }else{
          dispatch(postLoginJobseeker(obj))
        }
    }
    const handleForgot = ()=>{
        alert("feature is under development!")
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
            Login!
          </Heading>
         
          <DIV>
            <Text fontWeight={600}>Are you a Recruiter?</Text>
            <label className="switch" >
              <input type="checkbox" id="isRecruiter"/>
              <span className="slider"></span>
            </label>
          </DIV>
          
            <form onSubmit={handleForm}>
            <InputDesign ids="email" types="email" name={"Email"} />
            <InputDesign ids="password" types="password" name={"Password"} />
            <Text onClick={handleForgot} cursor={'pointer'} mt={-4} mb={6} textAlign={'right'}><u>Forgot Password?</u></Text>
            <ButtonDesign isLoading={loading} types={"submit"} values={"Submit"}/>
           </form>

        <u><Link to={"/register"}>Don't have an account?</Link></u>
        </Stack>
       
      </Flex>
    </>
  );
}

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