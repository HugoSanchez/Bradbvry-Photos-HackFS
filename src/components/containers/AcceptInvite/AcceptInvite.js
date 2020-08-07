import React, {useEffect, useState, Fragment} from 'react';
import { useHistory } from "react-router-dom";
import logo from '../../../blogo.png';
import {magicKey} from '../../../config';
import axios from 'axios';

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

export const AcceptInvite = props => {

    let {
      user,
      thread,
      threadName,
    } = props.match.params

    const history = useHistory();

    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
      checkLoginAndRedirect()},
    [])

    const checkLoginAndRedirect = async () => {

      let isLogged = await magic.user.isLoggedIn();
      setIsLoggedIn(isLogged)
      
      if (isLogged) {
        let data = await magic.user.getMetadata()

      } else {
        console.log(props.match)
      }
    }
    // http://localhost:3000/add-member/0xCf2E58CEFFE93fB2C1649aeC69778D491aEEB7Ee/zdpuB2DZmZN8v2YFQsMMd69QjShFv7LTZ8WfJEpv7pSc1cvmk/3box.thread.bradbvry--main.Something/hugo@bradbvry.com
    
    const handleLogin = async e => {
      e.preventDefault();
      const email = new FormData(e.target).get("email");
      console.log(email)

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

        await sendAcceptedMessage(data)
        
        console.log('Threads: ', subscribedThreads)
        history.push(`/app/${data.publicAddress}`)

      }
    }

    const sendAcceptedMessage = async (data) => {
      let baseUrl = 'http://localhost:3000/add-member'
      let acceptUrl = baseUrl + `/${data.publicAddress}/${thread}/${threadName}/${data.email}`
      let sender = data.email
      let senderAddress = data.publicAddress
      let collectionName = threadName.slice(27)
      let inviter = user
      
      // http://localhost:3000/add-member/0xCf2E58CEFFE93fB2C1649aeC69778D491aEEB7Ee/zdpuB2DZmZN8v2YFQsMMd69QjShFv7LTZ8WfJEpv7pSc1cvmk/3box.thread.bradbvry--main.Something/hugo@bradbvry.com
      let reqData = {acceptUrl, sender, senderAddress, collectionName, inviter}
      let req = await axios.post('http://localhost:1000/api/share/add-invited-member', reqData)
      console.log(req)
    }

    return (
      <SignInCard>
        <Logo src={logo} alt=''/>
        <Title>Sign In to join the collection 
          <span style={{fontWeight: 600}}>"{props.match.params.threadName.slice(27)}"</span>
        </Title>
        <Text>
          You've been invited to join the collection <span style={{fontWeight: 600}}>"{props.match.params.threadName.slice(27)}". </span>
          This is a members-only collection, wich means that you should first sign in here:       
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

