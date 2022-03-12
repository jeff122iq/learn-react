import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

export default function SinglePost () {
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState()
  const date = new Date(post && post.createdDate)
  const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  const { id } = useParams()

  useEffect(() => {
    const ourRequest = axios.CancelToken.source()

    const fetchPost = async() => {
      try {
        const response = await axios.get(`/post/${id}`, { cancelToken: ourRequest.token })
        setIsLoading(!isLoading)
        setPost(response.data)
      } catch(e) {
        console.log(e.message)
        return e
      }
    }
    fetchPost()
    return () => {
      ourRequest.cancel()
    }
  }, [])

  if (isLoading) return <Loader/>

  return (
    <>
    {
      post &&

      <div className="container container--narrow py-md-5">
        <div className="d-flex justify-content-between">
          <h2>{post.title}</h2>
          <span className="pt-2">
          <a href="#" className="text-primary mr-2" title="Edit"><i className="fas fa-edit"/></a>
          <a className="delete-post-button text-danger" title="Delete"><i className="fas fa-trash"/></a>
        </span>
        </div>

        <p className="text-muted small mb-4">
          <Link to={`/profile/${post.author.username}`}>
            <img className="avatar-tiny" src={post.author.avatar} alt={''}/>
          </Link>
          Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on {dateFormatted}
        </p>

        <div className="body-content">
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </div>
      </div>
    }
    </>
  )
};