import React, {PropTypes} from 'react';
import { Link } from 'react-router-dom'

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }



  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    console.log(newUser)
  }

  render() {
    return (
      <div>
        <div className="col-md-8 offset-md-2 mt-5">

      <h1><span className="fa fa-sign-in"></span>Signup</h1>



      <form action="/signup" method="post" onSubmit={this.onSubmit}>
      <div className="form-group">
            <label>Username</label>
          <input type="text" className="form-control" name="name" value={this.state.name}
          onChange={this.onChange}/>
        </div>
          <div className="form-group">
            <label>Email</label>
          <input type="text" className="form-control" name="email" value={this.state.email}
          onChange={this.onChange}/>
        </div>
        <div className="form-group">
            <label>Password</label>
          <input type="password" className="form-control" name="password" value={this.state.password}
          onChange={this.onChange}/>
        </div>
        <button type="submit" className="btn btn-outline-success">Signup</button>
    </form>

    <hr/>

    <p>Already have an account? <Link to="/login">Login</Link></p>
    <p>Or go <Link to="/">home</Link>.</p>

</div>
      </div>
    );
  }
}
Signup.propTypes = {
};
