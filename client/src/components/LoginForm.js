import { useState, useContext } from "react";
import { UserContext } from '../Context/User';
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        setErrors([]);
        r.json().then((user) => {
          setUser(user);
          history.push("/me");
        });
      } else {
        r.json().then((err) => setErrors(err.error));
      }
    })
    .catch((error) => {
      setErrors([error.message]);
      setIsLoading(false);
    });

    setValues(initialValues);

  }


  return (
    <div>
      <h1>Log in!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={values.username}
            onChange={handleInputChange}
          ></input>
        </label>
        <br></br>
        <label>
          Password
          <input
            type="password"
            name="password"
            autoComplete="on"
            placeholder="Password"
            value={values.password}
            onChange={handleInputChange}
          ></input>
        </label>
        <input type="submit" value={isLoading ? "Loading..." : "Log In"} />
      </form>
      {errors ? <h3 style={{ color: "red" }}>{errors}</h3> : null}
    </div>
  );
};

export default LoginForm;