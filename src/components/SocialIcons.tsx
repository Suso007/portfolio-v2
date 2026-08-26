import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { socialIconLinks, profile } from "../myData/data";

// Per-icon brand colors for the glow effect
const socialIcons = [
  { href: socialIconLinks.github, Icon: FaGithub, color: "#ffffff" },
  { href: socialIconLinks.linkedin, Icon: FaLinkedinIn, color: "#0A66C2" },
  { href: socialIconLinks.twitter, Icon: FaXTwitter, color: "#1DA1F2" },
  { href: socialIconLinks.instagram, Icon: FaInstagram, color: "#E1306C" },
];

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social");
    if (!social) return;

    type Tracked = {
      elem: HTMLElement;
      link: HTMLElement;
      rect: DOMRect;
      mouseX: number;
      mouseY: number;
      currentX: number;
      currentY: number;
    };

    const tracked: Tracked[] = [];
    social.querySelectorAll("span").forEach((elem) => {
      const link = elem.querySelector("a");
      if (!link) return;
      const rect = elem.getBoundingClientRect();
      tracked.push({
        elem,
        link,
        rect,
        mouseX: rect.width / 2,
        mouseY: rect.height / 2,
        currentX: 0,
        currentY: 0,
      });
    });
    if (!tracked.length) return;

    // .icons-section is centered with left:50%, so a resize invalidates every
    // cached rect. Recompute instead of drifting.
    const onResize = () => {
      tracked.forEach((t) => {
        t.rect = t.elem.getBoundingClientRect();
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      tracked.forEach((t) => {
        const x = e.clientX - t.rect.left;
        const y = e.clientY - t.rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          t.mouseX = x;
          t.mouseY = y;
        } else {
          t.mouseX = t.rect.width / 2;
          t.mouseY = t.rect.height / 2;
        }
      });
    };

    // One rAF loop for every icon rather than one per icon, and a handle we
    // can actually cancel — the previous cleanup was returned from a forEach
    // callback, so it was discarded and nothing was ever torn down.
    let frame = 0;
    const updatePosition = () => {
      tracked.forEach((t) => {
        t.currentX += (t.mouseX - t.currentX) * 0.1;
        t.currentY += (t.mouseY - t.currentY) * 0.1;
        t.link.style.setProperty("--siLeft", `${t.currentX}px`);
        t.link.style.setProperty("--siTop", `${t.currentY}px`);
      });
      frame = requestAnimationFrame(updatePosition);
    };

    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    frame = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" id="social">
        {socialIcons.map(({ href, Icon, color }, i) => (
          <span
            key={i}
            className="social-icon-span"
            style={{ "--icon-color": color } as React.CSSProperties}
          >
            <a href={href} target="_blank" rel="noopener noreferrer">
              <Icon />
            </a>
          </span>
        ))}
      </div>

      {/* Resume button directly linking to the URL */}
      <a
        href={profile.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="resume-button"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;