import React, {useEffect} from 'react';
import {magicKey} from '../../../config';

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
    }

    return (
        <div>
            <h1>Hello World</h1>
        </div>
    )
}

