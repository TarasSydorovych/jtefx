import logo from "./logo.svg";
import "./App.css";
import Header from "./components/standartComponent/header/header";
import Main from "./components/main/main";
import Footer from "./components/standartComponent/footer/foter";
import { Route, Routes, useLocation } from "react-router-dom";
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
import Chat from "./components/chat/chat";
import ChatPage from "./components/chat/chatPage";
import BrandManager from "./components/afilate/brandManager/brandManager";
import AddTrafic from "./components/afilate/brandManager/addTrafic";
import AllRequest from "./components/afilate/allReguest/allRequest";
import Admin from "./components/admin/admin";
import ChatForAdmin from "./components/chat/chatForAdmin";
import AddRequest from "./components/afilate/allReguest/addRequest";
import AllRequestMy from "./components/afilate/myreq/allRequestMy";
import CardInput from "./components/creditCard/cardInput";
import ContactInfoUs from "./components/recruit/recruitForRec/contactInfoUs";
import ProfileSet from "./components/profile/profileSet";
import { useEffect, useState } from "react";
function App() {
  const { isRegistered, role, userId } = checkRegistration();
  const [windowDimensions, setWindowDimensions] = useState(false);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1100) {
        setWindowDimensions(false);
      } else {
        setWindowDimensions(true);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Main windowDimensions={windowDimensions} />}
        />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/blog"
          element={<Blog windowDimensions={windowDimensions} />}
        />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/addw" element={<AddProfession />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/admchat/:id" element={<ChatForAdmin />} />
        <Route
          path="/chat"
          element={<ChatPage role={role} userId={userId} />}
        />
        {role === "hr" && <Route path="/recruit/add" element={<AddVac />} />}
        {role === "hr" && <Route path="/recruit" element={<RecruitFhr />} />}
        {role === "hr" && <Route path="/candidate" element={<Candidate />} />}
        {
          <Route
            path="/candidate/:id"
            element={<WorkerPage userId={userId} />}
          />
        }
        {role === "worker" && (
          <Route path="/recruit" element={<RecruitFrec />} />
        )}
        {role === "worker" && (
          <Route
            path="/recruit/my/:id"
            element={<WorkerPage userId={userId} />}
          />
        )}
        {role === "brand" && (
          <Route path="/brand/add" element={<AddTrafic />} />
        )}
        {role === "brand" && (
          <Route path="/brand/request" element={<BrandManager />} />
        )}
        {role === "brand" && (
          <Route path="/brand/allRequest" element={<AllRequest />} />
        )}
        {role === "afilate" && <Route path="/brand" element={<AllRequest />} />}
        {role === "afilate" && (
          <Route path="/request/add" element={<AddRequest />} />
        )}
        {role === "afilate" && (
          <Route path="/request/my" element={<AllRequestMy />} />
        )}
        {role === "brand" && (
          <Route path="/request/my" element={<AllRequestMy />} />
        )}
        {role === "brand" && (
          <Route path="/pay" element={<CardInput userId={userId} />} />
        )}
        {role === "afilate" && (
          <Route path="/pay" element={<CardInput userId={userId} />} />
        )}
        {role === "hr" && (
          <Route path="/pay" element={<CardInput userId={userId} />} />
        )}
        {role === "brand" && <Route path="/brand" element={<BrandManager />} />}
        <Route path="/vacancy/:id" element={<Vacancy />} />
        <Route path="/profile" element={<ProfileSet />} />
        <Route path="/vacancy" element={<AllVacancy userId={userId} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
