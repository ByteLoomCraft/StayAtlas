import VillaOwnerProfile from '@/components/OwnerProfile';
import UserProfile from '@/components/UserProfile'
import React from 'react'
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state)=>state.auth)
  console.log(user.role);
  console.log(typeof user.role)

  

  return (
    <div><UserProfile/></div>
  )
}

export default Profile