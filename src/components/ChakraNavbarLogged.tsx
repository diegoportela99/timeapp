'use client'

import {
    Box,
    Flex,
    Button,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    IconButton,
    HStack,
    Drawer,
    DrawerOverlay,
    DrawerHeader,
    DrawerContent,
    DrawerBody,
    Menu,
    MenuButton,
    Avatar,
    MenuList,
    Center,
    MenuDivider,
    MenuItem,
    Link,
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { GrGoogle } from 'react-icons/Gr'
import { signOutWithGoogle } from './Hero'
import { getFirstName, readImageURL } from '../functions'
import mountain from '../assets/mountain1.1.jpg'

// interface Props {
//   children: React.ReactNode
// }

const NavLink = (link: any) => {

    return (
        <>
            <Box
                as="a"
                px={2}
                py={1}
                color={useColorModeValue('textLight.100', 'textDark.900')}
                rounded={'md'}
                fontWeight={'medium'}
                _hover={{
                    bg: useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)'),
                }}
                href={link.address}>
                {link.children}
            </Box>
        </>
    )
}

const SideBarLink = (link: any) => {

    return (
        <>
            <Box
                as="a"
                px={2}
                py={1}
                color={useColorModeValue('black', 'white')}
                rounded={'md'}
                _hover={{
                    bg: useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)'),
                  }}
                href={link.address}>
                {link.children}
            </Box>
        </>
    )
}

const Links = [
    { name: 'Tasks', address: '/' },
    { name: 'Focus', address: './focus' },
    { name: 'Analytics', address: './analytics' }
]


const ChakraNavbarLogged = (props: any) => {
    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Box bg={useColorModeValue('bgLight.100', 'bgDark.900')} px={4} position={'fixed'} w={'100%'} zIndex={9999}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'} maxW={{base: '', md:'80%'}} ml={{base:'0%', md:'10%'}}>


                    <HStack spacing={4} alignItems={'center'}>
                        <IconButton
                            size={'md'}
                            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                            aria-label={'Open Menu'}
                            display={{ md: 'none' }}
                            onClick={isOpen ? onClose : onOpen}
                            _hover={{
                                bg: useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)'),
                            }}
                        />
                        <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader borderBottomWidth='1px'>
                                    <Button
                                        variant={'solid'}
                                        color={useColorModeValue('textLight.100', 'textDark.900')}
                                        bg={useColorModeValue('bgLight.100', 'bgDark.900')}
                                        _hover={{
                                            bg: useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)'),
                                        }}
                                        size={'sm'}
                                        mr={4}
                                        py={6}
                                        leftIcon={
                                            <Avatar
                                                size={'sm'}
                                                src={mountain}
                                            />}
                                    >
                                        LOGO
                                    </Button>
                                </DrawerHeader>
                                <DrawerBody>
                                    <Stack>
                                        {Links.map((link: any) => (
                                            <SideBarLink key={link.name} address={link.address}>{link.name}</SideBarLink>
                                        ))}
                                    </Stack>
                                </DrawerBody>
                            </DrawerContent>
                        </Drawer>
                        <Button
                            as='a'
                            variant={'solid'}
                            color={useColorModeValue('textLight.100', 'textDark.900')}
                            bg={useColorModeValue('bgLight.100', 'bgDark.900')}
                            _hover={{
                                bg: useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)'),
                            }}
                            size={'sm'}
                            mr={2}
                            ml={-2}
                            py={6}
                            leftIcon={
                                <Avatar
                                    size={'sm'}
                                    src={mountain}
                                />}
                                href='/'
                        >
                            LOGO
                        </Button>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link: any) => (
                                <NavLink key={link.name} address={link.address}>{link.name}</NavLink>
                            ))}
                        </HStack>
                    </HStack>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={3}>
                            <Button
                                variant={'solid'}
                                colorScheme={'gray'}
                                size={'sm'}
                                mt={1}
                                mr={-2}
                                onClick={() => signOutWithGoogle(props)}
                                bg={useColorModeValue('rgba(0,0,0,0)', 'rgba(255,255,255,0)')}
                                _hover={{
                                    bg: useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)'),
                                }}
                                leftIcon={<GrGoogle />}>
                                Sign out
                            </Button>
                            <Button 
                                onClick={toggleColorMode}
                                bg={useColorModeValue('rgba(0,0,0,0)', 'rgba(255,255,255,0)')}
                                _hover={{
                                    bg: useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)'),
                                }}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>


                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={readImageURL()}
                                    />
                                </MenuButton>
                                <MenuList alignItems={'center'} bg={useColorModeValue('bgLight.100', 'bgDark.900')}>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                            src={readImageURL()}
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        <p>{getFirstName()}</p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    <MenuItem
                                        bg={useColorModeValue('bgLight.100', 'bgDark.900')}
                                        _hover={{
                                            bg: useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)'),
                                        }}>
                                        <Link 
                                        href='/account'
                                        _hover={{
                                            textDecoration: 'none',
                                        }}>
                                            Account
                                        </Link>
                                    </MenuItem>
                                    <MenuItem
                                        bg={useColorModeValue('bgLight.100', 'bgDark.900')}
                                        _hover={{
                                            bg: useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)'),
                                        }}
                                        onClick={() => signOutWithGoogle(props)}>
                                            Sign Out
                                        </MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

export default ChakraNavbarLogged