import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import FrontEndLayout from "./layout/FrontEndLayout";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Programs from "./pages/Programs";
import DonateUs from "./pages/DonateUs";
import SuccessStories from "./pages/SuccessStories";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { useContext } from "react";
import { FrontendAuthContext } from "./context/FrontendAuthContext";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./Dashbaord/pages/Dashboard";
import Login from "./pages/Login";
import AuthPages from "./pages/AuthPages";
import Register from "./pages/Register";


const ProtectedRoute = ({ children }) => {
  const { user } = useContext(FrontendAuthContext);

    if (user === undefined) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<FrontEndLayout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="programs" element={<Programs />} />
          <Route path="donate" element={<DonateUs />} />
          <Route path="success-stories" element={<SuccessStories />} />
          <Route path="projects" element={<Projects />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="auth" element={<AuthPages />} />


          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
           
          </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
