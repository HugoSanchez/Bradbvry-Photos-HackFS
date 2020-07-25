import React from 'react';
import {IconContext} from 'react-icons';
import {RiAddLine} from 'react-icons/ri'
import {
  CircularButton,
  InputTypeFile,
} from './styles';

/**
 * @param {onCLick}: function to execute.
 * @param {buttonId}: css id for the circle.
 * @param {iconId}: css id for the icon.
 * @param {arrow}: arrow-left icon. 
 * @param {plus}: plus sign icon.
 */

const UploadButton = props => {

  return (
    <CircularButton id={props.buttonId} onClick={props.onClick}>
      <InputTypeFile onChange={props.uploadAndPostFiles}/>
      <IconContext.Provider value={{size: 30, color: 'gray'}}>
        <RiAddLine /> 
      </IconContext.Provider> 
    </CircularButton>
  );
}

export {UploadButton};
