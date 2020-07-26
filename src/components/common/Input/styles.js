import styled from 'styled-components';

export const Input = styled.input`
    margin-top: 5%;
    padding-left: 5%;
    width: 80%;
    height: 55px;
    box-sizing: border-box;
    outline: none;
    border: 0px solid #FFF;
    border-radius: 5px;
    font-family: 'Montserrat';
    font-size: 15px;
    font-weight: 400;
    text-align: left;
    background: rgba(229, 238, 244, 0.4);
    box-shadow: 0 3px 5px rgba(0,0,0,0.1);     


    ::placeholder,
    ::-webkit-input-placeholder {
        color: rgb(80, 80, 80);
        font-family: 'Montserrat';
        font-size: 15px;
        font-weight: 300;
        font-style: italic;
    }
`;