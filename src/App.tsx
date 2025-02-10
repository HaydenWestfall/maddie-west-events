import { useGSAP } from "@gsap/react";
import "./App.scss";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import HeaderSection from "./shared/header/header";
import HomeRoute from "./pages/home/home";
import ContactRoute from "./pages/contact/contact";
import { Route, Routes, useLocation } from "react-router-dom";
import AboutRoute from "./pages/about/about";
import TestimoniesRoute from "./pages/testimonies/testimonies";
import PackagesRoute from "./pages/packages/packages";
import JournalRoute from "./pages/journal/journal";
import ContactSection from "./shared/contact-section/contact-section";
import FooterSection from "./shared/footer/footer";
import { TransitionProvider } from "./shared/route-transition/TransitionProvider";
import PageTransition from "./shared/route-transition/PageTransition";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function App() {
  const location = useLocation();
  useLenis(() => {});

  return (
    <ReactLenis root>
      <TransitionProvider>
        <PageTransition>
          {(handleNavigation) => (
            <>
              {/* <TransitionCover displayText="test" /> */}
              <HeaderSection handleNavigation={handleNavigation} />
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomeRoute handleNavigation={handleNavigation} />} />
                <Route path="/about" element={<AboutRoute />} />
                <Route path="/testimonies" element={<TestimoniesRoute />} />
                <Route path="/packages" element={<PackagesRoute handleNavigation={handleNavigation} />} />
                <Route path="/journal" element={<JournalRoute />} />
                <Route path="/contact" element={<ContactRoute handleNavigation={handleNavigation} />} />
              </Routes>
              {location.pathname !== "/contact" && <ContactSection handleNavigation={handleNavigation} />}
              <FooterSection handleNavigation={handleNavigation} />
            </>
          )}
        </PageTransition>
      </TransitionProvider>
    </ReactLenis>
  );
}

export default App;
