import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import StateContext from '../../store/StateContext'
import axios from 'axios'
import ProfilePosts from '../../components/ProfilePosts'

export default function Profile () {
  const [profileData, setProfileData] = useState({
    profileUsername: '',
    profileAvatar: '',
    isFollowing: false,
    counts: {
      postCount: '',
      followerCount: '',
      followingCount: '',
    }
  })
  const { username } = useParams()
  const appState = useContext(StateContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/profile/${username}`, {token: appState.user.token})
        setProfileData(response.data)
      } catch (e) {
        alert(e.message)
        return e
      }
    }
    fetchData()
  }, [])

  return (
    <div className="container container--narrow py-md-5">
      <h2>
        <img className="avatar-small" src={profileData.profileAvatar} alt=''/>
        {username}
        <button className="btn btn-primary btn-sm ml-2">Follow <i className="fas fa-user-plus"/></button>
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts: {profileData.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: {profileData.counts.followerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Following: {profileData.counts.followingCount}
        </a>
      </div>
      <ProfilePosts/>
    </div>
  )
};