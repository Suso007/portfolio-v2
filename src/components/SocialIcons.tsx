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
    const social = document.getElementById("social") as HTMLElement;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
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