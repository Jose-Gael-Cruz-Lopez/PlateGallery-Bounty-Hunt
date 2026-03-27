import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { SplashIntro } from "./components/SplashIntro";
import { Home } from "./pages/Home";
import { MapPage } from "./pages/Map";
import { StatePage } from "./pages/State";
import { UploadPage } from "./pages/Upload";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { PlateDetailPage } from "./pages/PlateDetail";
import { ProfilePage } from "./pages/Profile";
import { SignInPage, SignUpPage } from "./pages/Auth";

function Layout() {
  return (
    <SplashIntro>
      <div className="site-shell">
        <div className="grain" aria-hidden="true" />
        <NavBar />
        <div className="site-inner">
          <AnimatedRoutes />
        </div>
      </div>
    </SplashIntro>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.30, ease: [0.16, 1, 0.3, 1] }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/state/:abbr" element={<StatePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/plate/:id" element={<PlateDetailPage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
