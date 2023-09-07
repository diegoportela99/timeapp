//import React from 'react'
import FocusMode from '../components/FocusMode'
import { unAuthRedirect } from '../tsxFunctions'


const Focus = (props: any) => {

  return (
    <div>
      {!props.loggedState ? unAuthRedirect() : <FocusMode />}
    </div>
  )
}

export default Focus