import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  getArticle,
} from '../../redux/actions/postActions'
import Header from '../Header/Header'
import './articleview.css'
import FollowButton from '../FollowButton/FollowButton'
import classnames from "classnames";


class ArticleView extends Component {
  // componentDidMount() {
  //   document.body.className = 'posts show'
  // }
  componentWillMount() {
    this.props.getArticle(this.props.match.params.id)
  }

  render() {
    const { text, title, feature_img, author, likes, comments } = this.props._article
    let author_name, author_img, author_id
    if (author) {
      const { name, avatar, _id } = author
      author_name = name
      author_id = _id
      author_img = avatar
    }

    return (
      <div>
      <Header />
      <div className="container-fluid main-container">
      <div className="row animated fadeInUp" data-animation="fadeInUp-fadeOutDown">
        <div id="main-post" className=" col-xs-10 col-md-8 offset-md-2 col-xs-offset-1 main-content">
        <div className="pull-right">
        </div>
          <div className="post-metadata">
            <img alt={author_name} className="avatar-image" src={author_img} height="40" width="40" />
            <div className="post-info">
              <div data-react-className="PopoverLink" data-react-props=""><span className="popover-link" data-reactroot=""><a href={`/profile/${author_id}`}>{author_name}</a></span></div>
              <small>{this.props._article.date}</small>
            </div>
          </div>

          {!feature_img || !feature_img.length > 0 ? '' : <div className="post-picture-wrapper">
            <img src={feature_img} alt="feature img 540" />
          </div> }
          <h3 className="title">{title}</h3>
          <div className="body">
            <p></p>
            <p className=""dangerouslySetInnerHTML={{__html: text}}>
            </p>
            <p></p>
          </div>

          <div className="post-stats">
            <div className="pull-left">
              <div className="like-button-wrapper">
            <span onClick={() => this.articleLikeHandler(this.props.article._id, this.props.article.likes)}>
            <i className='far fa-heart like-btn'></i>
            </span>

                <span className="like-count">{0}</span>
              </div>
            </div>
            <div className="pull-right">
              <a href="#" className="response-count">{0} responses</a>

                <div className="bookmark-wrapper">
                  <i className='far fa-bookmark'></i>
                </div>
            </div>
          </div>

          <div className="author-info">
            <div clas="author-metadata">
              <img alt={author_name} className="avatar-image" src={author_img} height="50" width="50" />
              <div className="username-description">
                <h4>{author_name}</h4>
                <p></p>
              </div>
            </div>
            {this.props.user ? <FollowButton user={`${this.props.user.following}`} to_follow={`${author_id}`} /> : ''}
          </div>
          
        </div>
      </div>
    </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    _article: state.articles.article,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, { getArticle })(ArticleView);