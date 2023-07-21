import error from 'assets/errors/error.gif';

const ErrorMessage = ({ styles }) => {
  return (
    <img style={styles} src={error}
    alt="Error"/>
  )
}

export default ErrorMessage;