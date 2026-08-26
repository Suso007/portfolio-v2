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

const TechStack = lazy(() => import("./TechStack-v2"));

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
            <Suspense fallback={<div>Loading....</div>}>
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
