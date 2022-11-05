// Форма регистрации, в разработке, будет прикрепляться к приложению
import { useState } from 'react';
import getCookie from './getCookie';
// import CSRFToken from './CSRFToken'

let csrftoken = getCookie('csrftoken')

async function loginUser(credentials) {
  fetch('http://127.0.0.1:8000/api/drf-auth/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken
    },
    body: JSON.stringify(credentials),
  }).then((loginData) => loginData.json());
  console.log(credentials);
}

function Form() {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  const [data, setData] = useState({ username: '', password: '' });

  async function handleFormSubmit(event) {
    event.preventDefault();
    loginUser(data);

    console.log(data);
    alert(JSON.stringify(data));
  }

  function handleInputChange(event, name) {
    setData({ ...data, [name]: event.target.value });
  }
  return (
    <>
      <h1>Login Form</h1>
      <form onSubmit={handleFormSubmit}>
        
        <label>
          Username:
          <input
            type="text"
            value={data.username}
            onChange={(event) => handleInputChange(event, 'username')}
          ></input>
        </label>
        <label>
          Password:
          <input
            type="password"
            value={data.password}
            onChange={(event) => handleInputChange(event, 'password')}
          ></input>
          <button type="submit">Login</button>
        </label>
      </form>
    </>
  );
}

export default Form;
