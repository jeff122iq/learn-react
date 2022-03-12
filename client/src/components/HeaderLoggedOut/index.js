import React, { useContext, useState } from 'react'
import axios from 'axios'
import DispatchContext from '../../store/DispatchContext'

export default function HeaderLoggedOut () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const appDispatch = useContext(DispatchContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/login', { username, password })
      appDispatch({type: 'LOG_IN', data: response.data})
    } catch (e) {
      console.log(e)
      setError(e.message)
      setError('')
      return e
    }
  }

  return (
    <>
      {error.length ? alert(error) : ''}
      <header className="header-bar bg-primary mb-3">
        <div className="container d-flex flex-column flex-md-row align-items-center p-3">
          <h4 className="my-0 mr-md-auto font-weight-normal">
            <a href="/" className="text-white">
              ComplexApp
            </a>
          </h4>
          <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
            <div className="row align-items-center">
              <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                <input name="username"
                       onChange={(e) => setUsername(e.target.value)}
                       className="form-control form-control-sm input-dark"
                       type="text"
                       placeholder="Username"
                       autoComplete="off"/>
              </div>
              <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                <input name="password"
                       onChange={(e) => setPassword(e.target.value)}
                       className="form-control form-control-sm input-dark"
                       type="password"
                       placeholder="Password"/>
              </div>
              <div className="col-md-auto">
                <button className="btn btn-success btn-sm">Sign In</button>
              </div>
            </div>
          </form>
        </div>
      </header>
    </>
  )
};