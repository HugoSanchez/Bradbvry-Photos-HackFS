import React, {useEffect, useState, Fragment} from 'react';
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

const Box = require('3box');
const { Magic } = require('magic-sdk');
const magic = new Magic(magicKey);

export const AddMember = props => {

    const history = useHistory();

    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
      checkLoginAndRedirect()},
    [])

    const checkLoginAndRedirect = async () => {
      console.log(props.match)
      /** 
      let profile = await Box.getProfile(props.match.params.user)
      console.log(profile)
      let isLogged = await magic.user.isLoggedIn();
      console.log('Is logged?: ', isLogged)
      setIsLoggedIn(isLogged)
      if (isLogged) {
        let data = await magic.user.getMetadata()
        // history.push(`/app/${data.publicAddress}`)
        console.log('data')
      } else {
        console.log(props.match)
      }
      */
    }

    const handleLogin = async e => {
      e.preventDefault();
      const email = new FormData(e.target).get("email");
      console.log(email)

      let thread = props.match.params.thread
      let threadName = props.match.params.threadName

      if (email) {
        await magic.auth.loginWithMagicLink({ email });
        await magic.user.isLoggedIn();

        let data = await magic.user.getMetadata()
        let threadAddress = `/orbitdb/${thread}/${threadName}`
        let box = await Box.openBox(data.publicAddress, magic.rpcProvider); 
        let space = await box.openSpace('bradbvry--main')
        await space.subscribeThread(threadAddress, {members: true})

        await box.syncDone
        const subscribedThreads = await space.subscribedThreads()
        
        console.log('Threads: ', subscribedThreads)

        // let data = await magic.user.getMetadata()
        // history.push(`/app/${data.publicAddress}`)
      }
    }

    return (
      <SignInCard>
        <Logo src={logo} alt=''/>
        <Title>Add <span style={{fontWeight: 600}}>{props.match.params.email}</span> to your 
          <span style={{fontWeight: 600}}> "{props.match.params.threadName.slice(27)}"</span> collection!
        </Title>
        <Text>
          <span style={{fontWeight: 600}}>{props.match.params.email}</span> has accepted your invitation to join your collection <span style={{fontWeight: 600}}>"{props.match.params.threadName.slice(27)}". </span>
          This is a members-only collection, wich means that you should confirm its membership here:       
        </Text>
        <Button type="submit">
            <ButtonText>Confirm Membership</ButtonText>
          </Button>
      </SignInCard>
    )
}

