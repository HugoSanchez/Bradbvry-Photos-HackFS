import React, {useEffect} from 'react';
import styled from 'styled-components';


export const ThreadList = props => {
  return props.threads.map(thread => 
    <ListItem key={thread.address}>
      <IconBox />
      <NameBox />
      <MaybeBox />
    </ListItem>
  )
}

const ListItem = styled.div`
  display: flex;
  margin-top: 5%;
  width: 80%;
  height: 55px;
  border: 0.5px solid rgb(220, 220, 220);
  border-radius: 5px;
  font-family: 'Montserrat';
  font-size: 15px;
  font-weight: 400;
  text-align: center;
`;

const IconBox = styled.div`
  flex: 1;
  border: 0.5px solid rgb(220, 220, 220);
`;

const NameBox = styled.div`
  flex: 3;
  border: 0.5px solid rgb(220, 220, 220);
`;

const MaybeBox = styled.div`
  flex: 1;
  border: 0.5px solid rgb(220, 220, 220);
`;
