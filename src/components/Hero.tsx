//import React, { useEffect } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, setPersistence, browserSessionPersistence } from 'firebase/auth'
import { writeUserData } from '../config/config'
import Hero2nd from './Hero2nd'
import { Flex } from '@chakra-ui/react'
import { useRef } from 'react'
import About from './About'
import Hero1st from './Hero1st'
import Hero3rd from './Hero3rd'


export const signOutWithGoogle = async (props: any) => {

    const auth = getAuth()

    signOut(auth).then(() => {
        console.log("signed out")
        sessionStorage.removeItem("displayName")
        sessionStorage.removeItem("email")
        sessionStorage.removeItem("uid")
        sessionStorage.removeItem("imageURL")
        sessionStorage.removeItem("taskAmount")
        props.setLoggedState(false)
    }) .catch((error) => {
        console.log(error)
    })

}

export const signInWithGoogle = async (props:any) => {
    
    const auth = getAuth()
    // const navigate = useNavigate()

    setPersistence(auth, browserSessionPersistence).then(() => {
        return(signInWithPopup(auth, new GoogleAuthProvider())
        .then(async response => {
            console.log(response.user.uid)
            console.log(response.user.displayName)
            console.log(response.user.email)

            sessionStorage.setItem("displayName", response.user.displayName || '')
            sessionStorage.setItem("email", response.user.email || '')
            sessionStorage.setItem("uid", response.user.uid || '')
            sessionStorage.setItem("imageURL", response.user.photoURL || '')

            writeUserData(response.user.uid, response.user.displayName as string, response.user.email as string, response.user.photoURL as string)

            // sessionStorage.setItem("taskAmount", await test())
            
            props.setLoggedState(true)
            // navigate('/')
        })
        .catch(error => {
            console.log(error)
        }))
    })
}

const Hero = (props: any) => {


    const resultRef = useRef(null);
    // console.log(resultRef.current)


    return (
        <>
            <Hero1st setLoggedState={props.setLoggedState} />

            <Flex>
                {/* {<Hero2nd resultRef={resultRef} />} */}

                {/* This is not the proper way but above doesnt work for some reason */}
                {Hero2nd(resultRef, props)}

            </Flex>

            <div className='text-white text-center text-2xl bg-[#292929] py-40'>
                Something here
            </div>

            <Hero3rd />

            {<About ref={resultRef} />}

        </>
    )
}

export default Hero