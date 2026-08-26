import "./styles/About.css";
import { aboutData } from "../myData/data";

const About = () => {
  return (
    <section
      className="about-section"
      id="about"
      aria-label="About me"
      tabIndex={-1}
    >
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">{aboutData.description}</p>
      </div>
    </section>
  );
};

export default About;
