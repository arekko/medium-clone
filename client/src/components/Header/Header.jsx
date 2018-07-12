import React, {PropTypes} from 'react';
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import './header.css'
import { connect } from 'react-redux'
class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  SignInDialogHandler = () => {
    this.simpleDialog.show()
  }

  



  render() {

    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
      <a href="/auth/logout" className="btn btn-outline-success btn-br ml-5" >Logout</a>

    )
  
    const guestLinks = (
      <Link to="/login" className="btn btn-outline-success btn-br ml-5" >Sign in / Sign up</Link>
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
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Top stories <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link disabled" to="bookmarks">Bookmarks</Link>
              </li>
            </ul>
          </div>
          <form className="form-inline">
            <button className="btn-input" type="submit"><i className="fas fa-search search-icon"></i></button>
          <input className="form-control mr-sm-2 header-input" type="search" placeholder="Search" aria-label="Search"/>
          {isAuthenticated ? authLinks : guestLinks}
          </form>
        </nav>


      </div>
    );
  }
}

const SignInStyles = {
  backgroundColor: '#D1F1EF',
  color: '#ffffff',
  width: '65%',
  height: '500px',
  marginTop: '-300px',
  marginLeft: '-35%',
  padding: 0

}

Header.propTypes = {
};


const mapStateToProps = ({auth}) => ({
  auth
})


export default connect(mapStateToProps)(Header)


//TODO: fix search buttons css