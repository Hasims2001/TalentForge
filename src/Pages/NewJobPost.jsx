import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Textarea,
  useToast
} from "@chakra-ui/react";
import { InputDesign } from "../Components/InputDesign";
import { useEffect, useState } from "react";
import { ButtonDesign } from "../Components/ButtonDesign";
import { XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { postNewJobpost } from "../Redux/RecruiterReducer/action";
import { RESET_RECRUITER } from "../Redux/actionType";
import { useNavigate } from "react-router-dom";
export const NewJobPost = () => {
  const {  token  } = useSelector((store) => store.Auth);
  const { loading, message, error} = useSelector(store=> store.Recruiter)
  const [skills, setSkills] = useState(new Set());
  const [prefSkills, setPrefSkills] = useState(new Set());
  const dispatch = useDispatch();
  const toast = useToast()
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
      dispatch({type: RESET_RECRUITER})
    }
  }, [error])

  useEffect(()=>{
    if(message === "Job posted successfully!"){
      toast({
position: 'bottom-right',
        title: message,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      navigate("/jobposts")
    }
    return ()=>{
      dispatch({type: RESET_RECRUITER})
    }
  }, [message])

  const handleCancel = ()=>{
    navigate("/jobposts")
  }
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
  const handleDelete = (id) => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    let job_title = e.target.title.value;
    let salary = e.target.salary.value;
    let department = e.target.department.value;
    let required_skills = Array.from(skills);
    let prefered_skills = Array.from(prefSkills);
    let graduation = e.target.graduation.value;
    let postgraduation = e.target.postGraduation.value;
    let role_category = e.target.role_category.value;
    let experience = e.target.experience.value;
    let employment_type = e.target.employment_type.value;
    let openings = +e.target.openings.value;
    let location = e.target.location.value;
    let description = e.target.description.value;
    required_skills = required_skills.join(",")
    prefered_skills = prefered_skills.join(",")
    let obj = {
      job_title,
      salary,
      department,
      required_skills,
      prefered_skills,
      graduation,
      postgraduation,
      role_category,
      experience,
      employment_type,
      openings,
      location,
      description,
    }

    dispatch(postNewJobpost(obj, token))
    
  };
  return (
    <Box>
      <Box my={12}>
        <Heading as={'h3'} fontSize={28}>Add new job post</Heading>
        <Text as={"i"}>Get talent employee!</Text>
      </Box>
      <form onSubmit={handleSubmit}>
        <Stack gap={4} w={"80vw"} m={"auto"}>
          <InputDesign
            ids={"title"}
            name={"Title"}
            types={"text"}
            placeholderValue="Ex. Full Stack Developer"
          ></InputDesign>
          <InputDesign
            ids={"salary"}
            name={"Salary"}
            types={"number"}
            placeholderValue="Ex. 500000"
            helperText={"Expected salary in INR"}
          ></InputDesign>
          <InputDesign
            ids={"department"}
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
                  onClick={(e) => handleDelete(e.target.id)}
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
          <InputDesign  ids={"graduation"} name="Graduation" types={'text'} placeholderValue="Ex. Btech" helperText={"if required only"} req={false}></InputDesign>
          <InputDesign  ids={"postGraduation"} name="Post graduation" types={'text'} placeholderValue="Ex. Mtech" helperText={"if required only"} req={false}></InputDesign>
          
          <InputDesign  ids={"role_category"} name="Role Category" types={'text'} placeholderValue="Ex. Designer" helperText={"Role category"}></InputDesign>
          <InputDesign  ids={"experience"} name="Experience (yearly)" types={'text'} placeholderValue="Ex. 0-1" helperText={"if required only otherwise 0."}></InputDesign>
          <InputDesign  ids={"employment_type"} name="Employment type" types={'text'} placeholderValue="Ex. Full time" helperText={"Full time, Part time, internship."}></InputDesign>
          <InputDesign  ids={"openings"} name="Openings" types={'number'} placeholderValue="Ex. 10" helperText={"Total number of openings"}></InputDesign>
          
          <InputDesign  ids={"location"} name="Location" types={'text'} placeholderValue="Ex. Noida, Uttar Pradesh" helperText={"city, state"}></InputDesign>
          <Textarea
            id="description"
            border={"none !important"}
            outline={"none !important"}
            borderRadius={"none"}
            mb={6}
            borderBottom={"1px solid black !important"}
            placeholder="Description. Ex. Developer who can work on robust techonology....."
          ></Textarea>
         <Flex alignItems={'center'} gap={4}>
         <Button colorScheme="red" onClick={handleCancel}>Cancel</Button>
          <ButtonDesign
            widths="fit-content"
            types={"submit"}
            values={"Submit"}
            isLoading={loading}
          ></ButtonDesign>
         </Flex>
        </Stack>
      </form>
    </Box>
  );
};
