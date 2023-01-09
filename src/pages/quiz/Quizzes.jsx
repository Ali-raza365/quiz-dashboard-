import {
     Card,
     CardHeader,
     CardBody,
     Typography,
     Avatar,
     Chip,
     Tooltip,
     Progress,
     Menu,
     MenuHandler,
     MenuItem,
     MenuList,
     IconButton,
     Button,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DELETE_QUIZ, GET_ALL_QUIZZES } from "@/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Quizzes() {
     const { token } = useSelector((state) => state.auth);
     const [quizzes, setquizzes] = useState([]);
     const navigate = useNavigate()



     const getQuizzes = async () => {
          try {
               const res = await axios(GET_ALL_QUIZZES, {
                    token,
               });
               if (res.data) {
                    setquizzes(res?.data || []);
                    console.log(res?.data);
               }
          } catch (err) {
               console.log(err);
          }
     };

     const deleteQuiz = async (quizId) => {

          if (confirm("Are you sure want to delete this quiz") == true) {
               try {
                    const res = await axios.post(DELETE_QUIZ, {
                         token,
                         quizId
                    });
                    if (res.data) {
                         getQuizzes()
                    }
               } catch (err) {
                    console.log(err);
               }
          } else {

          }

     }

     const EditQuiz = async (quizId) => {
          navigate('/dashboard/add-quiz',{ replace: true })
          console.log(navigate)
     }

     useEffect(() => {
          if (token) {
               getQuizzes();
          }
     }, []);

     return (
          <div className="mt-12 mb-8 flex flex-col gap-12">
               <Card>
                    <CardHeader
                         variant="gradient"
                         color="orange"
                         className="mb-8 flex flex-row items-center justify-between p-6"
                    >
                         <Typography variant="lead" color="white">
                              Created Quizzes
                         </Typography>
                         <IconButton
                              onClick={() => { navigate('/dashboard/add-quiz',{ replace: true }) }}
                              color="amber">
                              <i className="fas fa-plus text-lg text-white" />
                         </IconButton>
                    </CardHeader>
                    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                         <table className="w-full min-w-[640px] table-auto">
                              <thead>
                                   <tr>
                                        {["author", "participated", "date", "Action"].map((el) => (
                                             <th
                                                  key={el}
                                                  className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                             >
                                                  <Typography
                                                       variant="small"
                                                       className="text-[11px] font-bold uppercase text-blue-gray-400"
                                                  >
                                                       {el}
                                                  </Typography>
                                             </th>
                                        ))}
                                   </tr>
                              </thead>
                              <tbody>
                                   {quizzes?.map((item, index) => {
                                        const className = `py-3 px-5 ${index === quizzes.length - 1
                                             ? ""
                                             : "border-b border-blue-gray-50"
                                             }`;

                                        return (
                                             <tr key={index}>
                                                  <td className={className}>
                                                       <div className="flex items-center gap-4">
                                                            <Avatar src={item?.icon} alt={name} size="sm" />
                                                            <div>
                                                                 <Typography
                                                                      variant="small"
                                                                      color="blue-gray"
                                                                      className="font-semibold"
                                                                 >
                                                                      {item?.title}
                                                                 </Typography>
                                                                 <Typography className="text-xs font-normal text-blue-gray-500">
                                                                      {item?.description}
                                                                 </Typography>
                                                            </div>
                                                       </div>
                                                  </td>

                                                  <td className={className}>
                                                       <Chip
                                                            variant="gradient"
                                                            color={"green"}
                                                            value={item?.participated}
                                                            className="py-0.5 px-2 text-[11px] font-medium"
                                                       />
                                                  </td>
                                                  <td className={className}>
                                                       <Typography className="text-xs font-semibold text-blue-gray-600">
                                                            {new Date(item?.createdAt)?.toDateString()}
                                                       </Typography>
                                                  </td>
                                                  <td className={className}>
                                                       <Button
                                                            onClick={() => { deleteQuiz(item?._id) }}
                                                            color="red"
                                                            size="sm"
                                                            className="py-1 px-2 text-[11px] font-medium"
                                                       >Delete</Button>
                                                       <Button
                                                         onClick={() => { EditQuiz(item?._id) }}
                                                            size="md"
                                                            className=" py-1 px-2 ml-3 text-[11px] font-medium "
                                                       >Edit</Button>
                                                       {/* <Menu placement="left-end">
                                                            <MenuHandler>
                                                                 <Typography
                                                                      as="a"
                                                                      href="#"
                                                                      className="text-xs font-semibold text-blue-gray-600"
                                                                 >
                                                                      <EllipsisVerticalIcon
                                                                           strokeWidth={2}
                                                                           className="h-5 w-5 text-inherit"
                                                                      />
                                                                 </Typography>
                                                            </MenuHandler>
                                                            <MenuList>
                                                                 <MenuItem>Edit</MenuItem>
                                                                 <MenuItem>Delete</MenuItem>
                                                            </MenuList>
                                                       </Menu> */}
                                                  </td>
                                             </tr>
                                        );
                                   })}
                              </tbody>
                         </table>
                    </CardBody>
               </Card>
          </div>
     );
}

export default Quizzes;
