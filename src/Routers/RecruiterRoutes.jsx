import {useSelector} from "react-redux"
import {useToast} from "@chakra-ui/react"
import { Navigate  } from "react-router-dom";
export const RecruiterRoutes = ({children}) => {
    const { role} = useSelector(store=> store.Auth) 
    const toast = useToast()
    if(role === "Recruiter"){
        return children
    }else{
        toast({
            position: "bottom-right",
            title:"Not authorize to access this page.",
            status: "error",
            duration: 9000,

        })
        return<Navigate to={"/"}  replace />
    }
}
