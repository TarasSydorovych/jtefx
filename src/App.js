import logo from "./logo.svg";
import "./App.css";
import Header from "./components/standartComponent/header/header";
import Main from "./components/main/main";
import Footer from "./components/standartComponent/footer/foter";
import { Route, Routes } from "react-router-dom";
import Blog from "./components/blog/blog";
import BlogPage from "./components/blogPage/blogPage";
import Auth from "./components/auth/auth";
import { checkRegistration } from "./function/authUtils";
import RecruitFrec from "./components/recruit/recruitForRec/recruitFrec";
import RecruitFhr from "./components/recruit/recruitForHr/recruitFhr";
import AddProfession from "./components/admin/addProf";
function App() {
  const { isRegistered, role } = checkRegistration();
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/addw" element={<AddProfession />} />
        {role === "hr" && <Route path="/recruit" element={<RecruitFhr />} />}
        {role === "worker" && (
          <Route path="/recruit" element={<RecruitFrec />} />
        )}
      </Routes>

      <Footer />
    </>
  );
}

export default App;
