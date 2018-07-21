import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './bookmarks.css'
import Header from '../Header/Header'
import Post from '../Post/Post'

import { connect } from 'react-redux'



class Bookmarks extends Component {



  render() {
    const { bookmarks } = this.props.auth.user
    const { auth } = this.props
    console.log(bookmarks)

    const bookmarkContent = (
      (bookmarks.length > 0 ? bookmarks.map( bookmark => (
        <Post article={bookmark} auth={auth} key={bookmark._id}/>
      )): null)
    )

    return (
      <div>
        <Header />
        <div className="container">
          <div className="col-md-8 dashboard-main-content">
            <h1 className="mb-5">Bookmarks</h1>
            {bookmarkContent}
          </div>
        </div>
      </div>
    );
  }
}

Bookmarks.propTypes = {};


const mapStateToProps = state => ({
  auth: state.auth
})


export default connect(mapStateToProps)(Bookmarks);
