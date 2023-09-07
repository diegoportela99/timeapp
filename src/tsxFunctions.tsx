import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
// import Typed from 'react-typed'


export function unAuthRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 10)
  }, [])

  return (<div></div>)

  // return (<div className='lg:text-4xl text-2xl font-bold text-[#b78bff] justify-center text-center my-40'>Unauthorised. Please log in. Redirecting
  // <Typed className='lg:text-4xl text-2xl font-bold text-[#b78bff] justify-center text-center my-40' strings={['.', '..', '...']} typeSpeed={120} loop />
  // </div>)

}

