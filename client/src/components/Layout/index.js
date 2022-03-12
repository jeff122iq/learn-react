import React, { useContext } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import StateContext from '../../store/StateContext'

export default function Layout ({ children }) {
  const globalState = useContext(StateContext)

  return (
    <>
      <Header loggedIn={globalState.loggedIn}/>
      {children}
      <Footer/>
    </>
  )
};