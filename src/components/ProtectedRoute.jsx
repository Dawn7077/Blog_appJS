import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({children}){
    const {currentUser} = useAuth() //i dont know how we will get currentuser from this cus its just ruunning useContext(AuthContext) its prop sent value which has currentuser from authProvider 
    if(!currentUser){
        return <Navigate to='/login' replace/>
    }
    return children
    
}

export default ProtectedRoute