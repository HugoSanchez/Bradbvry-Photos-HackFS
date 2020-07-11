import React from 'react';
import logo from '../../../blogo.png';

import {
    SignInCard,
    Logo, 
    Title, 
    Text,
    Input,
    Button,
    ButtonText
} from './styles';

export const SignIn = props => {

    const handleLogin = async e => {
        e.preventDefault();
        const email = new FormData(e.target).get("email");
        console.log(email)
    }

    return (
        <SignInCard>
        <Logo src={logo} alt=''/>
        <Title>Please Sign In</Title>
        <Text>
            Enter your email here to either log in or sign up. 
            The process might take a few seconds, so please be patient.
        </Text>
        <form onSubmit={handleLogin}>
          <Input type="email" name="email" required="required" placeholder="thomas.pynchon@email.com" />
          <br></br>
          <Button type="submit">
            <ButtonText>Log in / Sign up</ButtonText>
          </Button>
        </form>
      </SignInCard>
    )
}

