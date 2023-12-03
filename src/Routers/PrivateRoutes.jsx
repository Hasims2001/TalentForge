import {useSelector} from "react-redux"
import { Navigate, useLocation  } from "react-router-dom";
export const PrivateRoutes = ({children}) => {
    const location = useLocation()
    const {user} = useSelector(store=> store.Auth) 
    if(user.name){
        return children
    }
    return<Navigate to={"/login"} state={{from: location}} replace />
}
