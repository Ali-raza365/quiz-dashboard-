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
   } from "@material-tailwind/react";
   import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
   import { authorsTableData, projectsTableData } from "@/data";
   
   export function Quizzes() {
     return (
       <div className="mt-12 mb-8 flex flex-col gap-12">
         <Card>
           <CardHeader
             variant="gradient"
             color="orange"
             className="mb-8 p-6 flex flex-row justify-between items-center"
           >
             <Typography variant="lead" color="white">
             Curated Quizzes
             </Typography>
             <IconButton color="amber">
               <i className="fas fa-plus text-lg" />
             </IconButton>
           </CardHeader>
           <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
             <table className="w-full min-w-[640px] table-auto">
               <thead>
                 <tr>
                   {["author", "function", "status", "employed", ""].map((el) => (
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
                 {authorsTableData.map(
                   ({ img, name, email, job, online, date }, key) => {
                     const className = `py-3 px-5 ${key === authorsTableData.length - 1
                         ? ""
                         : "border-b border-blue-gray-50"
                       }`;
   
                     return (
                       <tr key={name}>
                         <td className={className}>
                           <div className="flex items-center gap-4">
                             <Avatar src={img} alt={name} size="sm" />
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
                           <Typography className="text-xs font-semibold text-blue-gray-600">
                             {job[0]}
                           </Typography>
                           <Typography className="text-xs font-normal text-blue-gray-500">
                             {job[1]}
                           </Typography>
                         </td>
                         <td className={className}>
                           <Chip
                             variant="gradient"
                             color={online ? "green" : "blue-gray"}
                             value={online ? "online" : "offline"}
                             className="py-0.5 px-2 text-[11px] font-medium"
                           />
                         </td>
                         <td className={className}>
                           <Typography className="text-xs font-semibold text-blue-gray-600">
                             {date}
                           </Typography>
                         </td>
                         <td className={className}>
                           <Menu>
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
                           </Menu>
                         </td>
                       </tr>
                     );
                   }
                 )}
               </tbody>
             </table>
           </CardBody>
         </Card>
       </div>
     );
   }
   
   export default Quizzes;
  