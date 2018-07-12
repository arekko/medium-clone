import React, {PropTypes} from 'react';
import { Link } from 'react-router-dom'


export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div class="col-md-8 offset-md-2 mt-5">
            <h1>Login</h1>
            <form action="/login" method="post">
            <div class="form-group">
              <label>Email</label>
            <input type="text" class="form-control" name="email"/>
            </div>
            <div class="form-group">
              <label>Password</label>
            <input type="password" class="form-control" name="password"/>
            </div>
          <button type="submit" class="btn btn-outline-success mr-4">Login</button>
          <a href="/auth/google" className="btn btn-outline-danger">Login with Google</a>
      </form>

      <hr/>

      <p>Need an account? <Link to="/signup">Signup</Link></p>
      <p>Or go <Link to="/">home</Link>.</p>

      </div>
        </div>

      </div>
    );
  }
}

Login.propTypes = {
};
