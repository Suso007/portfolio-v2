import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import GithubGraph from "./GithubGraph";
import { smoother } from "./Navbar";

const TechStack = lazy(() => import("./TechStack-v2"));

// ScrollSmoother translates #smooth-content rather than scrolling the window,
// so a plain hash jump lands in the wrong place while it is active. Hand the
// scroll to the smoother, and move focus explicitly - a hash jump would
// otherwise be the only thing moving the caret.
const skipToContent = (event: React.MouseEvent<HTMLAnchorElement>) => {
  const about = document.getElementById("about");
  if (!about) return;

  event.preventDefault();
  if (smoother) {
    smoother.scrollTo(about, true, "top top");
  } else {
    about.scrollIntoView();
  }
  about.focus();
};

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    setSplitText();

    // setSplitText re-splits every .para/.title and rebuilds their
    // ScrollTriggers, so running it on the raw resize stream stalls the main
    // thread while the window is being dragged. The breakpoint check is cheap
    // and stays immediate; the expensive part is debounced.
    let debounce: ReturnType<typeof setTimeout>;
    const resizeHandler = () => {
      setIsDesktopView(window.innerWidth > 1024);
      clearTimeout(debounce);
      debounce = setTimeout(setSplitText, 200);
    };

    window.addEventListener("resize", resizeHandler);
    return () => {
      clearTimeout(debounce);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="container-main">
      <a className="skip-link" href="#about" onClick={skipToContent}>
        Skip to content
      </a>
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <Suspense fallback={<div className="section-fallback">Loading</div>}>
              <TechStack />
              <GithubGraph />
            </Suspense>
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
