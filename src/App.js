import { HashRouter, Route, Routes } from "react-router-dom";
import FrontEndLayout from "./layout/FrontEndLayout";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Programs from "./pages/Programs";
import DonateUs from "./pages/DonateUs";
import SuccessStories from "./pages/SuccessStories";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import About from "./pages/About";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<FrontEndLayout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="programs" element={<Programs />} />
          <Route path="donate" element={<DonateUs />} />
          <Route path="success-stories" element={<SuccessStories />} />
          <Route path="projects" element={<Projects />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="about" element={<About />} />

          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
