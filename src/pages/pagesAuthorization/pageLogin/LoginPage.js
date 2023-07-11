import { Link } from "react-router-dom"

import Login from "components/login/Login"

const LoginPage = () => {
  return (
    <>
      <h2>LoginPage</h2>

      <Login/>

      <p>
        Or <Link to='/register'>Sign up</Link>
      </p>
    </>
  )
}

export default LoginPage