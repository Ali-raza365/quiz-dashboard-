import { DELETE_USER, GET_ALL_USERS } from "@/api";
import { authorsTableData } from "@/data";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function Users() {
  const { token } = useSelector((state) => state.auth);
  const [users, setusers] = useState([]);
  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const res = await axios(GET_ALL_USERS, {
        token,
      });
      if (res.data) {
        setusers(res?.data || []);
        console.log(res?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (quizId) => {
    if (confirm("Are you sure want to delete this user") == true) {
      try {
        const res = await axios.post(DELETE_USER, {
          token,
          quizId,
        });
        if (res.data) {
          getAllUsers();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
    }
  };

  useEffect(() => {
    if (token) {
      getAllUsers();
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
            User Table
          </Typography>
          <IconButton color="amber">
            <i className="fas fa-plus text-lg" />
          </IconButton>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["No", "author", "status", "Date", ""].map((el) => (
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
              {users.map(({ _id, name, email, createdAt }, key) => {
                const className = `py-3 px-5 ${
                  key === authorsTableData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;
                return (
                  <tr key={_id}>
                    <td className={className}>
                      <div className="flex items-center  gap-4">
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {key + 1}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {name}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>

                    <td className={className}>
                      <Chip
                        variant="gradient"
                        color={"green"}
                        value={"online"}
                        className="py-0.5 px-2 text-[11px] font-medium"
                      />
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {new Date(createdAt)?.toDateString()}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Button
                        onClick={() => {
                          deleteUser(_id);
                        }}
                        color="red"
                        size="sm"
                        className="py-1 px-2 text-[11px] font-medium"
                      >
                        Delete
                      </Button>
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

export default Users;
{
  /* <Card>
   <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
     <Typography variant="h6" color="white">
       Projects Table
     </Typography>
   </CardHeader>
   <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
     <table className="w-full min-w-[640px] table-auto">
       <thead>
         <tr>
           {["companies", "members", "budget", "completion", ""].map(
             (el) => (
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
             )
           )}
         </tr>
       </thead>
       <tbody>
         {projectsTableData.map(
           ({ img, name, members, budget, completion }, key) => {
             const className = `py-3 px-5 ${
               key === projectsTableData.length - 1
                 ? ""
                 : "border-b border-blue-gray-50"
             }`;
   
             return (
               <tr key={name}>
                 <td className={className}>
                   <div className="flex items-center gap-4">
                     <Avatar src={img} alt={name} size="sm" />
                     <Typography
                       variant="small"
                       color="blue-gray"
                       className="font-bold"
                     >
                       {name}
                     </Typography>
                   </div>
                 </td>
                 <td className={className}>
                   {members.map(({ img, name }, key) => (
                     <Tooltip key={name} content={name}>
                       <Avatar
                         src={img}
                         alt={name}
                         size="xs"
                         variant="circular"
                         className={`cursor-pointer border-2 border-white ${
                           key === 0 ? "" : "-ml-2.5"
                         }`}
                       />
                     </Tooltip>
                   ))}
                 </td>
                 <td className={className}>
                   <Typography
                     variant="small"
                     className="text-xs font-medium text-blue-gray-600"
                   >
                     {budget}
                   </Typography>
                 </td>
                 <td className={className}>
                   <div className="w-10/12">
                     <Typography
                       variant="small"
                       className="mb-1 block text-xs font-medium text-blue-gray-600"
                     >
                       {completion}%
                     </Typography>
                     <Progress
                       value={completion}
                       variant="gradient"
                       color={completion === 100 ? "green" : "blue"}
                       className="h-1"
                     />
                   </div>
                 </td>
                 <td className={className}>
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
                 </td>
               </tr>
             );
           }
         )}
       </tbody>
     </table>
   </CardBody>
   </Card> */
}
