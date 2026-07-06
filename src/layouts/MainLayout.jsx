import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollProgress from "../components/motion/ScrollProgress";
import { RouteReveal } from "../components/PageReveal";

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen" id="glow-skin-premium-ui-animation">
      <ScrollProgress />
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 pt-36 md:px-6 lg:pt-44">
        <AnimatePresence mode="wait">
          <RouteReveal key={location.pathname}>
            <Outlet />
          </RouteReveal>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
