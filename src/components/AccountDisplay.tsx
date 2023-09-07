//import React from 'react'
import { Flex, useColorModeValue } from '@chakra-ui/react'
import { getFirstName, readDisplayName, readEmail, readImageURL } from '../functions'
import styled from 'styled-components'


const Img = styled.img`
border-radius: 50%; 
width: auto;
height: auto;
`


const AccountDisplay = () => {

    return (
        <>
            <Flex p={4} bg={useColorModeValue('white', '#141214')} textAlign={'center'} flexDir={'column'}>
                <div className='text-center'>
                    Hello {getFirstName()}
                </div>
                <ul className='text-left'>
                    <li>Account info</li>
                    <li>Name: {readDisplayName()}</li>
                    <li>Email: {readEmail()}</li>
                    <li><Img src={readImageURL()} /></li>
                </ul>
            </Flex>



            <div className='h-screen'></div>
        </>
    )
}

export default AccountDisplay