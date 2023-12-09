import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  useToast,
  Text,
  Stack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  useDisclosure,
  Textarea,
  DrawerContent,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteJobPost,
  getJobPost,
  updateJobPost,
} from "../Redux/RecruiterReducer/action";
import { RESET_RECRUITER } from "../Redux/actionType";
import { ButtonDesign } from "../Components/ButtonDesign";
import { InputDesign } from "../Components/InputDesign";
import { XCircle } from "lucide-react";
export const JobPosts = () => {
  const { loading, jobposted, error,message } = useSelector(
    (store) => store.Recruiter
  );
  const { token, user } = useSelector((store) => store.Auth);
  const dispatch = useDispatch();
  const [skills, setSkills] = useState(new Set());
  const [prefSkills, setPrefSkills] = useState(new Set());
  const [editPost, setEditPost] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  useEffect(() => {
    if (jobposted.length === 0) {
      dispatch(getJobPost(user.id, token));
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        position: "bottom-right",
        title: error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    return () => {
      dispatch({ type: RESET_RECRUITER });
    };
  }, [error]);

  useEffect(()=>{
    if(message === "Job post updated successfully!"){
      toast({
        position: "bottom-right",
        title: message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose()
    }
    return () => {
      dispatch({ type: RESET_RECRUITER });
    };
  }, [message])
  const handleEdit = (ind) => {
    let filtered = jobposted.filter((item) => item.id === ind);
    let curr = filtered[0];
    setSkills(curr.required_skills.split(","));
    setPrefSkills(curr.prefered_skills.split(","));
    setEditPost(curr);
    onOpen();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = editPost.id;
    let obj = {
      job_title: e.target.title.value,
      salary: e.target.salary.value,
      department: e.target.department.value,
      graduation: e.target.graduation.value,
      postgraduation: e.target.postGraduation.value,
      role_category: e.target.role_category.value,
      experience: e.target.experience.value,
      employment_type: e.target.employment_type.value,
      openings: +e.target.openings.value,
      location: e.target.location.value,
      description: e.target.description.value,
      required_skills: Array.from(skills).join(","),
      prefered_skills: Array.from(prefSkills).join(","),
    };

    dispatch(updateJobPost(obj, id, token));
  };
  const handleDelete = (ind) => {
    dispatch(deleteJobPost(ind, token));
  };

  const handleAdd = () => {
    let curr = document.querySelector("#skill").value;
    if (curr !== "" && curr !== " ") {
      const newSkillsSet = new Set([...skills, curr.toLowerCase()]);
      setSkills(newSkillsSet);
    }
  };

  const handleAddPref = () => {
    let curr = document.querySelector("#prefSkill").value;
    if (curr !== "" && curr !== " ") {
      const newSkillsSet = new Set([...prefSkills, curr.toLowerCase()]);
      setPrefSkills(newSkillsSet);
    }
  };
  const handleDeleteSkills = (id) => {
    let filtered = new Set(
      Array.from(skills).filter((ele, index) => {
        return index !== +id;
      })
    );
    setSkills(filtered);
  };

  const handleDeletePref = (id) => {
    let filtered = new Set(
      Array.from(prefSkills).filter((ele, index) => {
        return index !== +id;
      })
    );
    setPrefSkills(filtered);
  };
  return (
    <Box my={12} px={12}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading as={"h3"} fontSize={24}>
          All posted jobs
        </Heading>
        <Button as={Link} to={"/jobposts/create/job"}>
          Create new
        </Button>
      </Flex>
      <Stack gap={4} my={8}>
        {jobposted.length > 0 &&
          jobposted.map((item, ind) => (
            <Flex
              justifyContent={"space-between"}
              key={ind}
              textOverflow={"ellipsis"}
              _hover={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
              boxShadow={"lg"}
              px={12}
              py={6}
              borderRadius={12}
            >
              <Stack textOverflow={"ellipsis"} gap={4}>
               <Text as={'b'}>ID: {item.id}</Text>
                <Heading as={"h4"} fontSize={20}>
                  {item.job_title}
                </Heading>

                <Flex gap={4}>
                  <Text>Graduation: {item.graduation || "None"}</Text>
                  <Text>Post Graduation: {item.postgraduation || "None"}</Text>
                </Flex>
                <Text>Required Skills: {item.required_skills}</Text>
                <Text>Prefered Skills: {item.prefered_skills}</Text>
                <Text>Department: {item.department}</Text>
                <Text>Experience: {item.experience}</Text>
                <Text>Location: {item.location}</Text>
                <Flex gap={2}>
                  <Text>{item.employment_type}</Text>|
                  <Text as={"i"}>Openings: {item.openings}</Text>
                </Flex>
              </Stack>
              <Flex flexDir={"column"} justifyContent={"space-between"}>
                <Text as={"b"} color={"brand.130"}>
                  Expected Salary: {item.salary}
                </Text>
                <Stack gap={4}>
                  <Button
                    colorScheme="green"
                    as={Link}
                    to={`/jobposts/${item.id}/applications`}
                  >
                    View applications
                  </Button>
                  <Button onClick={() => handleEdit(item.id)}>Edit</Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </Flex>
            </Flex>
          ))}
        {jobposted.length === 0 && (
          <Box textAlign={"center"} my={24}>
            <Text as={"i"}>
              Start finding new telent by click on{" "}
              <Text
                as={"span"}
                p={2}
                borderRadius={12}
                fontWeight={"bold"}
                bgColor={"brand.300"}
              >
                Create new
              </Text>{" "}
              button.
            </Text>
          </Box>
        )}
      </Stack>

      <Drawer
        isOpen={isOpen}
        placement="bottom"
        size={"full"}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            Edit <Text as={"b"}>{editPost.job_title} </Text>job post!
          </DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit}>
              <Stack gap={4} w={"80vw"} m={"auto"}>
                <InputDesign
                  ids={"title"}
                  name={"Title"}
                  types={"text"}
                  values={editPost.job_title}
                  placeholderValue="Ex. Full Stack Developer"
                ></InputDesign>
                <InputDesign
                  ids={"salary"}
                  name={"Salary"}
                  types={"number"}
                  values={editPost.salary}
                  placeholderValue="Ex. 500000"
                  helperText={"Expected salary in INR"}
                ></InputDesign>
                <InputDesign
                  ids={"department"}
                  values={editPost.department}
                  name={"Department"}
                  types={"text"}
                  placeholderValue="Ex. Software enginerinng"
                ></InputDesign>
                <Flex gap={4}>
                  <InputDesign
                    widths={"fit-content"}
                    ids="skill"
                    req={false}
                    placeholderValue="Required skills for this job"
                    types={"text"}
                    name="Required Skill"
                    helperText={"Add mandatory skills only."}
                  ></InputDesign>
                  <Button onClick={handleAdd} w={"fit-content"}>
                    Add
                  </Button>
                </Flex>

                <Flex gap={4} flexWrap={"wrap"}>
                  {Array.from(skills).map((skill, ind) => (
                    <Flex
                      gap={2}
                      alignItems={"center"}
                      key={ind}
                      px={4}
                      py={2}
                      borderRadius={"full"}
                      border={"1px solid #e60000"}
                    >
                      <Text as={"span"} fontSize={"lg"}>
                        {skill}{" "}
                      </Text>
                      <XCircle
                        id={ind}
                        onClick={(e) => handleDeleteSkills(e.target.id)}
                        style={{ cursor: "pointer" }}
                        size={20}
                        color="#e60000"
                      />
                    </Flex>
                  ))}
                </Flex>
                <Flex mt={6} gap={4}>
                  <InputDesign
                    widths={"fit-content"}
                    ids="prefSkill"
                    req={false}
                    placeholderValue="Preferred skills for this job."
                    types={"text"}
                    name="Preferred Skill"
                  ></InputDesign>
                  <Button onClick={handleAddPref} w={"fit-content"}>
                    Add
                  </Button>
                </Flex>
                <Flex gap={4} flexWrap={"wrap"}>
                  {Array.from(prefSkills).map((skill, ind) => (
                    <Flex
                      gap={2}
                      alignItems={"center"}
                      key={ind}
                      px={4}
                      py={2}
                      borderRadius={"full"}
                      border={"1px solid #e60000"}
                    >
                      <Text as={"span"} fontSize={"lg"}>
                        {skill}{" "}
                      </Text>
                      <XCircle
                        id={ind}
                        onClick={(e) => handleDeletePref(e.target.id)}
                        style={{ cursor: "pointer" }}
                        size={20}
                        color="#e60000"
                      />
                    </Flex>
                  ))}
                </Flex>
                <InputDesign
                  ids={"graduation"}
                  name="Graduation"
                  types={"text"}
                  values={editPost.graduation}
                  placeholderValue="Ex. Btech"
                  helperText={"if required only"}
                  req={false}
                ></InputDesign>
                <InputDesign
                  ids={"postGraduation"}
                  name="Post graduation"
                  types={"text"}
                  values={editPost.postgraduation}
                  placeholderValue="Ex. Mtech"
                  helperText={"if required only"}
                  req={false}
                ></InputDesign>

                <InputDesign
                  ids={"role_category"}
                  name="Role Category"
                  types={"text"}
                  values={editPost.role_category}
                  placeholderValue="Ex. Designer"
                  helperText={"Role category"}
                ></InputDesign>
                <InputDesign
                  ids={"experience"}
                  name="Experience (yearly)"
                  types={"text"}
                  values={editPost.experience}
                  placeholderValue="Ex. 0-1"
                  helperText={"if required only otherwise 0."}
                ></InputDesign>
                <InputDesign
                  ids={"employment_type"}
                  name="Employment type"
                  types={"text"}
                  values={editPost.employment_type}
                  placeholderValue="Ex. Full time"
                  helperText={"Full time, Part time, internship."}
                ></InputDesign>
                <InputDesign
                  ids={"openings"}
                  name="Openings"
                  values={editPost.openings}
                  types={"number"}
                  placeholderValue="Ex. 10"
                  helperText={"Total number of openings"}
                ></InputDesign>

                <InputDesign
                  ids={"location"}
                  name="Location"
                  values={editPost.location}
                  types={"text"}
                  placeholderValue="Ex. Noida, Uttar Pradesh"
                  helperText={"city, state"}
                ></InputDesign>
                <Textarea
                  id="description"
                  value={editPost.description}
                  border={"none !important"}
                  outline={"none !important"}
                  borderRadius={"none"}
                  mb={6}
                  borderBottom={"1px solid black !important"}
                  placeholder="Description. Ex. Developer who can work on robust techonology....."
                ></Textarea>
                <Flex alignItems={"center"} gap={4}>
                  <Button colorScheme="red" onClick={onClose}>
                    Cancel
                  </Button>
                  <ButtonDesign
                    widths="fit-content"
                    types={"submit"}
                    values={"Update"}
                    isLoading={loading}
                  ></ButtonDesign>
                </Flex>
              </Stack>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
