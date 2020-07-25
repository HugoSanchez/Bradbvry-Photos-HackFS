import styled, {keyframes} from 'styled-components';

const fadein = keyframes`
  from {top: 0; opacity: 0;} 
  to {top: 30px; opacity: 1;}
`;

const fadeout = keyframes`
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
`;

export const SnackBar = styled.div`
  visibility: ${props => props.visible ? "visible" : "hidden"};
  min-width: 250px;
  margin-left: -125px;
  background-color: red;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  top: 30px;
  font-size: 17px;

  animation: ${fadein} 3s 0s both;



`;