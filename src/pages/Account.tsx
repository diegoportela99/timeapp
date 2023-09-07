//import React from 'react'
import AccountDisplay from "../components/AccountDisplay"
import { unAuthRedirect } from "../tsxFunctions"


const Account = (props: any) => {

  return (
    <div>
      {!props.loggedState ? unAuthRedirect() : <AccountDisplay />}

    </div>
  )
}

export default Account