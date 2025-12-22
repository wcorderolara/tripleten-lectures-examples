import { useState, useEffect } from "react";
import "./App.css";
import CardList from "./components/CardList";
import { useSelector, useDispatch } from "react-redux";
import { createUser, updateUser } from "./redux/UserSlice.jsx";

function App() {
  /**
   * name and lastName are Local states
   */
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch(); // const dispatch = new useDispatch();
  const editingUser = useSelector( (state) => state.users.editingUser);
  const users = useSelector( (state) => state.users.users);


  useEffect( () => {
    if (editingUser) {
      setName(editingUser.userName);
      setLastName(editingUser.userLastName);
    } else {
      setName("");
      setLastName("");
    }
  }, [editingUser])

  const handleSubmit = () => {
    if(editingUser) {
      const updatedUser = {
        id: editingUser.id,
        userName: name,
        userLastName: lastName
      }
      dispatch(updateUser(updatedUser));
    }else{
      const newUser = {
        id: crypto.randomUUID(),
        userName: name,
        userLastName: lastName
      }
      dispatch(createUser(newUser));
    }

    setName("");
    setLastName("");
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button onClick={handleSubmit}>
          {editingUser ? 'Update User' : 'Create User'}
        </button>

         {users.length > 0 && <CardList/>}
      </div>
    </>
  );
}

export default App;
