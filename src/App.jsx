import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Home from "./pages/Home.jsx";

// Secondary pages load on demand to keep the first load light.
const About = lazy(() => import("./pages/About.jsx"));
const Services = lazy(() => import("./pages/Services.jsx"));
const Projects = lazy(() => import("./pages/Projects.jsx"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function PageLoader() {
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status">
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-sand border-t-orange" />
      <span className="sr-only">Loading</span>
    </div>
  );
}

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-charcoal focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <TopBar />
      <Navbar />
      <main id="main">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
