import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

const SignUpForm = ({title, handleClick}) => {

  return (
    <Formik
      initialValues = {{
        email: '',
        password: '', 
        name: '',
        surname: '',
        city: '',
        gender: ''
      }}
      validationSchema = {
        Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .min(8, 'Minimum 8 symbols')
            .required('Required'),
          name: Yup.string()
            .required('Required'),
          surname: Yup.string()
            .required('Required'),
          city: Yup.string()
            .required('Required'),
          gender: Yup.string()
            .required('Required')
        })
      }      
      onSubmit = { ({email, password, name, surname, city, gender}) => handleClick(email, password, name, surname, city, gender) }
    >
      <Form>

        <Field
          id="email"
          name="email"
          type="email"
          placeholder="email"
        />
        <ErrorMessage name="email" component="div" />

        <Field
          id="password"
          name="password"
          type="text"
          placeholder="password"
        />
        <ErrorMessage name="password" component="div" />

        <Field
          id="name"
          name="name"
          type="text"
          placeholder="name"
        />
        <ErrorMessage name="name" component="div" />

        <Field
          id="surname"
          name="surname"
          type="text"
          placeholder="surname"
        />
        <ErrorMessage name="surname" component="div" />

        <Field
          id="city"
          name="city"
          as="select"
        >
          <option value='lol'>lol</option>
          <option value='lol'>lol</option>
        </Field>
        <ErrorMessage name="city" component="div" />

        <Field
          id="gender"
          name="gender"
          as="select"
        >
          <option value='lol'>lol</option>
          <option value='lol'>lol</option>
        </Field>
        <ErrorMessage name="gender" component="div" />

        <button type='submit'>
          {title}
        </button>

      </Form>
    </Formik>
  )
}

export default SignUpForm;