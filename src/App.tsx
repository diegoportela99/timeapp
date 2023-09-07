import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Account from './pages/Account'
import Home from './pages/Home'
import NoPage from './pages/NoPage'
// import { initializeApp } from 'firebase/app'
// import { config } from './config/config'
import Footer from './components/Footer'
import Analytics from './pages/Analytics'
import Focus from './pages/Focus'
import { isLoggedIn } from './functions'
import InvisNavbar from './components/InvisNavbar'
// import { getFirestore } from "firebase/firestore"


// const app = initializeApp(config.firebaseConfig);
// export const firestoreDB = getFirestore(app)


const App = () => {

  const [loggedState, setLoggedState] = useState(isLoggedIn())

  function test2() {
    if (!loggedState) {
      return ("bg-[url('./assets/mountain-bg-phone.jpg')] bg-no-repeat bg-cover bg-top sm:bg-[url('./assets/mountain-bg-cropped2.jpg')] bg-cover bg-fixed")
    } else {
      return ("bg-[url('./assets/mountain-bg2-cropped.jpg')] bg-cover bg-[center_top_2rem] bg-no-repeat")
    }
  }

  return (
    <>
      <div className={test2()}>
        <div>
          <Navbar setLoggedState={setLoggedState} loggedState={loggedState} />
          <InvisNavbar />
        </div>
        {/* <div className='max-w-[1240px] mx-auto px-8 mt-4'> */}
        <div>
          <Routes>
            {/* <Route path='/' element={<Navbar />} /> */}
            <Route index element={<Home setLoggedState={setLoggedState} loggedState={loggedState} />} />
            <Route path="Account" element={<Account loggedState={loggedState} />} />
            <Route path="Focus" element={<Focus loggedState={loggedState} />} />
            <Route path="Analytics" element={<Analytics loggedState={loggedState} />} />
            <Route path='*' element={<NoPage />} />
          </Routes>
        </div>
        
      </div>
      <div>
        <Footer loggedState={loggedState} />
      </div>
    </>
  )
}

export default App
