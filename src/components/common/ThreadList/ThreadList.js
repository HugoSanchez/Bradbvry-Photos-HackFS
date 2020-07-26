import React from 'react';
import styled from 'styled-components';
import {IconContext} from 'react-icons';
import {RiFolderLine} from 'react-icons/ri'


export const ThreadList = props => {
  return props.threads.map(thread => 
    <ListItem key={thread.address}>
      <IconBox>
        <IconContext.Provider value={{size: 24, color: 'black'}}>
          <RiFolderLine />
        </IconContext.Provider> 
      </IconBox>
      <NameBox onClick={() => props.selectThread(thread)}>
        <Title>{thread.address.slice(86)}</Title>
      </NameBox>
      <MaybeBox />
    </ListItem>
  )
}

const ListItem = styled.div`
  display: flex;
  margin-top: 5%;
  width: 80%;
  height: 55px;
  border-radius: 5px;
  font-family: 'Montserrat';
  font-size: 15px;
  font-weight: 400;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);     
`;


const IconBox = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const NameBox = styled.div`
  flex: 3;
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
`;

const MaybeBox = styled.div`
  flex: 1;

`;

const Title = styled.p`
  font-family: 'Montserrat';
  font-size: 17px;
  font-weight: 600;
  color: rgb(80, 80, 80)
`;
