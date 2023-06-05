import { useState, useEffect } from 'react';
import UserTable from './tables/UserTable';
import userList from './data';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';
import useAsyncRequest from './hooks/useAsyncRequest';

function App() {
  // const [users, setUsers] = useState(userList);
  const [data, loading] = useAsyncRequest(3);
  const [users, setUsers] = useState(userList);

  const [editing, setEditing] = useState(false);

  const initialUser = { id: null, name: '', username: '' };

  const [currentUser, setCurrentUser] = useState(initialUser);



  useEffect(() => {
    if (data) {
      const formattedUsers = data.map((obj, i) => {
        return {
          id: i,
          name: obj.name.first,
          username: obj.name.first + " " + obj.name.last,
        };
      });
      setUsers(formattedUsers);
    }
  }, [data]);

  const addUser = user => {
    user.id = users[users.length-1].id + 1;
    setUsers([...users, user]);
  }

  const deleteUser = id => setUsers(users.filter(user => user.id !== id));

  const editUser = (id, user) => {
    setEditing(true);
    setCurrentUser(user);
  }

  const updateUser = (newUser) => {
    setUsers(users.map(user => (user.id === currentUser.id ? newUser : user)))
  }


  return (
    <div className="container">
      <h1>React CRUD App with Hooks</h1>
      <div className="row">
        <div className="five columns">
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                currentUser={currentUser}
                setEditing={setEditing}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        {loading || !users ? (
          <div className="seven columns">
          <h2>View users</h2>

          <p>Loading....</p>
        </div>
        ) : (
          <div className="seven columns">
            <h2>View users</h2>

            <UserTable
              users={users}
              deleteUser={deleteUser}
              editUser={editUser}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
