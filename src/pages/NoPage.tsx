import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader"



const NoPage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      setLoading(true)
      setTimeout(() => {
        navigate('/')
        setLoading(false)
      }, 3000)
    }, [])
  
    return (
      <div className="bg-white bg-opacity-70 p-40 mt-4 rounded-3xl text-black justify-center text-center font-bold h-screen mx-40">
        <p className='lg:text-4xl text-3xl'>NO PAGE FOUND :(</p>
        <p className="text-xl mt-20">Redirecting<p className="">{loading ? <ClipLoader color="#000000" size={20} /> : ""}</p></p>
      </div>
    )
}

export default NoPage