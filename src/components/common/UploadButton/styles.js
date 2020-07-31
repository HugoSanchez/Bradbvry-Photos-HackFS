import styled from 'styled-components';

export const CircularButton = styled.div`
    z-index: 2;
    bottom: 3rem;
    right: 5rem;
    width: 3rem; 
    height: 3rem; 
    border-radius: 1.5rem;
    background-color: white; 
    position: fixed;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);   
    display: flex;
    align-items: center;
    justify-content: center;  
`;

export const InputTypeFile = styled.input.attrs({ type: 'file' })`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 10;
`;