import React, {useEffect, useState, Fragment} from 'react';
import { useHistory } from "react-router-dom";
import { SnackBar } from '../../common';
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

    let {
      email,
      thread,
      threadName,
      memberAddress,
    } = props.match.params

    const history = useHistory();

    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [openSnack, setOpenSnack] = useState('')
    const [three, setThree] = useState({})

    useEffect(() => {
      checkLoginAndRedirect()},
    [])

    const checkLoginAndRedirect = async () => {
      let isLogged = await magic.user.isLoggedIn();

      if (!isLogged) {
        let data = await magic.user.getMetadata()
        history.push(`/app/${data.publicAddress}`)} 
      
      else {
        let data = await magic.user.getMetadata()
        let box = await Box.openBox(data.publicAddress, magic.rpcProvider); 
        let space = await box.openSpace('bradbvry--main')
        setThree({data, box, space})
      }
    }

    const handleConfirmMember = async e => {

      let threadAddress = `/orbitdb/${thread}/${threadName}`
      let threadInstance = await three.space.joinThreadByAddress(threadAddress, {members: true})

      // await threadInstance.addMember(memberAddress)
      // await three.box.syncDone
    

      showSnackBarAndRedirect(three.data.publicAddress)
    }

    const showSnackBarAndRedirect = address => {
      setOpenSnack('show')
      setTimeout(() => {
        setOpenSnack('')
        history.push(`/app/${address}`)
        console.log('DONE "')
      }, 3500)

    }

    return (
      <Fragment>
        <SnackBar className={openSnack} success={true} newMember={true}/>

        <SignInCard>
          <Logo src={logo} alt=''/>
          <Title>Add <span style={{fontWeight: 600}}>{email}</span> to your 
            <span style={{fontWeight: 600}}> "{props.match.params.threadName.slice(27)}"</span> collection!
          </Title>
          <Text>
            <span style={{fontWeight: 600}}>{props.match.params.email}</span> 
            has accepted your invitation to join your collection 
            <span style={{fontWeight: 600}}>"{props.match.params.threadName.slice(27)}". </span>
            This is a members-only collection, wich means that you should confirm its membership here:       
          </Text>
          <Button type="submit" onClick={handleConfirmMember}>
            <ButtonText>Confirm Membership</ButtonText>
          </Button>
        </SignInCard>
      </Fragment>
    )
}

