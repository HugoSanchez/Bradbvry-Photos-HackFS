import React, {useState} from 'react';
import {Input} from './styles';


export const ThreadInput = props => {
  
  const [value, setValue] = useState('')

  const handleChange = e => {
    setValue(e.target.value)
  }

  const onKeyPress = async e => {
    if (e.keyCode === 13 && e.target.value.length > 0) {
      props.createNewThread(value)
      setValue('')
    }
}

  return (
    <Input 
      type="text" 
      name="text" 
      value={value}
      placeholder="Collection Name..." 
      onChange={handleChange}
      onKeyDown={onKeyPress}
    />
  )
}


