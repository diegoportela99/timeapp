//import React from 'react'
//import mountain from '../assets/maxmountain.png'

'use client'

import { Avatar, Box, Container, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import mountain from '../assets/mountain1.1.jpg'

function FooterComponent() {

    return (
        <Box
            bg={useColorModeValue('bgLight.100', 'bgDark.900')}
            color={useColorModeValue('gray.800', 'textDark.900')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={8}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Stack direction={'row'} spacing={6}>
                    <Avatar
                        size={'sm'}
                        src={mountain}
                    />
                    <Box as="a" href={'/'}>
                        Home
                    </Box>
                    <Box as="a" href={'#about'}>
                        About
                    </Box>
                </Stack>
                <Text color={useColorModeValue('gray.800', 'textDark.900')}>Timeapp footer text</Text>
            </Container>
        </Box>
    )
}

function FooterComponentLogged() {
    return (
        <Box
            bg={useColorModeValue('bgLight.100', 'bgDark.900')}
            color={useColorModeValue('textLight.100', 'textDark.900')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={8}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Stack direction={'row'} spacing={6}>
                    <Avatar
                        size={'sm'}
                        src={mountain}
                    />
                    <Box as="a" href={'/'}>
                        Tasks
                    </Box>
                    <Box as="a" href={'/focus'}>
                        Focus
                    </Box>
                    <Box as="a" href={'/analytics'}>
                        Analytics
                    </Box>
                    <Box as="a" href={'/Account'}>
                        Account
                    </Box>
                </Stack>
                <Text>Timeapp logged in footer text</Text>
            </Container>
        </Box>
    )
}

const Footer = (props:any) => (
    // <section>
    //     <div className='flex justify-center p-20 mx:auto text-center static text-white bg-[#242424]'>
    //         <ul>
    //             {/* <li><img src={mountain} /></li> */}
    //             {/* <li className='bg-blue-400'>This is a footer</li> */}
    //             <li>This is a footer</li>
    //         </ul>
    //     </div>
    // </section>
    <>

        {!props.loggedState ?

            <FooterComponent />

            :

            <FooterComponentLogged />

        }

    </>

)

export default Footer