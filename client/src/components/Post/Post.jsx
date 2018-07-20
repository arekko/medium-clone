import React from 'react'
import './post.css'
import { connect } from 'react-redux'
import { addLike, removeLike } from '../../redux/actions/postActions'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import Moment from 'react-moment'
class Post extends React.Component {

articleLikeHandler = (id, likes) => {
  this.isLiked(likes) ? this.props.removeLike(id) : this.props.addLike(id);
}

  // isLikeStyle = (likes) => {



  //   if (likes.filter(like => like.user === auth.user._id).length > 0) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }
  // @return true is user liked current post
  isLiked = (likesList) => {
    const { auth } = this.props
    return likesList.filter(like => like.user === auth.user._id).length > 0
  }




  render(){
    return (
      <div className="post-wrapper">
      <div className="post-metadata">
        <img src={this.props.article.author.avatar} alt=""/>
        <div className="post-info">
          <Link to={`profile/${this.props.article.author._id}`}>{this.props.article.author.name}</Link>
          <small>Published • <Moment format="YYYY/MM/DD">{this.props.article.date}</Moment></small>
        </div>
      </div>
          {this.props.article.feature_img.length > 0 ? <div className="post-picture-wrapper">
            <img src={this.props.article.feature_img} alt="Thumb" />
          </div>:''}
      <div className="main-body">
        <h3 className="post-title">
          <a href={`/articleview/${this.props.article._id}`}>{this.props.article.title}</a>
        </h3>
        <div className="post-body">
        <p className="" dangerouslySetInnerHTML={{__html: this.props.article.description}}></p>
        </div>
        <a href={`/articleview/${this.props.article._id}`} className="read-more">Read more</a>
      </div>
      <div className="post-stats">
        <div className="pull-left">
          <div className="like-button-wrapper">
            <span onClick={() => this.articleLikeHandler(this.props.article._id, this.props.article.likes)}>
            <i className={classnames('far fa-heart like-btn', {'fas fa-heart like-btn': this.isLiked(this.props.article.likes)})}></i>
            </span>

            <span className="like-count">{this.props.article.likes.length}</span>
          </div>
        </div>
        <div className="pull-right">
          <a href="#" className="response-count">{this.props.article.comments.length} responses</a>
        {this.props.auth.isAuthenticated ?  (<div className="bookmark-wrapper">
              <i className="far fa-bookmark"></i>
          </div>) : null }
        </div>
      </div>
    </div>
    )
  }
  
}

export default connect(null, { addLike, removeLike })(Post)
