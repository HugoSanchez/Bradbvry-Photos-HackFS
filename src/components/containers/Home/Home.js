import React, {useEffect, useState} from 'react';
import {magicKey} from '../../../config';
import styled from 'styled-components';
import camelCase from 'camelcase';


const Box = require('3box');
const { Magic } = require('magic-sdk');
const magic = new Magic(magicKey);

export const Home = props => {

    const [three, setThree] = useState({})

    useEffect(() => {
        console.log('MATCH: ', props.match)
        magicTest()
    }, [])

    

    const magicTest = async () => {
        const isLoggedIn = await magic.user.isLoggedIn();
        let data = await magic.user.getMetadata()

        // BOX
        const profile = await Box.getProfile(data.publicAddress)
        const box = await Box.openBox(data.publicAddress, magic.rpcProvider); 
        const space = await box.openSpace('bradbvry--main')
        await box.syncDone
        const threads = await space.subscribedThreads()
        let name = threads[0].address.slice(86)
        console.log('Threads: ', camelCase(name, {pascalCase: true}))
        setThree({box, space, profile, data})
    }

    const onKeyPress = async e => {
        if(e.keyCode == 13 && e.target.value.length > 0){
            const thread = await three.space.createConfidentialThread(e.target.value)
            await three.space.subscribeThread(thread.address, {members: true})
            console.log(thread)
            // console.log('value', e.target.value);
            // put the login here
        }
    }

    const toCamelCase = str => {
        console.log(str)
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
            if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
            return index === 0 ? match.toLowerCase() : match.toUpperCase();
        });
    }

    return (
        <Cont>
            <Left>
                <Input 
                    type="text" 
                    name="text" 
                    required="required" 
                    placeholder="Collection Name" 
                    onKeyDown={onKeyPress}
                />
            </Left>
            <Right>
                <h1>Hello World</h1>
            </Right>
        </Cont>
    )
}

const Cont = styled.div`
    height: 94vh;
    display: flex;
    flex-direction: row;
    padding-top: 1%;
`;

const Left = styled.div`
    flex: 1;
    border-right: 1px solid rgba(180, 180, 180, 0.4);

`;

const Right = styled.div`
    flex: 2;

`;

const Input = styled.input`
    margin-top: 5%;
    padding-left: 5%;
    width: 80%;
    height: 55px;
    box-sizing: border-box;
    outline: none;
    border: 0.5px solid rgb(220, 220, 220);
    border-radius: 5px;
    font-family: 'Montserrat';
    font-size: 15px;
    font-weight: 400;
    text-align: left;

    ::placeholder,
    ::-webkit-input-placeholder {
        color: gray;
        font-family: 'Montserrat';
        font-size: 15px;
        font-weight: 300;
        font-style: italic;
    }
`;
