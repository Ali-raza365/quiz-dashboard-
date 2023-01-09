import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { dispatchGetUser, dispatchLogin, fetchUser } from "./redux/actions/authAction";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const {token} = useSelector(state => state.auth)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin(token))
        return fetchUser(token).then(res => {
          console.log(res.data)
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  },[auth.isLogged, dispatch])


  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />}/>
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}




export default App;
