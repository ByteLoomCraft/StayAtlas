import {createBrowserRouter, RouterProvider} from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import Booking from "./pages/Booking"
import Exclusive from "./pages/Exclusive"
import Explore from "./pages/Explore"
import ErrorPage from "./pages/ErrorPage"
import ListYourProperty from "./pages/FooterPage/ListYourProperty";
import AboutUs from "./pages/FooterPage/aboutus";
import TermsAndConditions from "./pages/FooterPage/TermsAndConditions";
import CancellationPolicy from "./pages/FooterPage/CancellationPolicy";
import Chat from "./pages/FooterPage/Chat";
import Privacy from "./pages/FooterPage/Privacy"
import SignupForm from "./pages/Signup"
import Login from "./pages/Login"
import { useDispatch } from "react-redux"
import axios from "./utils/axios"
import { useEffect, useState } from "react"
import { setUser, logout } from "./state/features/authSlice"
import ProtectedRoutes from "./components/ProtectedRoutes"
import Profile from "./pages/Profile"
import ViewExclusive from "./pages/ViewExclusive"
import ExclusiveLayout from "./layout/ExclusiveLayout"
import AdminDashboard from "./pages/AdminDashboard"
import PropertyRequestForm from "./pages/listform"
import AdminProtectedRoute from "./components/AdminProtectedRoute"

function App() {

  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    axios
      .get("/v1/users/getUser")               
      .then((res) => {
        console.log(res.data.user);     
        if (res.data.user) {
          dispatch(setUser(res.data.user));  
        } else {
          dispatch(logout());   
        }
      })
      .catch(() => {
        dispatch(logout());                 
      })
      .finally(() => {
        setAuthChecked(true);               
      });
  }, [dispatch]); 


  if (!authChecked) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#D6AE7B]"></div>
      </div>
    );
  }

  const appRouter = createBrowserRouter([
    {
      path:"/admin",
      element: <AdminProtectedRoute><AdminDashboard/></AdminProtectedRoute>,
      errorElement: <ErrorPage />
    },
    {
      path:"/",
      element:<MainLayout/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          path:"/",
          element:(
            <Home/>
          )
        },
        {
          path:"/signup",
          element:(<SignupForm/>)
        },
        {
          path:"/login",
          element:(<Login/>)
        },
        {
          path:"/list",
          element:(<ProtectedRoutes><PropertyRequestForm/></ProtectedRoutes>)
        },
        {
          path:"/booking/:id",
          element:(<ProtectedRoutes><Booking/></ProtectedRoutes>)
        },
        {
          path:"/profile",
          element:(<ProtectedRoutes><Profile/></ProtectedRoutes>)
        },
        {
          path:"/exclusive",
          element:(<ProtectedRoutes><Exclusive/></ProtectedRoutes>)
        },
        {
          path:"/explore",
          element:(<ProtectedRoutes><Explore/></ProtectedRoutes>)
        },
        {
          path:"/list-your-property",
          element:(<ProtectedRoutes><ListYourProperty/></ProtectedRoutes>)
        },
        {
          path:"/about-us",
          element:(<AboutUs/>)
        },
        {
          path:"/privacy-policy",
          element:(<Privacy/>)
        },
        {
          path:"/terms-and-conditions",
          element:(<TermsAndConditions/>)
        },
        {
          path:"/cancellation-policy",
          element:(<CancellationPolicy/>)
        },
        {
          path:"/chat",
          element:(<Chat/>)
        }
      ]
    },
    {
      path:"/viewExclusive",
      element:(<ExclusiveLayout/>),
      children:[
        {
          path:":id",
          element: (<ProtectedRoutes><ViewExclusive/></ProtectedRoutes>)
        }
      ]
       
    },
  ])

  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  )
}

export default App
