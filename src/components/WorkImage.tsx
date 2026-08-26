import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

const FALLBACK_IMAGE = "/images/project-placeholder.svg";

interface Props {
  image: string;
  alt?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [src, setSrc] = useState(props.image);

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor={"disable"}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        <img
          src={src}
          alt={props.alt ? `${props.alt} project preview` : "Project preview"}
          loading="lazy"
          decoding="async"
          onError={() => src !== FALLBACK_IMAGE && setSrc(FALLBACK_IMAGE)}
        />
      </a>
    </div>
  );
};

export default WorkImage;
