import React, {useEffect} from 'react';
import { useHistory } from "react-router-dom";
import logo from '../../../blogo.png';
import {magicKey} from '../../../config';

import {
    SignInCard,
    Logo, 
    Title, 
    Text,
    Input,
    Button,
    ButtonText
} from './styles';

const { Magic } = require('magic-sdk');
const magic = new Magic(magicKey);

export const SignIn = props => {

    const history = useHistory();

    const loggout = async () => {
        let data = await magic.user.getMetadata()
        console.log(data)
        await magic.auth.loginWithMagicLink( data.email );
    }

    const handleLogin = async e => {
        e.preventDefault();
        const email = new FormData(e.target).get("email");
        console.log(email)
        if (email) {
            
            console.log('hello')
            console.time('h')
            await magic.auth.loginWithMagicLink({ email });
            const isLoggedIn = await magic.user.isLoggedIn();
            console.log(isLoggedIn)
            console.log('RPC', magic.rpcProvider)
            let data = await magic.user.getMetadata()
            console.log('data: ', data)
            console.timeEnd('h')


            history.push('/home')

      
        }
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
