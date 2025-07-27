// import { StrictMode } from "react"
// import { createRoot } from "react-dom/client"
// import "./App.css"
// import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
// import { AuthProvider } from "./context/AuthContext"
// import Layout from "./Layout.jsx"
// import Home from "./components/Home.jsx"
// import Predict from "./components/Predict.jsx"
// import Login from "./components/Auth/Login.jsx"
// import Signup from "./components/Auth/Signup.jsx"
// import Dashboard from "./components/Dashboard/Dashboard.jsx"
// import ProtectedRoute from "./components/ProtectedRoute.jsx"
// import ForgotPassword from "./components/Auth/ForgotPassword.jsx"
// // import ResetPassword from "./Auth/ResetPassword.jsx"
// // import Profile from "./components/Profile/Profile.jsx"
// import About from "./components/About.jsx"
// import NotFound from "./components/NotFound.jsx"
// // import PatientsPage from "./components/PatientsPage.jsx"
// // import AnalyticsPage from "./components/AnalyticsPage.jsx"
// // import AdminDashboard from "./components/Dashboard/AdminDashBoard"
// import UnauthorizedPage from "./components/UnauthorizedPage.jsx"
// import UserDashboard from "./components/Dashboard/UserDashboard.jsx"

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Layout />}>
//       {/* Public Routes */}
//       <Route path="" element={<Home />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}

//       {/* Semi-Protected Routes (can be accessed without auth but better with auth) */}
//       <Route path="/prediction" element={<Predict />} />

//       {/* Protected Routes - Require Authentication */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />
//       {/* <Route
//         path="/profile"
//         element={
//           <ProtectedRoute>
//             <Profile />
//           </ProtectedRoute>
//         }
//       /> */}

//       {/* Doctor-Only Routes
//       <Route
//         path="/patients"
//         element={
//           <ProtectedRoute requiredRole="doctor">
//             <PatientsPage />
//           </ProtectedRoute>
//         }
//       /> */}
//       {/* <Route
//         path="/analytics"
//         element={
//           <ProtectedRoute requiredRole="doctor">
//             <AnalyticsPage />
//           </ProtectedRoute>
//         }
//       /> */}

//       {/* Admin-Only Routes
//       <Route
//         path="/admin"
//         element={
//           <ProtectedRoute requiredRole="admin">
//             <AdminDashboard />
//           </ProtectedRoute>
//         } */}
//       {/* /> */}

//       {/* Error Routes */}
//       <Route path="/unauthorized" element={<UnauthorizedPage />} />
//       <Route path="*" element={<NotFound />} />
//     </Route>,
//   ),
// )

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <AuthProvider>
//       <RouterProvider router={router} />
//     </AuthProvider>
//   </StrictMode>,
// )


// import { StrictMode } from "react"
// import { createRoot } from "react-dom/client"
// import "./App.css"
// import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
// import { Provider } from "react-redux"
// import { store } from "./store/store"
// import Layout from "./Layout.jsx"
// import Home from "./components/Home.jsx"
// import Predict from "./components/Predict.jsx"
// import Login from "./Auth/Login.jsx"
// import Signup from "./Auth/Signup.jsx"
// import Dashboard from "./components/Dashboard/Dashboard.jsx"
// import Profile from "./components/profile/Profile.jsx"
// import ProtectedRoute from "./components/ProtectedRoute.jsx"
// import ForgotPassword from "./Auth/ForgotPassword.jsx"
// import ResetPassword from "./Auth/ResetPassword.jsx"
// import About from "./components/About.jsx"
// import NotFound from "./components/NotFound.jsx"
// import UnauthorizedPage from "./components/UnauthorizedPage.jsx"

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

//       {/* Protected Routes */}
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
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
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

      {/* Protected Routes */}
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

      {/* Error Routes */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFound />} />
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
