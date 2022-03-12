import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DispatchContext from '../../store/DispatchContext'
import StateContext from '../../store/StateContext'

export default function HeaderLoggedIn ( ) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const handleLoggedOut = () => {
    appDispatch({ type: 'LOG_OUT' })
  }

  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            ComplexApp
          </Link>
        </h4>
        <div className="flex-row my-3 my-md-0">
          <Link to="/" className="text-white mr-2 header-search-icon">
            <i className="fas fa-search"/>
          </Link>
          <span className="mr-2 header-chat-icon text-white">
            <i className="fas fa-comment"/>
            <span className="chat-count-badge text-white"> </span>
          </span>
          <Link to={`/profile/${appState.user.username}`} className="mr-2">
          <img className="small-header-avatar"
               src={appState.user.avatar} alt={''}/>
        </Link>
          <Link className="btn btn-sm btn-success mr-2" to="/create-post">
            Create Post
          </Link>
          <button className="btn btn-sm btn-secondary" onClick={handleLoggedOut}>
            Sign Out
          </button>
        </div>
      </div>
    </header>
  )
};