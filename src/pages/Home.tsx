//import React from 'react'
import Hero from '../components/Hero'
import TaskList from '../components/TaskList'


const Home = (props: any) => {

  return (
    <>
      <div>
        {!props.loggedState ? <Hero setLoggedState={props.setLoggedState} /> : <TaskList />}
      </div>
    </>
  )
}

export default Home