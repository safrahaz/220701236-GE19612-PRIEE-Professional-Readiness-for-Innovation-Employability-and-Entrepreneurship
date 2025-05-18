import Login from "../Components/Login";
import Signup from "../Components/Signup";
import Dashboard from "../Components/Dashboard";
import Addfood from "../Components/Addfood";
import Lunch from "../Components/Lunch";
import Dinner from "../Components/Dinner";
import Cart from "../Components/Cart";
import Order from "../Components/Order";
import Reports from "../Components/Reports";
const routes=[
        {
            path:'/',
            element:<><Login/></>
        },
        {
            path:'/signup',
            element:<><Signup/></>
        },
        {
            path:'/Dashboard',
            element:<><Dashboard/></>
        },
        {
            path:'/Lunch',
            element:<><Lunch/></>
        },
        {
            path:'/Dinner',
            element:<><Dinner/></>
        },
        {
            path:'/Addfood',
            element:<><Addfood/></>
        },
        {
            path:'/Cart',
            element:<><Cart/></>
        },
        {
            path:'/Orders',
            element:<><Order/></>
        },
        {
            path:'/Reports',
            element:<><Reports/></>
        }

]
export default routes;