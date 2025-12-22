import React from 'react'
import { useUser } from '../context/UserContext'

const Card = () => {
    // 10. Get the user data from the global state
    const {user} = useUser();
  return (
    <div style={{ border: '1px solid #aaa', padding: '10px', marginTop: '20px' }}>
      <h2>User Info 👤</h2>
      <p><strong>Name:</strong> {user.userName}</p>
      <p><strong>Last Name:</strong> {user.userLastName}</p>
    </div>
  )
}

export default Card