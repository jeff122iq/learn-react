import React, { useState, useContext } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from "axios"
import DispatchContext from '../../store/DispatchContext'
import StateContext from '../../store/StateContext'

export default function CreatePost () {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/create-post', {title, body, token: appState.user.token})
      appDispatch({ type: 'FLASH_MESSAGE', value: "Post was created!" })
      navigate(`/post/${response.data}`)
    } catch(e) {
      alert(e.message)
      return e
    }
  }

  return (
    <div className="container container--narrow py-md-5">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input autoFocus
                 onChange={(e) => setTitle(e.target.value)}
                 name="title"
                 id="post-title"
                 className="form-control form-control-lg form-control-title"
                 type="text"
                 placeholder=""
                 autoComplete="off"/>
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea name="body"
                    id="post-body"
                    className="body-content tall-textarea form-control"
                    onChange={(e) => setBody(e.target.value)}
                    type="text"/>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </div>
  )
};