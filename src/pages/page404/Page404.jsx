import { Link } from 'react-router-dom';
import errorImg from 'assets/404/404.png';

const Page404 = () => {
  return (
    <div style={{'height': '100vh','display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'flexDirection': 'column'}}>
      <img style={{'width': '490px', 'height': '300px'}} src={errorImg} alt="404 error" />
      <h5 style={{'fontSize': '30px', 'marginTop': '30px'}}>Not found</h5>
      <Link to='/' style={{'marginTop': '10px', 'fontSize': '20px', 'fontWeight': '500', 'color': 'var(--accent)'}}>
        Back to main page
      </Link>
    </div>
  )
}

export default Page404;