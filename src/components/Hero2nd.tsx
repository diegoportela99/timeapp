'use client'

import {
  Container,
  Stack,
  Text,
  Button,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react'
import { signInWithGoogle } from './Hero'


const Hero2nd = (resultRef:any, props:any) => {

    const scrollHook = () => {
        resultRef.current.scrollIntoView({ behavior: "smooth" })
        // console.log("weg f:   " + resultRef.current)
    }

  return (
      <Flex w={'100%'} bg={useColorModeValue("bgLight.100", "bgDark.900")}>
          <Container maxW={'5xl'}>
              <Stack
                  textAlign={'center'}
                  align={'center'}
                  spacing={{ base: 8, md: 10 }}
                  py={{ base: 20, md: 28 }}>
                  <Text
                      fontWeight={600}
                      fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                      color={useColorModeValue('textLight.100', 'textDark.900')}
                      lineHeight={'110%'}>
                      Task management{' '}
                      <Text as={'span'} color={'blue.500'}>
                          made easy
                      </Text>
                  </Text>
                  <Text color={useColorModeValue('textLight.100', 'textDark.900')} maxW={'3xl'}>
                      The secret to living a productive life. Keep track of your day-to-day tasks and
                      receive bonuses for completing them. Assess your progress in our “Analytics”
                      tab.
                  </Text>
                  <Stack spacing={6} direction={'row'}>
                      <Button
                          rounded={'full'}
                          px={6}
                          color={'black'}
                          bg={'blue.500'}
                          _hover={{ bg: 'blue.600' }}
                          onClick={() => signInWithGoogle(props)}>
                          Get started
                      </Button>
                      <Button 
                          rounded={'full'}
                          px={6}
                          color={useColorModeValue('black', 'black')}
                          bg={'gray.300'}
                          _hover={{ bg: 'gray.400' }}
                          onClick={() => scrollHook()}>
                          Learn more
                      </Button>
                  </Stack>
              </Stack>
          </Container>
      </Flex>
  )
}

export default Hero2nd