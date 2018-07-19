import React from 'react'
import './post.css'
import { connect } from 'react-redux'
import { addLike } from '../../redux/actions/postActions'
import { Link } from 'react-router-dom'
class Post extends React.Component {


  articleLikeHandler = (id) => {
    this.props.addLike(id)
  }

  render(){
    return (
      <div className="post-wrapper">
      <div className="post-metadata">
        <img src={this.props.article.author.avatar} alt=""/>
        <div className="post-info">
          <Link to={`profile/${this.props.article.author._id}`}>{this.props.article.author.name}</Link>
          <small>{this.props.article.date}</small>
        </div>
      </div>
          {this.props.article.feature_img.length > 0 ? <div class="post-picture-wrapper">
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
            <span onClick={() => this.articleLikeHandler(this.props.article._id)}><i className="far fa-heart like-btn"></i></span>
            <span className="like-count">{this.props.article.likes}</span>
          </div>
        </div>
        <div className="pull-right">
          <a href="#" className="response-count">{this.props.article.comments.length} responses</a>
        {this.props.auth.isAuthenticated ?  (<div className="bookmark-wrapper">
              <i class="far fa-bookmark"></i>
          </div>) : null }
        </div>
      </div>
    </div>
    )
  }
  
}

export default connect(null, { addLike })(Post)
