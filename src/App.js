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
import WorkerPage from "./components/workerPage/workerPage";
import AddVac from "./components/recruit/recruitForHr/addVac";
import Vacancy from "./components/recruit/vacancy/vacancy";
import Candidate from "./components/recruit/recruitForHr/candidate";
import AllVacancy from "./components/recruit/allVacancy/allVacancy";
function App() {
  const { isRegistered, role, userId } = checkRegistration();
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/addw" element={<AddProfession />} />
        {role === "hr" && <Route path="/recruit/add" element={<AddVac />} />}
        {role === "hr" && <Route path="/recruit" element={<RecruitFhr />} />}
        {role === "hr" && <Route path="/candidate" element={<Candidate />} />}
        {<Route path="/candidate/:id" element={<WorkerPage />} />}
        {role === "worker" && (
          <Route path="/recruit" element={<RecruitFrec />} />
        )}
        {role === "worker" && (
          <Route path="/recruit/my/:id" element={<WorkerPage />} />
        )}
        <Route path="/vacancy/:id" element={<Vacancy />} />
        <Route path="/vacancy" element={<AllVacancy userId={userId} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
