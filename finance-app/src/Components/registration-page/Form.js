// Форма регистрации, в разработке, будет прикрепляться к приложению
import { useEffect, useState } from "react";

function Form() {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  const [data, setData] = useState({ username: "", password: "" });
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/registration/").then((result) =>
      console.log(result)
    );
  }, []);
  function handleFormSubmit(event) {
    event.preventDefault();

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
            onChange={(event) => handleInputChange(event, "username")}
          ></input>
        </label>
        <label>
          Password:
          <input
            type="password"
            value={data.password}
            onChange={(event) => handleInputChange(event, "password")}
          ></input>
          <button type="submit">Login</button>
        </label>
      </form>
    </>
  );
}

export default Form;
