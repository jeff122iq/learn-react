import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../components/Loader'

export default function ProfilePosts () {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const { username } = useParams()

  useEffect(() => {
    const fetchPost = async() => {
      try {
        const response = await axios.get(`/profile/${username}/posts`)
        setIsLoading(!isLoading)
        setPosts(response.data)
      } catch(e) {
        console.log(e.message)
        return e
      }
    }
    fetchPost()
  }, [])

  if (isLoading) return <Loader/>

  return (
    <div className="list-group">
      {
        posts.map(item => {
          const date = new Date(item.createdDate)
          const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
          return (
            <Link to={`/post/${item._id}`} className="list-group-item list-group-item-action" key={item._id}>
              <img className="avatar-tiny" src={item.author.avatar} alt=''/>
              <strong>{item.title}</strong>{" "}
              <span className="text-muted small">on {dateFormatted}</span>
            </Link>
          )
        })
      }

      {/*<a href="#" className="list-group-item list-group-item-action">*/}
      {/*  <img className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" alt=''/>*/}
      {/*  <strong>Example Post #2</strong>*/}
      {/*  <span className="text-muted small">on 2/10/2020 </span>*/}
      {/*</a>*/}
      {/*<a href="#" className="list-group-item list-group-item-action">*/}
      {/*  <img className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" alt=''/>*/}
      {/*  <strong>Example Post #3</strong>*/}
      {/*  <span className="text-muted small">on 2/10/2020 </span>*/}
      {/*</a>*/}
    </div>
  )
};