import React, {useEffect, useState, Fragment} from 'react';
import {ThreadList} from '../../common/ThreadList';
import {ThreadInput} from '../../common/Input';
import {UploadButton} from '../../common/UploadButton'
import {SnackBar} from '../../common';
import {magicKey} from '../../../config';
import styled from 'styled-components';
import Masonry from 'react-masonry-css'
import axios from 'axios';

const Box = require('3box');
const { Magic } = require('magic-sdk');
const magic = new Magic(magicKey);

export const Home = props => {

    const [three, setThree] = useState({})
    const [email, setEmail] = useState('')
    const [threads, setThreads] = useState([])
    const [openSnack, setOpenSnack] = useState('')
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [threadAndPosts, setThreadAndPosts] = useState({})
    const [message, setMessage] = useState(null)


    useEffect(() => {
        console.log('MATCH: ', props.match)
        
        magicTest()
    }, [])

    const magicTest = async () => {
        //await magic.user.logout()
        const isLoggedIn = await magic.user.isLoggedIn();
        let data = await magic.user.getMetadata()
        console.log(data)

        // BOX
        const profile = await Box.getProfile(data.publicAddress)
        const box = await Box.openBox(data.publicAddress, magic.rpcProvider); 
        const space = await box.openSpace('bradbvry--main')
        await box.syncDone
        const getThreads = await space.subscribedThreads()
        console.log('subscribed threads: ', getThreads)

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
        console.log('here!', thread.address)
        let threadInstance = await three.space.joinThreadByAddress(thread.address)
        console.log(thread.address)
        let posts = await threadInstance.getPosts()
        setThreadAndPosts({threadInstance, posts})

        let members = await threadInstance.listMembers()
        console.log('Members: ', members)
    }

    const uploadAndPostFiles = async e => {
        let file = e.target.files[0]
        if (file.type === 'image/jpeg' || file.type === 'image/jpeg') {
            setMessage('Successfully uploaded picture!')
            handleShowSnackbar(true)
            await handleEncodeAndPostFile(file)
        } else { 
            setMessage('Wrong file type - only jpeg or png')
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

    const handleEmailChange = e => {
        setEmail(e.target.value)
    }

    const handleEmailSubmit = async () => {
        const baseUrl = 'http://localhost:3000/accept-invite'
        const joinUrl = baseUrl + `/${three.data.publicAddress}/${threadAndPosts.threadInstance.address.slice(9)}`
        const recepientEmail = email
        const collectionName = threadAndPosts.threadInstance.address.slice(86)
        const sender = three.data.email
        const senderAddress = three.data.publicAddress

        let data = {joinUrl, recepientEmail, collectionName, sender, senderAddress}
        console.log('before')
        let req = await axios.post('http://localhost:1000/api/share/send-invite-email', data)
        console.log('here!!')
        setMessage('Successfully shared collection!')
        handleShowSnackbar(true)
        setEmail('')
        console.log(req)


    }

    return (
        <Cont>
            <SnackBar className={openSnack} success={uploadSuccess} message={message}/>
            <Left>
                <ThreadsBox>
                    <ThreadInput createNewThread={createNewThread}/>
                    <ThreadList 
                        selectedThread={threadAndPosts}
                        threads={threads}
                        selectThread={selectThread}/>

                    </ThreadsBox>

                {
                    threadAndPosts.threadInstance ?
                    <ShareBox>
                        <Title>Share Collection</Title>
                        <Input 
                            type="text" 
                            name="text" 
                            value={email}
                            placeholder="Email address" 
                            onChange={handleEmailChange}/>
                        <Button onClick={handleEmailSubmit}>
                            <ButtonText>
                                Send invite
                            </ButtonText>
                        </Button>
                    </ShareBox>
                    :
                    null
                }
                

            </Left>

            <Right>
                {
                    threadAndPosts.threadInstance ?
                    <Fragment>
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
    align-items: center;
    justify-content: space-between;
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
    font-size: 22px;
    font-weight: 500;
`;

const ThreadsBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ShareBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  border-radius: 5px;
  height: 55px;
  width: 80%;
  margin: 5%;
  background-color: rgba(197, 255, 220, 1);
  box-shadow: 0 0 10px rgba(0,0,0,0.1); 
  :hover {
    box-shadow: 0 0 10px rgba(0,0,0,0.15); 
  }
`;

export const ButtonText = styled.p`
  color: rgb(80, 80, 80);
  font-family: 'Montserrat';
  font-size: 18px;
  font-weight: 500;
`;

export const Input = styled.input`
    margin-top: 5%;
    padding-left: 5%;
    width: 80%;
    height: 55px;
    box-sizing: border-box;
    outline: none;
    border: 0px solid #FFF;
    border-radius: 5px;
    font-family: 'Montserrat';
    font-size: 15px;
    font-weight: 400;
    text-align: left;
    background: rgba(229, 238, 244, 0.1);
    box-shadow: 0 3px 5px rgba(0,0,0,0.1);     

    ::placeholder,
    ::-webkit-input-placeholder {
        color: rgb(80, 80, 80);
        font-family: 'Montserrat';
        font-size: 15px;
        font-weight: 300;
        font-style: italic;
    }
`;