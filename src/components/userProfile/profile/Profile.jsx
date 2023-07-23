import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { setBasicUserData } from 'store/slices/userSlice';
import { useHttp } from 'hooks/http.hook';

import pencil from 'assets/userProfile/profile/pencil.svg';
import './profile.scss';

const Profile = () => {
  const { cities } = useSelector(state => state.db);
  const { city, avatar, email, name, surname, gender, birthday } = useSelector(state => state.user);
  const { changeUserData, changeUserAvatar } = useHttp();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const selectedPhoto = e.target.files[0];
      changeUserAvatar(selectedPhoto, 'users', setBasicUserData, email);
    }
  };

  return (
    <div className="profile">
      <div className="profile__top">
        <div className="profile__userInfo">

          <div className='profile__avatar__wrapper'>
            <img className="profile__avatar" src={avatar} alt="avatar" />
            <label className='profile__avatar__change'>
              <span className='profile__avatar__change-img-wrapper'>
                <img src={pencil} alt="change profile" />
              </span>
              <input 
                onChange={handleImageChange} 
                className="visually-hidden" 
                type="file" 
                name="avatar" 
                accept="image/png, image/jpeg"
              />
            </label>
          </div>


          <div>
            <h5 className="profile__name">{name} {surname}</h5>
            <div className="profile__phone">{email}</div>
          </div>
        </div>
        <select className='profile__languages'>
          <option value="English">English</option>
        </select>
      </div>
      <Formik
        initialValues = {{
          name: name,
          surname: surname,
          birthday: birthday,
          city: city,
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
        onSubmit={({ name, surname, birthday, city, gender }) => {
          changeUserData('users', setBasicUserData, name, surname, birthday, city, gender, email);
        }}
      >
        {({isValid, isSubmitting}) => (
          <Form>
            <div className='profile__fields-wrapper'>

              <label className='profile__input-wrapper' htmlFor="name">
                <span className='profile__input-label'>Name</span>
                <Field
                  id="name"
                  name="name"
                  className="profile__input"
                />
                <ErrorMessage className='profile__input__error' name="name" component="div" />
              </label>

              <label className='profile__input-wrapper' htmlFor="birthday">
                <span className='profile__input-label'>Birthday</span>
                <Field
                  id="birthday"
                  name="birthday"
                  className="profile__input"
                />
                <ErrorMessage className='profile__input__error' name="birthday" component="div" />
              </label>

              <label className='profile__input-wrapper' htmlFor="surname">
                <span className='profile__input-label'>Surname</span>
                <Field
                  id="surname"
                  name="surname"
                  className="profile__input"
                />
                <ErrorMessage className='profile__input__error' name="surname" component="div" />
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
                      );
                    })
                  }
                </Field>
                <ErrorMessage className='profile__input__error' name="city" component="div" />
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
                <ErrorMessage className='profile__input__error' name="gender" component="div" />
              </label>

            </div>
            <button
              disabled={!isValid || isSubmitting} 
              style={{
                'backgroundColor': (!isValid || isSubmitting) ? 'var(--input)' : 'var(--accent)',
                'color': (!isValid || isSubmitting) ? 'var(--disabled)' : 'var(--accentContent)',
              }}
              className='profile__btn-submit'
            >Save changes</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;