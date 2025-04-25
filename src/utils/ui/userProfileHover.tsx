import styled from 'styled-components';
import { User } from "lucide-react";

interface LogOutButtonProps {
  name: string;
}

const UserProfileHover: React.FC<LogOutButtonProps>  = ({ name }) => {
  return (
    <StyledWrapper>
      <button className="Btn">
        <div className="sign">
          <User size={18} color="white" />
        </div>
        <div className="text">{name}</div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: .3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: rgb(132, 180, 166);
  }

  /* icon container */
  .sign {
    width: 100%;
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Adjust icon size */
  .sign svg {
    width: 18px;
    height: 18px;
  }

  /* text */
  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1em;
    font-weight: 400;
    transition-duration: .3s;
  }

  /* hover effect on button width */
  .Btn:hover {
    width: 125px;
    border-radius: 40px;
    transition-duration: .3s;
    margin-left: 70px;
  }

  .Btn:hover .sign {
    width: 30%;
    transition-duration: .3s;
    padding-left: 20px;
  }

  /* hover effect button's text */
  .Btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: .3s;
    padding-right: 10px;
  }

  /* button click effect */
  .Btn:active {
    transform: translate(2px, 2px);
  }
`;

export default UserProfileHover;
