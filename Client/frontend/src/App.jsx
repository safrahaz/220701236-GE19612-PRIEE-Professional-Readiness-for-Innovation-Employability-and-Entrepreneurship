import React from 'react'
import routes from './Routing/Routes';
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createBrowserRouter,RouterProvider } from 'react-router-dom'
function App() {
  let router=createBrowserRouter(routes)
  return <>
    <RouterProvider router={router}/>
    <Toaster/>
  </>
}

export default App