import styled from 'styled-components';

export const Input = styled.input`
    margin-top: 5%;
    padding-left: 5%;
    width: 80%;
    height: 55px;
    box-sizing: border-box;
    outline: none;
    border: 0.5px solid #000;
    border-radius: 5px;
    font-family: 'Montserrat';
    font-size: 15px;
    font-weight: 400;
    text-align: left;

    ::placeholder,
    ::-webkit-input-placeholder {
        color: gray;
        font-family: 'Montserrat';
        font-size: 15px;
        font-weight: 300;
        font-style: italic;
    }
`;