import {
     Card,
     CardHeader,
     CardBody,
     Typography,
     Input,
     Avatar,
     Chip,
     Tooltip,
     Progress,
     Menu,
     MenuHandler,
     MenuItem,
     MenuList,
     IconButton,
     Select,
     Option,
     Button,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";

const Question = () => {
     return (
          <>
               <Card>
                    <div className=" px-10 py-10">
                         <div className="flex items-center">
                              <div class="w-3/4">
                                   <Input size="lg" variant="static" label="Question?" className="mb-5" placeholder="Question" />
                              </div>
                              <div className="items-center justify-end w-1/3 gap-4 flex ">
                                   <Button size="sm" variant="gradient">Add Option</Button>
                                   <i className="cursor-pointer fas text-3xl text-red-500 fa-minus-circle" />
                              </div>
                         </div>
                         <div className="flex py-8">
                              <div class="w-1/2 mr-8">
                                   <Input size="lg" variant="static" label="Option 1?" className="mb-5 " placeholder="write option" />
                              </div>
                              <div class="w-1/2 mr-8">
                                   <Input size="lg" variant="static" label="Option 2?" className="mb-5" placeholder="write option" />
                              </div>
                         </div>
                         <div className="flex py-8">
                              <div class="w-1/2 mr-8">
                                   <Input size="lg" variant="static" label="Option 3?" className="mb-5 " placeholder="write option" />
                              </div>
                              <div class="w-1/2 mr-8">
                                   <Input size="lg" variant="static" label="Option 4?" className="mb-5" placeholder="write option" />
                              </div>



                         </div>

                         <div className="w-72 pt-8">
                              <Select label="Select Answer">
                                   <Option>Material Tailwind HTML</Option>
                                   <Option>Material Tailwind React</Option>
                                   <Option>Material Tailwind Vue</Option>
                                   <Option>Material Tailwind Angular</Option>
                                   <Option>Material Tailwind Svelte</Option>
                              </Select>
                         </div>
                    </div>
               </Card>

          </>
     )
}

export function AddQuiz() {
     return (
          <div className="mt-12 mb-8 flex flex-col gap-12 mr-5">
               <Card>
                    <CardHeader
                         variant="gradient"
                         color="orange"
                         className="mb-8 p-6 flex flex-row justify-between items-center"
                    >
                         <Typography variant="lead" color="white">
                              Add Quiz
                         </Typography>
                    </CardHeader>
               </Card>

               <Card>
                    <div className="px-10 py-10">
                         <div className="">
                              <Input size="lg" variant="static" label="Title" className="mb-5" placeholder="Static" />
                         </div>
                         <div className="pt-8">
                              <Input size="lg" variant="static" label="Description" className="mb-5" placeholder="Static" />
                         </div>

                         <div className="w-72 pt-8">
                              <Select label="Select Version">
                                   <Option>Material Tailwind HTML</Option>
                                   <Option>Material Tailwind React</Option>
                                   <Option>Material Tailwind Vue</Option>
                                   <Option>Material Tailwind Angular</Option>
                                   <Option>Material Tailwind Svelte</Option>
                              </Select>
                         </div>
                    </div>
               </Card>
               <Question />
               <Question />
               <Question />
               <div className="flex w-full items-end gap-4 justify-center">
                    <Button size="lg" color="orange" variant="gradient">Add Question</Button>
                    <Button size="lg" color="red" variant="gradient">Reset Quiz</Button>
                    <Button size="lg" color="green" variant="gradient">Submit Quiz</Button>
               </div>
          </div>
     );
}

export default AddQuiz;
