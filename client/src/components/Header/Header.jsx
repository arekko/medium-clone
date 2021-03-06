import React, {PropTypes} from 'react';
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import './header.css'
import { connect } from 'react-redux'
class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
      <React.Fragment>
      <li className="nav-item">
        <Link className="nav-link disabled" to="/bookmarks">Bookmarks</Link>
      </li>
      <li className="nav-item">
      <Link to={`/profile/${user._id}`} className="nav-link">Profile</Link>
       </li>
      <li className="nav-item">
       <Link to="/editor" className="nav-link">Write a story</Link>
      </li>
      <li className="nav-item">
        <a href="/auth/logout" className="btn btn-outline-success ml-2 " >Logout</a>
      </li>
      </React.Fragment>
    )
  
    const guestLinks = (
      <a href="/auth/google" className="btn btn-outline-success ml-3" >Sign in with Google</a>
    )

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <Link className="navbar-brand" to="/">
            <img src={logo} width="30" height="30" className="d-inline-block align-top mr-2" alt="Medium"/>
          Medium
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">

          </div>
          <div className="navbar-nav navbar-right">
            <div className="collapse navbar-collapse " id="navbarNav">

            <ul className="navbar-nav">
              {isAuthenticated ? authLinks : guestLinks}
            </ul>
            </div>

          </div>

        </nav>


      </div>
    );
  }
}

const mapStateToProps = ({auth}) => ({
  auth
})


export default connect(mapStateToProps)(Header)


//TODO: fix search buttons css