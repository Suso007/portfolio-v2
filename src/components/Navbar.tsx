import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";
import { profile } from "../myData/data";
import { HiEnvelope, HiPhone } from "react-icons/hi2";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    const header = document.querySelector(".header");

    // Delegated: one listener on the header instead of one per anchor, so it
    // can actually be removed again on unmount.
    const onNavClick = (e: Event) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        ".header ul a"
      );
      if (!target) return;

      const section = target.getAttribute("data-href");

      // Only prevent default and scroll IF it's an internal link with a data-href
      if (section && window.innerWidth > 1024) {
        e.preventDefault();
        smoother.scrollTo(section, true, "top top");
      }
    };

    const onResize = () => {
      ScrollSmoother.refresh(true);
    };

    header?.addEventListener("click", onNavClick);
    window.addEventListener("resize", onResize);

    return () => {
      header?.removeEventListener("click", onNavClick);
      window.removeEventListener("resize", onResize);
      smoother?.kill();
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          {profile.initials}
        </a>
        <div className="navbar-contact-icons" data-cursor="disable">
          <a
            href={`tel:+${profile.phone.replace(/\s/g, "")}`}
            className="navbar-icon-btn"
            title={`Call ${profile.phone}`}
          >
            <HiPhone />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="navbar-icon-btn"
            title={profile.email}
          >
            <HiEnvelope />
          </a>
        </div>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a href="https://blogs.susovan.in" target="_blank" rel="noopener noreferrer">
              <HoverLinks text="BLOG" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
