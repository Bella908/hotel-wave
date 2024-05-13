import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './Layout/Root';
import Home from './Home/Home/Home';
import LogIn from './Users/LogIn';
import AuthProvider from './AuthProvider/AuthProvider';
import Register from './Users/Register';
import Rooms from './Home/Rooms/Rooms';
import RoomDetails from './Home/Rooms/RoomDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Root></Root>,
    children:[
      {
        
          path:'/',
          element:<Home></Home>,
      
      },
      {
        
          path:'/login',
          element:<LogIn></LogIn>,
      
      },
      {
        
          path:'/register',
          element:<Register></Register>,
      
      },
      {
        
          path:'/rooms',
          element:<Rooms></Rooms>,
          loader: () => fetch('http://localhost:5000/rooms'),
      
      },
      {
        
          path:'/rooms/:id',
          element:<RoomDetails></RoomDetails>,
          loader: ({params}) => fetch(`http://localhost:5000/rooms/${params.id}`),
      
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className=''>
  <React.StrictMode>
 <AuthProvider>
 <RouterProvider router={router} />
 </AuthProvider>
</React.StrictMode>,
</div>
)
