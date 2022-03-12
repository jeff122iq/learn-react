import React, { useEffect, useState, useReducer } from 'react'
import Home from '../src/pages/Home'
import About from '../src/pages/About'
import HomeGuest from '../src/pages/HomeGuest'
import Terms from '../src/pages/Terms'
import CreatePost from '../src/pages/CreatePost'
import SinglePost from '../src/pages/SinglePost'
import Profile from '../src/pages/Profile'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import Layout from '../src/components/Layout'
import FlashMessages from '../src/components/FlashMessages'
import axios from 'axios'
import { useImmerReducer } from 'use-immer'
import DispatchContext from "../src/store/DispatchContext"
import StateContext from "../src/store/StateContext"
import { initialState, reducer } from '../src/store'
axios.defaults.baseURL = 'http://localhost:5000'

function App () {
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem('complexappToken', state.user.token)
      localStorage.setItem('complexappUsername', state.user.username)
      localStorage.setItem('complexappAvatar', state.user.avatar)
    } else {
      localStorage.clear()
    }
  }, [state.loggedIn])

  return (
    <div className="App">
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages}/>
          <Layout loggedIn={state.loggedIn}>
            {
              state.loggedIn ?
                <Routes>
                  <Route path="/" element={localStorage.getItem('complexappToken') ? <Home/> : <HomeGuest/>}/>
                  <Route path="/about-us" element={<About/>}/>
                  <Route path="/terms" element={<Terms/>}/>
                  <Route path="/create-post" element={<CreatePost/>}/>
                  <Route path="/post/:id" element={<SinglePost/>}/>
                  <Route path="/profile/:username" element={<Profile/>}/>
                </Routes>
                :
                <Routes>
                  <Route path="/" element={localStorage.getItem('complexappToken') ? <Home/> : <HomeGuest/>}/>
                  <Route path="/about-us" element={<About/>}/>
                  <Route path="/terms" element={<Terms/>}/>
                  <Route path="*" element={<Navigate replace to="/"/>}/>
                </Routes>
            }
          </Layout>
        </BrowserRouter>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </div>

  )
}

export default App
