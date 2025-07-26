import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home.jsx'
import Predict from './components/Predict.jsx'
import Signup from './Auth/Signup.jsx'
import App from './App.jsx'

// const router = createBrowserRouter(
//   createRoutesFromElements(
//   <Route path='/' element={<Layout />}>
//     <Route path='' element={<Home />} />
//     <Route path='/prediction' element={<Predict />} />
//     <Route path='/signup' element={<Signup />}/>
//   </Route>
//   )
// )

createRoot(document.getElementById('root')).render(
  <StrictMode>
   {/* <RouterProvider router={router} /> */}
   <App />
  </StrictMode>,
)
