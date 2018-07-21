import React, {PropTypes} from 'react';
import { Link } from 'react-router-dom'
import logo from '../../../assets/medium-brands.svg'
// import './editorheader.css'
import { connect } from 'react-redux'
import './editorheader.css'

class EditorHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {


    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <Link className="navbar-brand" to="/">
            <img src={logo} width="30" height="30" className="d-inline-block align-top mr-2" alt="Medium"/>
          <small>Draft</small> 
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <ul className="navbar-nav navbar-right">
            <li className="nav-item">
              <span
              className="nav-link publish"
              onClick={this.props.publish}
              >
              {this.props.loading === true ? 'Publishing' : 'Publish'}
              </span>
            </li>
          </ul>

        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => ({
  auth
})


export default connect(mapStateToProps)(EditorHeader)


//TODO: fix search buttons css