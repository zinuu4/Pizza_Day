import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

const LoginForm = ({title, handleClick}) => {
  return (
    <Formik
      initialValues = {{
        email: '',
        password: '',
      }}
      onSubmit={ ({email, password}) => handleClick(email, password) }
    >
      <Form>

        <Field
          id="email"
          name="email"
          type="email"
          placeholder="email"
        />

        <Field
          id="password"
          name="password"
          type="text"
          placeholder="password"
        />

        <button type='submit'>
          {title}
        </button>

      </Form>
    </Formik>
  )
}

export default LoginForm;