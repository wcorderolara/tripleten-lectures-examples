import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { editUser, deleteUser } from '../redux/UserSlice.jsx';

const CardList = () => {
    const dispatch = useDispatch();
    const users = useSelector( (state) => state.users.users);
  return (
    <div style={{marginTop: '20px', display: 'flex', justifyContent:'flex-start', gap: '20px', flexWrap: 'wrap'}}>
        {users.map( (user) => (
            <div style={{ border: '1px solid #aaa', padding: '10px', marginTop: '20px' }} key={user.id}>
                <h2>User Info 👤</h2>
                <p><strong>Name:</strong> {user.userName}</p>
                <p><strong>Last Name:</strong> {user.userLastName}</p>
                <button style={{marginLeft: '10px', backgroundColor: '#2f7ff0ff', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer'}} onClick={() => dispatch(editUser(user))}>Edit</button>
                <button style={{marginLeft: '10px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer'}} onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
            </div>
        ))}
    </div>
  )
}

export default CardList