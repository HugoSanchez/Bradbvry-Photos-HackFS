import styled from 'styled-components';

export const SignInCard = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 35vw;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 1);
  overflow: hidden;
`;

export const Logo = styled.img`
  margin-top: 5%;
  width: 150px;
`;

export const Title = styled.h1`
  font-family: 'Montserrat';
  font-weight: 300;
  font-size: 30px;
  margin-top: 10%;
  margin-bottom: 10%;
  color: rgb(75, 75, 75);
`;

export const Text = styled.p`
  padding-left: 10%;
  padding-right: 10%;
  font-family: 'Montserrat';
  font-weight: 300;
  color: rgb(55, 55, 55);
  line-height: 1.8;
  margin-bottom: 10%;
  font-size: 18px;
`;

export const Input = styled.input`
  margin-top: 1%;
  width: 80%;
  height: 55px;
  box-sizing: border-box;
  outline: none;
  border: 0.5px solid rgb(220, 220, 220);
  border-radius: 5px;
  font-family: 'Montserrat';
  font-size: 15px;
  font-weight: 400;
  text-align: center;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: gray;
    font-family: 'Montserrat';
    font-size: 15px;
    font-weight: 300;
    font-style: italic;
  }
`;

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  border-radius: 5px;
  height: 55px;
  width: 70%;
  background-color: rgba(197, 255, 220, 1);
  box-shadow: 0 0 10px rgba(0,0,0,0.1); 
  :hover {
    box-shadow: 0 0 10px rgba(0,0,0,0.15); 
  }
`;

export const ButtonText = styled.p`
  color: rgb(80, 80, 80);
  font-family: 'Montserrat';
  font-size: 18px;
  font-weight: 500;
`;