import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import menuVideo from "./assets/Mainn.mp4";
import main1 from "./assets/main1.mp4";
import main2 from "./assets/main2.mp4";
import main3 from "./assets/main3.mp4";
import P3Menu from "./P3Menu";
import VideoPage from "./VideoPage";
import ResumePage from "./ResumePage";
import PageTransition from "./PageTransition";
import Socials from "./Socials";
import AboutMe from "./AboutMe";
import "./App.css";
import hoverSfx from "./assets/deck_ui_navigation.wav";
import clickSfx from "./assets/deck_ui_default_activation.wav";
import backSfx from "./assets/deck_ui_hide_modal.wav";
import navSfx from "./assets/deck_ui_slider_down.wav";

function MenuScreen() {
  const navigate = useNavigate();
  return (
    <div id="menu-screen">
      <video src={menuVideo} autoPlay loop muted playsInline />
      <P3Menu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <MenuScreen />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition variant="about">
              <AboutMe />
            </PageTransition>
          }
        />
        <Route
          path="/resume"
          element={
            <PageTransition>
              <ResumePage src={main2} />
            </PageTransition>
          }
        />
        <Route
          path="/socials"
          element={
            <PageTransition variant="socials">
              <Socials />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(() => {
    const playSound = (src) => {
      const audio = new Audio(src);
      audio.volume = 1.0;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    // hover sfx — semua text element
    const textTags = ["A", "BUTTON", "SPAN", "P", "H1", "H2", "H3", "LI"];
    const handleHover = (e) => {
      if (textTags.includes(e.target.tagName)) playSound(hoverSfx);
    };

    // click sfx
    const handleClick = (e) => {
      if (textTags.includes(e.target.tagName)) playSound(clickSfx);
    };

    // keyboard sfx
    const handleKey = (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") playSound(navSfx);
      if (e.key === "Escape" || e.key === "Backspace") playSound(backSfx);
    };

    document.addEventListener("mouseover", handleHover);
    document.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mouseover", handleHover);
      document.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);
  return <AnimatedRoutes />;
}
