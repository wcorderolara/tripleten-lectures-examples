// 1. import createContext from React
import {createContext, useState, useContext} from 'react';

// 2. create The Context = Global Scope
const UserContext = createContext();

// 3. Create the Provider to wrap the App
export const UserProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    const createUser = (name, lastName) => {
        const newUser = {
            id: crypto.randomUUID(),
            userName: name,
            userLastName: lastName
        }

        // prev = aka previous state of my object
        setUsers( prev => [...prev, newUser])
    }

    const deleteUser = (id) => {
        setUsers( prev => prev.filter( user => user.id !== id));
    }

    const editUser = (user) => {
        setEditingUser(user);
    }

    const updateUser = (id, name, lastName) => {
        setUsers( prev => 
            prev.map( user => user.id === id ? {...user, userName: name, userLastName: lastName} : user ));

        setEditingUser(null);
    }

    //4 Return the Context with the Provider data
    return(
        <UserContext.Provider value={{users, createUser, deleteUser, editUser, updateUser, editingUser}}>
            {children}
        </UserContext.Provider>
    )
}

//6. export the Context to be used
export const useUser = () => useContext(UserContext);

/*
    useUser {
        user,
        createUser: (name, lastName) => {}
    }

*/