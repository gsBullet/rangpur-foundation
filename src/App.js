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
import AboutContent from "./Dashbaord/pages/about/AboutContent";
import ProgramsContent from "./Dashbaord/pages/programs/ProgramsContent";
import ProjectsContent from "./Dashbaord/pages/projects/ProjectsContent";
import SuccessStorites from "./Dashbaord/pages/stories/SuccessStorites";
import AllBlogs from "./Dashbaord/pages/blog/AllBlogs";

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
          path="/dashboard/*"
          // element={
          //   <ProtectedRoute>
          //     <DashboardLayout />
          //   </ProtectedRoute>
          // }
          element={<DashboardLayout />}
        >
          <Route index element={<Dashboard />} />
          <Route path="about-us" element={<AboutContent />} />
          <Route path="our-activities" element={<ProgramsContent />} />
          <Route path="our-projects" element={<ProjectsContent />} />
          <Route path="success-stories" element={<SuccessStorites />} />
          <Route path="all-donation" element={<DonateUs />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="all-blogs" element={<AllBlogs />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
