import { BASE_URL, LOGIN_API } from "@/api";
import { dispatchGetUser, dispatchLogin, fetchUser } from "@/redux/actions/authAction";
import { showErrMsg, showSuccessMsg } from "@/utils/notification/Notification";
// import { showErrMsg, showSuccessMsg } from "@/utils/notification/Notification";
import {
     Card,
     CardHeader,
     CardBody,
     CardFooter,
     Input,
     Checkbox,
     Button,
     Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
     email: '',
     password: '',
     err: '',
     success: ''
}

export function SignIn() {

     const [user, setUser] = useState(initialState)
     const dispatch = useDispatch()
     const history = useNavigate()

     const { email, password, err, success } = user

     const handleChangeInput = e => {
          const { name, value } = e.target
          setUser({ ...user, [name]: value, err: '', success: '' })
     }


     const handleSubmit = async e => {
          e.preventDefault()
          try {
               const res = await axios.post(LOGIN_API, { email, password })
               if (res.data) {
                    console.log(res.data)
                    setUser({ ...user, err: '', success: res.data.msg })
               }
               let token = res?.data?.accesstoken
               dispatch(dispatchLogin(token))
               dispatch(dispatchGetUser({ data: res?.data?.user }))
               let isAdmin = res?.data?.user?.role == 1 ? true : false
               if (isAdmin) {
                    localStorage.setItem('token', token)
                    history("/home")
               } else {
                    alert('You do not have Administrator access')
               }


          } catch (err) {
               console.log(err)
               err.response.data.msg &&
                    setUser({ ...user, err: err.response.data.msg, success: '' })
          }
     }

     return (<>
          <img
               src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
               className="absolute inset-0 z-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
          <div className="container mx-auto p-4">
               <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
                    <CardHeader
                         variant="gradient"
                         color="blue"
                         className="mb-4 grid h-28 place-items-center"
                    >
                         <Typography variant="h3" color="white">
                              Sign In
                         </Typography>
                    </CardHeader>
                    {err && showErrMsg(err)}
                    {success && showSuccessMsg(success)}
                    <CardBody className="flex flex-col gap-4">
                         <Input id="email" value={email} name="email" onChange={handleChangeInput} type="email" label="Email" size="lg" />
                         <Input type="password" id="password"
                              value={password} name="password" onChange={handleChangeInput} label="Password" size="lg" />

                         <div className="-ml-2.5">
                              <Checkbox label="Remember Me" />
                         </div>
                    </CardBody>
                    <CardFooter className="pt-0">

                         <Button variant="gradient" fullWidth
                              onClick={handleSubmit}
                         >
                              Sign In
                         </Button>

                    </CardFooter>
               </Card>
          </div>
     </>
     );
}

export default SignIn;


// import { useHistory } from 'react-router-dom'; // version 5.2.0
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Input,
//   Checkbox,
//   Button,
//   Typography,
// } from "@material-tailwind/react";
// import { dispatchLogin } from "@/redux/actions/authAction";
// import { showErrMsg, showSuccessMsg } from "@/utils/notification/Notification";
// import { useDispatch } from "react-redux";
// import axios from 'axios';

// const initialState = {
//   email: '',
//   password: '',
//   err: '',
//   success: ''
// }

// export function SignIn() {

//   const [user, setUser] = useState(initialState)
//     const dispatch = useDispatch()
//     // const history = useHistory()

//     const {email, password, err, success} = user

//     const handleChangeInput = e => {
//         const {name, value} = e.target
//         setUser({...user, [name]:value, err: '', success: ''})
//     }


//     const handleSubmit = async e => {
//         e.preventDefault()
//         try {
//             const res = await axios.post('/user/login', {email, password})
//             setUser({...user, err: '', success: res.data.msg})

//             localStorage.setItem('firstLogin', true)

//             dispatch(dispatchLogin())
//             // history.push("/")

//         } catch (err) {
//             err.response.data.msg && 
//             setUser({...user, err: err.response.data.msg, success: ''})
//         }
//     }


//   return (
//     <>
//       <img
//         src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
//         className="absolute inset-0 z-0 h-full w-full object-cover"
//       />
//       <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
//       <div className="container mx-auto p-4">
//         <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
//           <CardHeader
//             variant="gradient"
//             color="blue"
//             className="mb-4 grid h-28 place-items-center"
//           >
//             <Typography variant="h3" color="white">
//               Sign In
//             </Typography>
//           </CardHeader>
//           {err && showErrMsg(err)}
//           {success && showSuccessMsg(success)}
//           <CardBody className="flex flex-col gap-4">
//             <Input  placeholder="Enter email address" id="email"  value={email} name="email" onChange={handleChangeInput} type="email" label="Email" size="lg" />
//             <Input type="password" placeholder="Enter password" id="password"
//                     value={password} name="password" onChange={handleChangeInput} label="Password" size="lg" />
//             <div className="-ml-2.5">
//               <Checkbox label="Remember Me" />
//             </div>
//           </CardBody>
//           <CardFooter className="pt-0">
//             {/* <Link to="/home"> */}
//               <Button variant="gradient" fullWidth 
//               onClick={handleSubmit}
//               >
//                 Sign In
//               </Button>
//             {/* </Link> */}
//           </CardFooter>
//         </Card>
//       </div>
//     </>
//   );
// }

// export default SignIn;
