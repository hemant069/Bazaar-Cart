import { useContext } from "react"
import { Navigate } from "react-router"
import { AuthContext } from "./AuthContex"

export const Private=({children})=>{
const {Auth}=useContext(AuthContext)
console.log(Auth)
if(!Auth.isAuth){
    return <Navigate to="/login" />
}
return children
}
