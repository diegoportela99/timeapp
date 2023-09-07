// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
// import { signOutWithGoogle } from './Hero'
// import styled from 'styled-components'
import ChakraNavbar from './ChakraNavbar'
import ChakraNavbarLogged from './ChakraNavbarLogged'

// const Button = styled.button`
// color: white;
// font-size: auto;
// padding: 5px;
// border-radius: 5px;
// margin: 10px 0px;
// cursor: pointer;
// transition:  0.25s;
// width: 100px
// `;

const Navbar = (props: any) => {
  // const [nav, setNav] = useState(true)

  // const handleNav = () => {
  //   setNav(!nav)
  // }

  return (
    <>
      {!props.loggedState ?
        // <div className='shadow-md pb-2'>
        //   <div className='flex justify-between items-center h-[70px] max-w-[1240px] mx-auto px-4 p-4'>
        //     <div className='w-full text-4xl font-bold p-4 text-center'>
        //       <Link className=' text-white duration-[350ms] hover:tracking-[.05em] hover:text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-400' to='/'>Navbar (w/ logo)</Link>
        //     </div>
        //   </div>
        // </div>
        <ChakraNavbar setLoggedState={props.setLoggedState} />
        :
        // 'bg-gradient-to-t from-blue-100 to-white'


        // <div className='bg-black bg-opacity-0'>
        //   <div className='flex justify-between items-center h-[70px] max-w-[1240px] mx-auto px-4 p-4 text-white'>
        //     {/* #6b46c1 replacement for purple-700 ? */}
        //     <div className='w-full text-3xl font-bold p-4'>
        //       <Link className=' text-primary-600 duration-[250ms] hover:text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500' to='/'>Navbar</Link>
        //     </div>
        //     <ul className='hidden md:flex text-black font-medium'>
        //       <Link to='/'>
        //         <button className='p-4 hover:text-[#ff2aed] duration-[100ms] hover:bg-gray-300 rounded-3xl'>Tasks</button>
        //       </Link>
        //       <Link to='./focus'>
        //         <button className='p-4 hover:text-[#ff2aed] duration-[100ms] hover:bg-gray-300 rounded-3xl'>Focus</button>
        //       </Link>
        //       <Link to='./analytics'>
        //         <button className='p-4 hover:text-[#ff2aed] duration-[100ms] hover:bg-gray-300 rounded-3xl'>Analytics</button>
        //       </Link>
        //       <Link to='./account'>
        //         <button className='p-4 hover:text-[#ff2aed] duration-[100ms] hover:bg-gray-300 rounded-3xl'>Account</button>
        //       </Link>
        //     </ul>
        //     <ul className='font-medium'>
        //       <li className='px-2'><Button className='bg-gradient-to-r from-green-400 to-primary-500 hover:from-pink-500 hover:to-yellow-500' onClick={() => signOutWithGoogle(props)}>Sign out</Button></li>
        //     </ul>
        //     <div onClick={handleNav} className='block md:hidden p-4'>
        //       {!nav ? <AiOutlineClose size={20} className='text-black duration-[100ms] hover:bg-gray-300 rounded' /> : <AiOutlineMenu size={20} className='text-black duration-[100ms] hover:bg-gray-300 rounded' />}
        //     </div>
        //     <div className={!nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-pink-500 bg-gradient-to-t from-blue-100 to-white text-black ease-in-out duration-500' : 'fixed left-[-200%]'}>
        //       <div className='w-full text-3xl font-bold p-4 m-4'>
        //         <Link className=' text-primary-600 duration-[250ms] hover:text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500' to='/'>Navbar</Link>
        //       </div>
        //       <ul className='p-4'>
        //         <Link onClick={handleNav} to='/'>
        //           <button className='p-4 duration-[100ms] hover:bg-gray-300 rounded-xl w-full text-left'>Tasks</button>
        //         </Link>
        //         <li className='py-1 border-b border-pink-500'></li>
        //         <li className='pb-2'></li>
        //         <Link onClick={handleNav} to='./focus'>
        //           <button className='p-4 duration-[100ms] hover:bg-gray-300 rounded-xl w-full text-left'>Focus</button>
        //         </Link>
        //         <li className='py-1 border-b border-pink-500'></li>
        //         <li className='pb-2'></li>
        //         <Link onClick={handleNav} to='./analytics'>
        //           <button className='p-4 duration-[100ms] hover:bg-gray-300 rounded-xl w-full text-left'>Analytics</button>
        //         </Link>
        //         <li className='py-1 border-b border-pink-500'></li>
        //         <li className='pb-2'></li>
        //         <Link onClick={handleNav} to='./account'>
        //           <button className='p-4 duration-[100ms] hover:bg-gray-300 rounded-xl w-full text-left'>Account</button>
        //         </Link>
        //         <li className='py-1 border-b border-pink-500'></li>
        //         <li className='py-4'><Button className='bg-gradient-to-r from-green-400 to-primary-500 hover:from-pink-500 hover:to-yellow-500' onClick={() => signOutWithGoogle(props)}>Sign out</Button></li>
        //       </ul>
        //     </div>
        //   </div>
        // </div>

        <ChakraNavbarLogged setLoggedState={props.setLoggedState} />

      }

    </>

  )
}

export default Navbar