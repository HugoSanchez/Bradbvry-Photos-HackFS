import React, {useEffect} from 'react';
import {magicKey} from '../../../config';

const { Magic } = require('magic-sdk');
const magic = new Magic(magicKey);

export const Home = props => {

    return (
        <div>
            <h1>Hello World</h1>
        </div>
    )
}

