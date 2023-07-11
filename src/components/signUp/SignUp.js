import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

import SignUpForm from "../forms/signUpForm/SignUpForm";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (email, password, name, surname, city, gender) => {
    const auth = getAuth();
  
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
            name,
            surname,
            city,
            gender,
          })
        );
        navigate('/');
      })
      .catch((error) => console.log(error));
  };
  

  return (
    <div>
      <SignUpForm
        title="Sign up"
        handleClick={handleRegister}
      />
    </div>
  )
}

export default SignUp;