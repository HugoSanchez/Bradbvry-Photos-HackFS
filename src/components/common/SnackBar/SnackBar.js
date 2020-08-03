import React from 'react';
import {MessageBox} from './styles';
import {Text} from '../Text';

export const SnackBar = props => {
  
  return (
    <div id="Snackbar" className={props.className}> 
    <MessageBox success={props.success}>
      {props.success && !props.newMember && <Text>Successfully uploaded picture!</Text>}
      {!props.success && <Text>Wrong file type - only jpeg or png.</Text>}
      {props.success && props.newMember && <Text>New member added successfully!</Text>}
      </MessageBox>
    </div>
  )
}
