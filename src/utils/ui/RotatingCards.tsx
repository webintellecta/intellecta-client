import { useState } from "react";
import styled from "styled-components";

interface RotatingCardProps {
  badge: string;
  badges: {
    trophysrc: string;
    desc: string;
  };
}

const RotatingCard: React.FC<RotatingCardProps> = ({ badge, badges }) => {
  const [showTitle, setShowTitle] = useState(false);

  return (
    <StyledWrapper>
      <div
        className="e-card playing cursor-pointer"
        onMouseOver={() => {
          setShowTitle(true);
        }}
        onMouseLeave={() => setShowTitle(false)}
      >
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="card flex flex-col items-center justify-center">
          <img
            src={badges?.trophysrc}
            alt={badge}
            className="md:h-16 md:w-16 h-10 w-10 object-contain z-10"
          />
          <h2 className="text-white md:text-base text-sm">{badge}</h2>
        </div>
      </div>
      <div
        className={`
    absolute z-50 transition-all duration-300 ease-in-out
    ${
      showTitle
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-2 pointer-events-none"
    }
  `}
      >
        <p className="p-2 mt-2 -ml-2 text-xs rounded-2xl bg-amber-400">
          {badges.desc}
        </p>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .e-card {
    background: transparent;
    box-shadow: 0px 8px 28px -9px rgba(0, 0, 0, 0.45);
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 16px;
    overflow: hidden;
  }
  @media screen and (max-width: 768px) {
    .e-card {
      width: 80px;
      height: 70px;
    }
  }

  .wave {
    position: absolute;
    width: 200px;
    height: 180px;
    opacity: 0.6;
    left: 0;
    top: 0;
    margin-left: -50%;
    margin-top: -70%;
    background: linear-gradient(744deg, #af40ff, #5b42f3 60%, #00ddeb);
  }

  .icon {
    width: 3em;
    margin-top: -1em;
    padding-bottom: 1em;
  }

  .name {
    font-size: 14px;
    font-weight: 100;
    position: relative;
    top: 1em;
    text-transform: lowercase;
  }

  .wave:nth-child(2),
  .wave:nth-child(3) {
    top: 210px;
  }

  .playing .wave {
    border-radius: 40%;
    animation: wave 3000ms infinite linear;
  }

  .wave {
    border-radius: 40%;
    animation: wave 55s infinite linear;
  }

  .playing .wave:nth-child(2) {
    animation-duration: 4000ms;
  }

  .wave:nth-child(2) {
    animation-duration: 50s;
  }

  .playing .wave:nth-child(3) {
    animation-duration: 5000ms;
  }

  .wave:nth-child(3) {
    animation-duration: 45s;
  }

  @keyframes wave {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default RotatingCard;
