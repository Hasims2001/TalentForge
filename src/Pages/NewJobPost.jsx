import {Box, Button, Flex, Heading, Stack, Text, Textarea} from '@chakra-ui/react'
import { InputDesign } from '../Components/InputDesign'
import { useState } from 'react'
import { ButtonDesign } from '../Components/ButtonDesign'
import { XCircle } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
export const NewJobPost = () => {
  const {loading, message} = useSelector(store=> store.Auth)
  const [skills, setSkills] = useState(new Set())
  const [prefSkills, setPrefSkills] = useState(new Set())
  const dispatch = useDispatch()
  const handleAdd = ()=>{
    let curr = document.querySelector("#skill").value
    if(curr !== "" && curr !== " "){
      const newSkillsSet = new Set([...skills, curr.toLowerCase()]);
        setSkills(newSkillsSet)
    }
  }
  console.log(skills)

  const handleAddPref = ()=>{
    let curr = document.querySelector("#prefSkill").value
    if(curr !== "" && curr !== " "){
      const newSkillsSet = new Set([...prefSkills, curr.toLowerCase()])
      setPrefSkills(newSkillsSet)
    }
  }
  const handleDelete  = (id)=>{
    let filtered = new Set(Array.from(skills).filter((ele, index)=>{
        return index !== +id
    }))
    setSkills(filtered)
  }

  const handleDeletePref = (id)=>{
    let filtered = new Set(Array.from(prefSkills).filter((ele, index)=>{
      return index !== +id
    }))
    setPrefSkills(filtered)
  }
  const handleSubmit = (e)=>{
   e.preventDefault()
    let title = e.target.title.value
    let salary = e.target.salary.value
    let department = e.target.department.value
    let description = e.target.description.value
    


  }
  return (
    <Box>
     <Box my={12}>
     <Heading>Add new job post</Heading>
      <Text as={'i'}>Get talent employee!</Text>
     </Box>
        <form onSubmit={handleSubmit}>
      <Stack gap={4} w={"80vw"} m={"auto"}>
          <InputDesign ids={"title"} name={"Title"} types={"text"} placeholderValue='Ex. Full Stack Developer'></InputDesign>
          <InputDesign ids={"salary"} name={"Salary"} types={"number"} placeholderValue='Ex. 500000 (Expected salary)'></InputDesign>
          <InputDesign ids={"department"} name={"Department"} types={"text"} placeholderValue='Ex. Software enginerinng'></InputDesign>
        <Flex gap={4}>
        <InputDesign widths={"fit-content"} ids="skill" req={false} placeholderValue='Required skills for this job' types={'text'} name="Required Skill" helperText={"Add mandatory skills only."}></InputDesign>
            <Button  onClick={handleAdd} w={"fit-content"}>Add</Button>
        </Flex>
          
            <Flex gap={4} flexWrap={"wrap"}>
                {
                   Array.from(skills).map((skill, ind)=>(
                        <Flex   gap={2} alignItems={'center'} key={ind} p={2} borderRadius={'full'} border={"1px solid #e60000"}>
                        <Text as={'span'} fontSize={"lg"}  >{skill} </Text>
                        <XCircle id={ind} onClick={(e)=>handleDelete(e.target.id)} style={{cursor:'pointer'}} size={20} color="#e60000" />
                        </Flex>
                    ))
                }
            </Flex>
              <Flex mt={6} gap={4}>
              <InputDesign widths={"fit-content"} ids="prefSkill" req={false} placeholderValue='Preferred skills for this job.' types={'text'} name="Preferred Skill"></InputDesign>
            <Button  onClick={handleAddPref} w={"fit-content"}>Add</Button>
          
              </Flex>
            <Flex gap={4} flexWrap={"wrap"}>
                {
                   Array.from(prefSkills).map((skill, ind)=>(
                        <Flex   gap={2} alignItems={'center'} key={ind} p={2} borderRadius={'full'} border={"1px solid #e60000"}>
                        <Text as={'span'} fontSize={"lg"}  >{skill} </Text>
                        <XCircle id={ind} onClick={(e)=>handleDeletePref(e.target.id)} style={{cursor:'pointer'}} size={20} color="#e60000" />
                        </Flex>
                    ))
                }
            </Flex>
          <Textarea id='description' border={"none !important"} outline={'none !important'} borderRadius={"none"} borderBottom={"1px solid black !important"}  placeholder='Description. Ex. Developer who can work on robust techonology.....'></Textarea>
        <ButtonDesign widths='fit-content' types={"submit"} values={"Submit"} isLoading={loading} ></ButtonDesign>
      </Stack>
        </form>
    </Box>
  )
}
