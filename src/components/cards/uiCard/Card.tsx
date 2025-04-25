import styled from 'styled-components';

interface cardProps {
  mainHead?:string;
  value?:number;
}

const Card: React.FC <cardProps> = ({mainHead ,value}) => {
  return (
    <StyledWrapper>
      <div className="card">
        <a className="card1" >
          <p className='head-p'>{mainHead}</p>
          <p className="small">{value}</p>
          <div className="go-corner">
            <div className="go-arrow">
              →
            </div>
          </div>
        </a>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .head-p {
    font-size: 15px;
    font-weight: 700;
    line-height: 10px;
    color: #666;
  }

  .card p.small {
    font-size: 20px;
    font-weight:800px;
    color: #666;
    text-align:center;
  }

  .go-corner {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 32px;
    height: 32px;
    overflow: hidden;
    top: 0;
    right: 0;
    background-color: #00838d0;
    border-radius: 0 4px 0 32px;
  }

  .go-arrow {
    margin-top: -4px;
    margin-right: -4px;
    color: white;
    font-family: courier, sans;
  }

  .card1 {
    display: block;
    position: relative;
    max-width: 262px;
    background-color: white;
    border-radius: 4px;
    padding: 32px 24px;
    margin: 8px;
    text-decoration: none;
    z-index: 0;
    overflow: hidden;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
    border: 1px solid black/50;
  }

  .card1:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: -16px;
    right: -16px;
    background: #00838d;
    height: 32px;
    width: 32px;
    border-radius: 32px;
    transform: scale(1);
    transform-origin: 50% 50%;
    transition: transform 0.25s ease-out;
  }

  .card1:hover:before {
    transform: scale(21);
  }

  .card1:hover p {
    transition: all 0.3s ease-out;
    color: rgba(255, 255, 255, 0.8);
  }

  .card1:hover h3 {
    transition: all 0.3s ease-out;
    color: #fff;
  }

  .card2 {
    display: block;
    top: 0px;
    position: relative;
    max-width: 262px;
    background-color: #f2f8f9;
    border-radius: 4px;
    padding: 32px 24px;
    margin: 12px;
    text-decoration: none;
    z-index: 0;
    overflow: hidden;
    border: 1px solid #f2f8f9;
  }

  .card2:hover {
    transition: all 0.2s ease-out;
    box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
    top: -4px;
    border: 1px solid #ccc;
    background-color: white;
  }

  .card2:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: -16px;
    right: -16px;
    background: #00838d;
    height: 32px;
    width: 32px;
    border-radius: 32px;
    transform: scale(2);
    transform-origin: 50% 50%;
    transition: transform 0.15s ease-out;
  }

  .card2:hover:before {
    transform: scale(2.15);
  }

  .card3 {
    display: block;
    top: 0px;
    position: relative;
    max-width: 262px;
    background-color: #f2f8f9;
    border-radius: 4px;
    padding: 32px 24px;
    margin: 12px;
    text-decoration: none;
    overflow: hidden;
    border: 1px solid #f2f8f9;
  }

  .card3 .go-corner {
    opacity: 0.7;
  }

  .card3:hover {
    border: 1px solid #00838d;
    box-shadow: 0px 0px 999px 999px rgba(255, 255, 255, 0.5);
    z-index: 500;
  }

  .card3:hover p {
    color: #00838d;
  }

  .card3:hover .go-corner {
    transition: opactiy 0.3s linear;
    opacity: 1;
  }

  .card4 {
    display: block;
    top: 0px;
    position: relative;
    max-width: 262px;
    background-color: #fff;
    border-radius: 4px;
    padding: 32px 24px;
    margin: 12px;
    text-decoration: none;
    overflow: hidden;
    border: 1px solid #ccc;
  }

  .card4 .go-corner {
    background-color: #00838d;
    height: 100%;
    width: 16px;
    padding-right: 9px;
    border-radius: 0;
    transform: skew(6deg);
    margin-right: -36px;
    align-items: start;
    background-image: linear-gradient(-45deg, #8f479a 1%, #dc2a74 100%);
  }

  .card4 .go-arrow {
    transform: skew(-6deg);
    margin-left: -2px;
    margin-top: 9px;
    opacity: 0;
  }

  .card4:hover {
    border: 1px solid #cd3d73;
  }

  .card4 h3 {
    margin-top: 8px;
  }

  .card4:hover .go-corner {
    margin-right: -12px;
  }

  .card4:hover .go-arrow {
    opacity: 1;
  }`;

export default Card;
// import React from "react";

// interface CardProps {
//   mainHead?: string;
//   value?: number;
// }

// const Card: React.FC<CardProps> = ({ mainHead, value }) => {
//   return (
//     <div className="relative max-w-xs bg-white rounded-lg shadow-lg p-5 m-2 overflow-hidden transition-transform hover:scale-105 hover:shadow-xl group">
//       <p className="text-gray-600 font-bold text-lg text-center">{mainHead}</p>
//       <p className="text-gray-800 font-extrabold text-2xl text-center mt-2">
//         {value}
//       </p>
//       <div className="absolute top-0 right-0 bg-teal-600 w-8 h-8 flex items-center justify-center rounded-bl-lg group-hover:scale-125 transition-transform">
//         <span className="text-white text-xl font-bold">→</span>
//       </div>
//     </div>
//   );
// };

// export default Card;

