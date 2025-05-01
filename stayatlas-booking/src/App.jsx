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

function App() {

  const appRouter = createBrowserRouter([{
    path:"/",
    element:<MainLayout/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path:"/",
        element:(<Home/>)
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
        path:"/booking",
        element:(<Booking/>)
      },
      {
        path:"/exclusive",
        element:(<Exclusive/>)
      },
      {
        path:"/explore",
        element:(<Explore/>)
      },
      {
        path:"/list-your-property",
        element:(<ListYourProperty/>)
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
  }])

  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  )
}

export default App
