import React from 'react'
import HeaderLoggedOut from '../HeaderLoggedOut'
import HeaderLoggedIn from '../HeaderLoggedIn'

export default function Header ({loggedIn}) {
  return (
    <div>
      {loggedIn ? <HeaderLoggedIn/> : <HeaderLoggedOut/>}
      {/**/}
    </div>
  )
};