import React, {useEffect, useState, Fragment} from 'react';
import {ThreadList} from '../../common/ThreadList';
import {ThreadInput} from '../../common/Input';
import {UploadButton} from '../../common/UploadButton'
import {SnackBar} from '../../common';
import {magicKey} from '../../../config';
import styled from 'styled-components';
import Masonry from 'react-masonry-css'

const Box = require('3box');
const { Magic } = require('magic-sdk');
const magic = new Magic(magicKey);

export const Home = props => {

    const [three, setThree] = useState({})
    const [threads, setThreads] = useState([])
    const [openSnack, setOpenSnack] = useState('')
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [threadAndPosts, setThreadAndPosts] = useState({})


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
        setThreadAndPosts({threadInstance, posts})
    }

    const uploadAndPostFiles = async e => {
        let file = e.target.files[0]
        if (file.type === 'image/jpeg' || file.type === 'image/jpeg') {
            handleShowSnackbar(true)
            await handleEncodeAndPostFile(file)
        } else { 
            handleShowSnackbar(false)
        }
    }

    const handleEncodeAndPostFile = async file => {
        let base64 = await getBase64(file)
        await threadAndPosts.threadInstance.post(base64)
        await selectThread(threadAndPosts.threadInstance)
    } 

    const handleShowSnackbar = bool => {
        setUploadSuccess(bool)
        setOpenSnack('show')
        setTimeout(() => setOpenSnack(''), 4000)
    }

    const getBase64 = (file) => {
        return new Promise((resolve,reject) => {
           const reader = new FileReader();
           reader.onload = () => resolve(reader.result);
           reader.onerror = error => reject(error);
           reader.readAsDataURL(file);
        });
    }

    return (
        <Cont>
            <SnackBar className={openSnack} success={uploadSuccess}>
            </SnackBar>
            <Left>
                <ThreadInput createNewThread={createNewThread}/>
                <ThreadList 
                    selectedThread={threadAndPosts}
                    threads={threads}
                    selectThread={selectThread}/>
            </Left>

            <Right>
                {
                    threadAndPosts.threadInstance ?
                    <Fragment>
                        <Title>
                            {
                                threadAndPosts.threadInstance ?
                                threadAndPosts.threadInstance.address.slice(86)
                                : null
                            }
                        </Title>
                        <Masonry
                            breakpointCols={2}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column">
                            {
                                threadAndPosts.posts.map((p, i) => {
                                    return (
                                        <Image src={p.message} alt={i} key={i}/>
                                    )})
                            }
                        </Masonry>
                        <UploadButton uploadAndPostFiles={uploadAndPostFiles}/>
                    </Fragment>
                    :
                    null
                }
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

const Image = styled.img`
    width: 90%;
    padding-top: 15px;
`

const Title = styled.h1`
    font-family: 'Montserrat';
    font-size: 32px;
    font-weight: 500;
`;


