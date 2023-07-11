import { useSelector } from "react-redux";

const useAuth = () => {
  const {email, password, name, surname, city, gender, token, id} = useSelector(state => state.user);

  return {
    isAuth: !!email,
    email,
    password,
    name,
    surname,
    city,
    gender,
    token,
    id
  }
}

export default useAuth;