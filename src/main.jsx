// import { StrictMode } from "react"
// import { createRoot } from "react-dom/client"
// import "./App.css"
// import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
// import { Provider } from "react-redux"
// import { store } from "./store/stores.js"
// import Layout from "./Layout.jsx"
// import Home from "./components/Home.jsx"
// import Predict from "./components/Predict.jsx"
// import Login from "./components/Auth/Login.jsx"
// import Signup from "./components/Auth/Signup.jsx"
// import Dashboard from "./components/Dashboard/Dashboard.jsx"
// import Profile from "./components/profile/Profile.jsx"
// import ProtectedRoute from "./components/ProtectedRoute.jsx"
// import ForgotPassword from "./components/Auth/ForgotPassword.jsx"
// import ResetPassword from "./components/Auth/ResetPassword.jsx"
// import About from "./components/About.jsx"
// import NotFound from "./components/NotFound.jsx"
// import UnauthorizedPage from "./components/UnauthorizedPage.jsx"
// import DoctorDashboard from "./components/DoctorDashboard.jsx"
// import DoctorSharedPrediction from "./components/DoctorSharedPrediction.jsx"

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Layout />}>
//       {/* Public Routes */}
//       <Route path="" element={<Home />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/reset-password/:token" element={<ResetPassword />} />

//       {/* Semi-Protected Routes */}
//       <Route path="/prediction" element={<Predict />} />

//       {/* Protected User Routes */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/profile"
//         element={
//           <ProtectedRoute>
//             <Profile />
//           </ProtectedRoute>
//         }
//       />

//       {/* Protected Doctor Routes */}
//       <Route
//         path="/doctor/dashboard"
//         element={
//           <ProtectedRoute requiredRole="doctor">
//             <DoctorDashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/doctor/shared/:shareCode"
//         element={
//           <ProtectedRoute requiredRole="doctor">
//             <DoctorSharedPrediction />
//           </ProtectedRoute>
//         }
//       />

//       {/* Error Routes */}
//       <Route path="/unauthorized" element={<UnauthorizedPage />} />
//       <Route path="*" element={<NotFound />} />
//     </Route>,
//   ),
// )

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <Provider store={store}>
//       <RouterProvider router={router} />
//     </Provider>
//   </StrictMode>,
// )

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./App.css"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store/stores.js"
import Layout from "./Layout.jsx"
import Home from "./components/Home.jsx"
import Predict from "./components/Predict.jsx"
import Login from "./components/Auth/Login.jsx"
import Signup from "./components/Auth/Signup.jsx"
import Dashboard from "./components/Dashboard/Dashboard.jsx"
import Profile from "./components/profile/Profile.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import ForgotPassword from "./components/Auth/ForgotPassword.jsx"
import ResetPassword from "./components/Auth/ResetPassword.jsx"
import About from "./components/About.jsx"
import NotFound from "./components/NotFound.jsx"
import UnauthorizedPage from "./components/UnauthorizedPage.jsx"
import DoctorDashboard from "./components/Dashboard/DoctorDashboard.jsx"
import DoctorSharedPrediction from "./components/Dashboard/DoctorSharedPrediction.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Public Routes */}
      <Route path="" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      
      {/* Semi-Protected Routes */}
      <Route path="/prediction" element={<Predict />} />

      {/* Protected User Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Protected Doctor Routes */}
      <Route
        path="/doctor/dashboard"
        element={
          <ProtectedRoute requiredRole="doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/shared/:shareCode"
        element={
          <ProtectedRoute requiredRole="doctor">
            <DoctorSharedPrediction />
          </ProtectedRoute>
        }
      />

      {/* Error Routes */}
      
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
    </Route>,
  ),
)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
