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
import { useState } from "react";
import { SUBMIT_QUIZ_API } from "@/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const initialQuestion = {
     question: "",
     answer: 0,
     options: [
          { value: "", id: 1 },
          { value: "", id: 2 },
          { value: "", id: 3 },
          { value: "", id: 4 },
     ],
};

const OPTIONS = [
     { text: "option 1", value: 1 },
     { text: "option 2", value: 2 },
     { text: "option 3", value: 3 },
     { text: "option 4", value: 4 },
];


export function AddQuiz() {
     const [title, settitle] = useState("");
     const [description, setDescription] = useState("");
     const [questions, setquestions] = useState([initialQuestion]);
     const navigate = useNavigate()
     const { token } = useSelector(state => state.auth)
     // console.log({questions})

     const handleChange = (index, value) => {
          let newQuestions = [...questions];
          newQuestions[index] = { ...newQuestions[index], ...value };
          console.log(newQuestions);
          setquestions(newQuestions);
     };

     const handleOptionChange = (index, value) => {
          let newQuestions = [...questions];
          newQuestions[index] = { ...newQuestions[index], options: value };
          console.log(newQuestions, value, index);
          setquestions(newQuestions);
     };

     const addQuestion = () => {
          setquestions([...questions, {
               question: "",
               answer: 0,
               options: [
                    { value: "", id: 1 },
                    { value: "", id: 2 },
                    { value: "", id: 3 },
                    { value: "", id: 4 },
               ],
          }]);
     };

     const ResetQuiz = () => {
          setDescription('')
          settitle('')
          setquestions([initialQuestion]);

     };


     const submitQuiz = async (e) => {
          e.preventDefault()
          if(!title){
               return alert('please enter quiz title')
          }
       for (let i = 0; i < questions.length; i++) {
          const que = questions[i];
          if(!que.question   | !que?.options[0]?.value   | !que?.options[0]?.value   | !que?.options[0]?.value   | !que?.options[0]?.value   | !que?.answer ){
               alert('to submit quiz please fil all the fields')
               break
          }
          
       }
          try {
               const res = await axios.post(SUBMIT_QUIZ_API, {
                    token,
                    title,
                    description,
                    questions
               })
               if (res.data) {
  console.log(res?.data)
                    // setDescription('')
                    // settitle('')
                    // setquestions([initialQuestion]);
                    navigate("/home")
               }
          } catch (err) {
               console.log(err, err.response.data.msg)
          }


     };


     return (
          <div className="mt-12 mb-8 mr-5 flex flex-col gap-12">
               <Card>
                    <CardHeader
                         variant="gradient"
                         color="orange"
                         className="mb-8 flex flex-row items-center justify-between p-6"
                    >
                         <Typography variant="lead" color="white">
                              Add Quiz
                         </Typography>
                    </CardHeader>
               </Card>

               <Card>
                    <div className="px-10 py-10">
                         <div className="">
                              <Input
                                   value={title}
                                   placeholder="Enter Title"
                                   onChange={(evt) => settitle(evt.target.value)}
                                   onchan
                                   size="lg"
                                   variant="static"
                                   label="Title"
                                   className="mb-5"
                              />
                         </div>
                         <div className="pt-8">
                              <Input
                                   value={description}
                                   placeholder="Enter Title"
                                   onChange={(evt) => setDescription(evt.target.value)}
                                   size="lg"
                                   variant="static"
                                   label="Description"
                                   className="mb-5"
                              />
                         </div>

                         {/* <div className="w-72 pt-8">
                              <Select label="Select Version">
                                   <Option>Material Tailwind HTML</Option>
                                   <Option>Material Tailwind React</Option>
                                   <Option>Material Tailwind Vue</Option>
                                   <Option>Material Tailwind Angular</Option>
                                   <Option>Material Tailwind Svelte</Option>
                              </Select>
                         </div> */}
                    </div>
               </Card>
               {questions.map((Ques, index) => {
                    return (
                         <Question
                              key={index}
                              index={index}
                              handleOptionChange={handleOptionChange}
                              Question={Ques}
                              handleChange={handleChange}
                         />
                    );
               })}

               <div className="flex w-full items-end justify-center gap-4">
                    <Button
                         onClick={addQuestion}
                         size="lg"
                         color="orange"
                         variant="gradient"
                    >
                         Add Question
                    </Button>
                    <Button onClick={ResetQuiz} size="lg" color="red" variant="gradient">
                         Reset Quiz
                    </Button>

                    <Button
                         onClick={submitQuiz}
                         size="lg" color="green" variant="gradient">
                         Submit Quiz
                    </Button>
               </div>
          </div>
     );
}

const Question = ({ index, Question, handleOptionChange, handleChange }) => {
     return (
          <>
               <Card>
                    <div className=" px-10 py-10 pt-5">
                         <div className="flex items-center">
                              <div class="w-3/4">
                                   <Input
                                        size="lg"
                                        name="question"
                                        value={Question?.question}

                                        onChange={(evt) =>
                                             handleChange(index, { question: evt.target.value })
                                        }
                                        variant="static"
                                        label={`Question No ${index + 1}?`}
                                        className="mb-5"
                                        placeholder="Question"
                                   />
                              </div>
                              <div className="flex w-1/3  justify-end pb-12  ">
                                   <i className="fas fa-close cursor-pointer text-2xl text-red-500" />
                              </div>
                         </div>
                         <div className="flex py-8">
                              <div class="mr-8 w-1/2">
                                   <Input
                                        size="lg"
                                        variant="static"
                                        value={Question?.options[0]?.value}

                                        onChange={(evt) => {
                                             Question.options[0] = { value: evt.target.value, id: 1 }
                                             handleOptionChange(index, Question.options)
                                        }}
                                        label="Option 1?"
                                        className="mb-5 "
                                        placeholder="write option"
                                   />
                              </div>
                              <div class="mr-8 w-1/2">
                                   <Input
                                        size="lg"
                                        variant="static"
                                        value={Question?.options[1]?.value}

                                        onChange={(evt) => {
                                             Question.options[1] = { value: evt.target.value, id: 2 }
                                             handleOptionChange(index, Question.options)
                                        }}
                                        label="Option 2?"
                                        className="mb-5"
                                        placeholder="write option"
                                   />
                              </div>
                         </div>
                         <div className="flex py-8">
                              <div class="mr-8 w-1/2">
                                   <Input
                                        size="lg"
                                        variant="static"
                                        value={Question?.options[2]?.value}
                                        onChange={(evt) => {
                                             Question.options[2] = { value: evt.target.value, id: 3 }
                                             handleOptionChange(index, Question.options)
                                        }}
                                        label="Option 3?"
                                        className="mb-5 "
                                        placeholder="write option"
                                   />
                              </div>
                              <div class="mr-8 w-1/2">
                                   <Input
                                        size="lg"
                                        variant="static"
                                        value={Question?.options[3]?.value}

                                        onChange={(evt) => {
                                             Question.options[3] = { value: evt.target.value, id: 4 }
                                             handleOptionChange(index, Question.options)
                                        }}
                                        label="Option 4?"
                                        className="mb-5"
                                        placeholder="write option"
                                   />
                              </div>
                         </div>

                         <div className="w-72 pt-8">
                              <Select
                                   value={Question.answer}
                                   onChange={(value) => {
                                        console.log('', value)
                                        handleChange(index, { answer: value })
                                   }} label="Select Answer" >
                                   {OPTIONS.map((item, i) => <Option value={item.value} >{item.text}</Option>)}
                              </Select>
                         </div>
                    </div>
               </Card>
          </>
     );
};

export default AddQuiz;
