//import React from 'react'
import { unAuthRedirect } from '../tsxFunctions'
import AnalyticsDisplay from '../components/AnalyticsDisplay'


const Analytics = (props:any) => {
  return (
    <div>
      {!props.loggedState ? unAuthRedirect() : <AnalyticsDisplay />}
    </div>
  )
}

export default Analytics