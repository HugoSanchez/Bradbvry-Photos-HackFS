import React, {useEffect} from 'react';
import {magicKey} from '../../../config';

const Box = require('3box');
const { Magic } = require('magic-sdk');
const magic = new Magic(magicKey);

export const Home = props => {

    useEffect(() => {
        console.log('MATCH: ', props.match)
        magicTest()
    })

    const magicTest = async () => {
        const isLoggedIn = await magic.user.isLoggedIn();
        console.log(isLoggedIn)
        console.log('RPC', magic.rpcProvider)
        let data = await magic.user.getMetadata()
        console.log('data: ', data)

        // BOX
        const profile = await Box.getProfile(data.publicAddress)
        console.log(profile)
        const box = await Box.openBox(data.publicAddress, magic.rpcProvider); 
        console.log(box)
        let space = await box.openSpace('bradbvry--main')
        console.log(space)
    }

    return (
        <div>
            <h1>Hello World</h1>
        </div>
    )
}

