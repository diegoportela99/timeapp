'use client'

import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  HStack,
  Avatar,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { BsGoogle } from 'react-icons/Bs'
import { signInWithGoogle } from './Hero'
import { isLoggedIn } from '../functions'
import mountain from '../assets/mountain1.1.jpg'

// interface Props {
//   children: React.ReactNode
// }

const ChakraNavbar = (props: any) => {
  const { colorMode, toggleColorMode } = useColorMode()


  return (
    <>
      <Box bg={useColorModeValue('rgba(255,255,255,0)', 'rgba(20,18,20,0)')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={2} alignItems={'center'}>
            <Button
              variant={'solid'}
              color={useColorModeValue('textLight.100', 'textDark.900')}
              bg={useColorModeValue('bgLight.100', 'bgDark.900')}
              size={'sm'}
              mr={4}
              py={6}
              leftIcon={
              <Avatar
                size={'sm'}
                src={mountain}
              />}
              _hover={{
                bg: useColorModeValue('white', 'rgba(255,255,255,0.3)'),
                color:'black',
              }}
              >
              LOGO
            </Button>
            {/* <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link: any) => (
                <NavLink key={link.name} address={link.address}>{link.name}</NavLink>
              ))}
            </HStack> */}
          </HStack>




          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={2}>
              <Button
                variant={'solid'}
                colorScheme={'gray'}
                bg={useColorModeValue('bgLight.100', 'bgDark.900')}
                size={'sm'}
                mt={1}
                onClick={() => signInWithGoogle(props)} disabled={isLoggedIn()}
                leftIcon={<BsGoogle />}
                _hover={{
                  bg: useColorModeValue('white', 'rgba(255,255,255,0.3)'),
                  color:'black',
                }}
                >
                Sign in with google
              </Button>

              <Button 
              onClick={toggleColorMode} 
              bg={useColorModeValue('bgLight.100', 'bgDark.900')} 
              color={useColorModeValue('textLight.100', 'textDark.900')}
              _hover={{
                bg: useColorModeValue('white', 'rgba(255,255,255,0.3)'),
                color:'black',
              }}
              >
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default ChakraNavbar