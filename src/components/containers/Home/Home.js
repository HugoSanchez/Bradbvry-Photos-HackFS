import React, {useEffect, useState, createRef} from 'react';
import {ThreadList} from '../../common/ThreadList';
import {ThreadInput} from '../../common/Input';
import {UploadButton} from '../../common/UploadButton'
import {SnackBar, Text} from '../../common';
import {magicKey} from '../../../config';
import styled from 'styled-components';


const Box = require('3box');
const { Magic } = require('magic-sdk');
const magic = new Magic(magicKey);

export const Home = props => {

    const ref = createRef()

    const [three, setThree] = useState({})
    const [threads, setThreads] = useState([])
    const [openSnack, setOpenSnack] = useState('')
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [posts, setPosts] = useState({})


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
        const getThreads = await space.subscribedThreads()
        setThreads(getThreads)
        setThree({box, space, profile, data})
    }

    const createNewThread = async threadName => {
        const thread = await three.space.createConfidentialThread(threadName)
        await three.space.subscribeThread(thread.address, {members: true})
        const getThreads = await three.space.subscribedThreads()
        setThreads(getThreads)
    }

    const selectThread = async thread => {
        let threadInstance = await three.space.joinThreadByAddress(thread.address)
        let posts = await threadInstance.getPosts()
        console.log('Posts: ', posts)
    }

    const uploadAndPostFiles = async e => {
        let file = e.target.files[0]
        if (file.type === 'image/jpeg' || file.type === 'image/jpeg') {
            console.log(file)
            setUploadSuccess(true)
            setOpenSnack('show')
            setTimeout(() => setOpenSnack(''), 4000)
        } else { 
            setUploadSuccess(false)
            setOpenSnack('show')
            setTimeout(() => setOpenSnack(''), 4000)
        }
    }

    return (
        <Cont>
            <SnackBar className={openSnack} success={uploadSuccess}>
            </SnackBar>
            <Left>
                <ThreadInput createNewThread={createNewThread}/>
                <ThreadList 
                    threads={threads}
                    selectThread={selectThread}/>
            </Left>

            <Right>
                <h1>Hello World</h1>
                <UploadButton uploadAndPostFiles={uploadAndPostFiles}/>
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
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgba(180, 180, 180, 0.4);
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.2)
`;

const Right = styled.div`
    flex: 2;
`;


