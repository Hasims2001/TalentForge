import React, { useEffect, useState } from "react";
import { Heading, Image, Flex, Button, Avatar } from "@chakra-ui/react";
import logo from "../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const Navbar = () => {
  const {  role, user } = useSelector((store) => store.Auth);
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState("None");
  useEffect(() => {
    if (role !== "") {
      setCurrUser(role);
    }
  }, [role]);
  return (
    <Flex
      py={4}
      justifyContent={"space-between"}
      alignItems={"center"}
      fontSize={18}
    >
      <Link to={"/"}>
        <Flex alignItems={"center"} gap={2}>
          <Image src={logo} w={14} />
          <Heading>Talent Forge</Heading>
        </Flex>
      </Link>
      <Flex gap={8}>
        <Link to={"/"}>Home</Link>
        <Link to={"/jobs"}>Jobs</Link>
        <Link to={"/companies"}>Companies</Link>
        {role === "Recruiter" && <Link to={"/postjob"}>Post job</Link>}
        {role === "Jobseeker" && <Link to={"/applications"}>Applications</Link>}
        <Link to={"/contact"}>Contact</Link>
      </Flex>
      <Flex gap={8}>
        {currUser === "None" ? (
          <>
            <Link to={"/login"}>
              <Button variant={""}>Login</Button>
            </Link>
            <Link to={"/register"}>
              <Button>Create Account</Button>
            </Link>
          </>
        ) : (
          <>
         <Avatar onClick={()=> navigate("/account")} name={user.name} cursor={'pointer'} src={`https://ui-avatars.com/api/?name=${user.name}`} />
          </>
        )}
        
      </Flex>
    </Flex>
  );
};
