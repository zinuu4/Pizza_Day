import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

import { setBasicUserData } from 'store/slices/userSlice';

import avatar from 'assets/userProfile/profile/profilePhoto.jpeg';
import './profile.scss';

const Profile = () => {
  const {cities} = useSelector(state => state.db);
  const {chosenCity, email, name, surname, gender, birthday} = useSelector(state => state.user)
  const dispatch = useDispatch();
  return (
    <div className="profile">
      <div className="profile__top">
        <div className="profile__userInfo">
          <img className="profile__avatar" src={avatar} alt="avatar" />
          <div>
            <h5 className="profile__name">{name} {surname}</h5>
            <div className="profile__phone">{email}</div>
          </div>
        </div>
        <select className='profile__languages'>
          <option value="English">English</option>
          <option value="Russian">Russian</option>
          <option value="Ukrainian">Ukrainian</option>
        </select>
      </div>
      <Formik
        initialValues = {{
          name: name,
          surname: surname,
          birthday: birthday,
          city: chosenCity,
          gender: gender
        }}
        validationSchema={
          Yup.object({
            name: Yup.string()
              .required('This field is required'),
            birthday: Yup.string()
              .required('This field is required'),
            surname: Yup.string()
              .required('This field is required'),
            city: Yup.string()
              .required('This field is required'),
            gender: Yup.string()
              .required('This field is required')
          })
        }
        onSubmit={({name, surname, birthday, city, gender}) => dispatch(setBasicUserData(name, surname, birthday, city, gender))}
      >
        <Form>
          <div className='profile__fields-wrapper'>

          <label className='profile__input-wrapper' htmlFor="name">
            <span className='profile__input-label'>Name</span>
            <Field
              id="name"
              name="name"
              className="profile__input"
            />
          </label>
          <label className='profile__input-wrapper' htmlFor="birthday">
            <span className='profile__input-label'>Birthday</span>
            <Field
              id="birthday"
              name="birthday"
              className="profile__input"
            />
          </label>
          <label className='profile__input-wrapper' htmlFor="surname">
            <span className='profile__input-label'>Surname</span>
            <Field
              id="surname"
              name="surname"
              className="profile__input"
            />
          </label>
          <label className='profile__input-wrapper' htmlFor="city">
            <span className='profile__input-label'>City</span>
            <Field
              id="city"
              name="city"
              as="select"
              className="profile__input"
            >
              {
                cities.map(({id}) => {
                  return (
                    <option key={id} value={id}>{id}</option>
                  )
                })
              }
            </Field>
          </label>
          <label className='profile__input-wrapper' htmlFor="gender">
            <span className='profile__input-label'>Gender</span>
            <Field
              id="gender"
              name="gender"
              as="select"
              className="profile__input"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Not specified">Not specified</option>
            </Field>
          </label>
          </div>
          <button className='profile__btn-submit'>Save changes</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Profile;