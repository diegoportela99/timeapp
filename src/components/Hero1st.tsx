// import React from 'react'
import styled from 'styled-components';
import { isLoggedIn } from '../functions'
import { signInWithGoogle } from './Hero';

'use client'

import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'

const Button = styled.button`
color: white;
font-size: auto;
padding: 10px;
border-radius: 5px;
margin: 10px 0px;
cursor: pointer;
transition:  0.25s;
border-radius: 8px;
width: 200px
`;

const Hero1st = (props:any) => {
  return (
    //   <div className='mx:auto text-center flex flex-col justify-center text-[#ffffffe1] bg-white bg-opacity-0 h-[96vh]'>
    //       <p className='text-pink-500 font-bold md:text-3xl'>TEST STRING</p>
    //       <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6 drop-shadow-[0_2.2px_2.2px_rgba(0,0,0,1)]'>string 2 but longer</h1>
    //       <div className='flex justify-center items-center'>
    //           <p className='md:text-5xl sm:text-4xl text-xl font-bold drop-shadow-[0_2.2px_2.2px_rgba(0,0,0,1)]'>yet another test string</p>
    //           {/* <Typed className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2 drop-shadow-[0_2.2px_2.2px_rgba(0,0,0,1)]' strings={['Test', 'Best', 'Nest']} typeSpeed={120} backSpeed={140} loop /> */}
    //       </div>
    //       <p className='md:text-2xl text-xl font-bold text-[#ff30cb] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]'>Even more text haebaerolkgnaregl</p>
    //       <ul className='font-medium mx-auto'>
    //           <li>
    //               <Button className='shadow-md bg-gradient-to-r from-green-400 to-primary-500 hover:from-pink-500 hover:to-yellow-500' onClick={() => signInWithGoogle(props)} disabled={isLoggedIn()}>Sign in with Google</Button>
    //           </li>
    //       </ul>
    //   </div>
      <>
          <Container maxW={'8xl'} h={'calc(94vh)'} p={20} mt={'12%'}>
              <Stack
                  as={Box}
                  textAlign={'center'}
                  color={useColorModeValue('textLight.100', 'textDark.900')}
                  bg={useColorModeValue("bgLight.100", "bgDark.900")}
                  rounded={'3xl'}
                  shadow={'mainShadow'}
                  spacing={{ base: 8, md: 14 }}
                  py={{ base: 10, md: 26 }}
                  px={{ base: 10, md: 26 }}
                  >
                  <Heading
                      fontWeight={700}
                      fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                      lineHeight={'110%'}
                  >
                      Gamified to-do list with powerful features.
                  </Heading>
                  <Text
                  fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
                  >
                    Start your journey of self discipline and productivity with [name of app (trek?)].
                  </Text>
                  <ul className='font-medium mx-auto'>
                      <li>
                          <Button className='shadow-md bg-gradient-to-r from-green-400 to-primary-500 hover:from-pink-500 hover:to-yellow-500' onClick={() => signInWithGoogle(props)} disabled={isLoggedIn()}>Sign in with Google</Button>
                      </li>
                  </ul>
              </Stack>
          </Container>
      </>
  )
}

export default Hero1st