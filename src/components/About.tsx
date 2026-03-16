import "./styles/About.css";
import { aboutData } from "../myData/data";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">{aboutData.description}</p>
      </div>
    </div>
  );
};

export default About;
