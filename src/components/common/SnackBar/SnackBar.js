import React from 'react';
import {MessageBox} from './styles';
import {Text} from '../Text';

export const SnackBar = props => {
  
  return (
    <div id="Snackbar" className={props.className}> 
    <MessageBox success={props.success}>
      {props.success && <Text>{props.message}</Text>}
      {!props.success && <Text>{props.message}</Text>}
      </MessageBox>
    </div>
  )
}
