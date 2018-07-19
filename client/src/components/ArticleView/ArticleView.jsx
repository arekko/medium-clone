import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  getArticle,
} from '../../redux/actions/postActions'
import Header from '../Header/Header'
import './articleview.css'
// import FollowButton from '../FollowButton/FollowButton'


class ArticleView extends Component {
  // componentDidMount() {
  //   document.body.className = 'posts show'
  // }
  componentWillMount() {
    this.props.getArticle(this.props.match.params.id)
  }
  // componentWillUnmount() {
  //   document.body.className = ''
  // }
  render() {
    const { text, title, feature_img, author } = this.props._article
    let author_name, author_img, author_id
    if (author) {
      const { name, avatar, _id } = author
      author_name = name
      author_id = _id
      author_img = avatar
    }
    console.log(this.props._article)
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

          <div className="post-stats clearfix">
          <div className="pull-left">
            <div className="like-button-wrapper">
              <button  className="like-button" data-behavior="trigger-overlay" type="submit">
                <i className="fa fa-heart-o"></i><span className="hide-text">Like</span>
              </button>
              <span className="like-count">0</span>
            </div>
          </div>
          <div className="pull-left">
            <a className="response-icon-wrapper" href="#">
              <i className="fa fa-comment-o"></i>
              <span className="response-count" data-behavior="response-count">0</span>
            </a>
          </div>
          <div className="pull-right">
            <div className="bookmark-button-wrapper">
              <form className="button_to" method="get" action=""><button className="bookmark-button" data-behavior="trigger-overlay" type="submit">      <span className="icon-bookmark-o"></span><span className="hide-text">Bookmark</span></button>
              </form>
            </div>
          </div>
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