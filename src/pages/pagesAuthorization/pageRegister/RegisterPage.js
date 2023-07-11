import { Link } from "react-router-dom"

import SignUp from "components/signUp/SignUp"

function RegisterPage() {
  return (
    <>
      <h2>RegisterPage</h2>

      <SignUp/>

      <p>
        Already have an account? <Link to='/login'>Sign in</Link>
      </p>
    </>
  )
}

export default RegisterPage