import { useSelector } from "react-redux";

const useAuth = () => {
  const {email, password, name, surname, gender, token, id} = useSelector(state => state.user);

  return {
    email,
    password,
    name,
    surname,
    gender,
    token,
    id
  }
}

export default useAuth;