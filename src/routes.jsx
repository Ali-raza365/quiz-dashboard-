import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  UserGroupIcon,
  NewspaperIcon,
  QuestionMarkCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { AddQuiz, Quizzes } from "./pages/quiz";

const icon = {
  className: "w-5 h-5 text-inherit",
};



export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "user",
        path: "/user",
        element: <Tables />,
      },
      {
        icon: <NewspaperIcon {...icon} />,
        name: "result",
        path: "/results",
        element: <Tables />,
      },
     
    
    ],
  },
  {
    title: "Quiz",
    layout: "dashboard",
    pages: [
      {
        icon: <PlusCircleIcon {...icon} />,
        name: "Add Quiz",
        path: "/add-quiz",
        element: <AddQuiz />,
      },
      {
        icon: <QuestionMarkCircleIcon {...icon} />,
        name: "Quizzes",
        path: "/Quizzes",
        element: <Quizzes />,
      },
    ],
  },
  {
    title: "Settings",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Log out",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
