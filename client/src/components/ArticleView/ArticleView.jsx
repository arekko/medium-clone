import React, { Component } from "react";
import { connect } from "react-redux";
import { getArticle } from "../../redux/actions/postActions";
import Header from "../Header/Header";
import "./articleview.css";
import FollowButton from "../FollowButton/FollowButton";
import classnames from "classnames";
import CommentList from '../Comments/CommentsList/CommentsList'
class ArticleView extends Component {
  componentWillMount() {
    this.props.getArticle(this.props.match.params.id);
  }

  render() {
    const {
      text,
      title,
      feature_img,
      author,
      likes,
      comments
    } = this.props._article;
    let author_name, author_img, author_id;
    if (author) {
      const { name, avatar, _id } = author;
      author_name = name;
      author_id = _id;
      author_img = avatar;
    }
    return (
      <div>
        <Header />
        <div className="container-fluid main-container">
          <div
            className="row animated fadeInUp"
            data-animation="fadeInUp-fadeOutDown"
          >
            <div
              id="main-post"
              className=" col-xs-10 col-md-8 offset-md-2 col-xs-offset-1 main-content"
            >
              <div className="author-info-wrapper">
                <div className="post-metadata">
                  <img
                    alt={author_name}
                    className="avatar-image"
                    src={author_img}
                    height="40"
                    width="40"
                  />
                  <div className="post-info">
                    <div data-react-className="PopoverLink" data-react-props="">
                      <span className="popover-link" data-reactroot="">
                        <a href={`/profile/${author_id}`}>{author_name}</a>
                      </span>
                    </div>
                    <small>{this.props._article.date}</small>
                  </div>
                </div>
                {this.props.auth.isAuthenticated ? (
                  this.props.user._id !== author_id ? (
                    <FollowButton
                      user={`${this.props.user.following}`}
                      to_follow={`${author_id}`}
                    />
                  ) : null
                ) : null}
              </div>

              {!feature_img || !feature_img.length > 0 ? (
                ""
              ) : (
                <div className="post-picture-wrapper">
                  <img src={feature_img} alt="feature img 540" />
                </div>
              )}
              <h3 className="title">{title}</h3>
              <div className="body">
                <p className="" dangerouslySetInnerHTML={{ __html: text }} />
              </div>

              <div className="post-stats">
                <div className="pull-left">
                  <div className="like-button-wrapper">
                    <span
                      onClick={() =>
                        this.articleLikeHandler(
                          this.props.article._id,
                          this.props.article.likes
                        )
                      }
                    >
                      <i className="far fa-heart like-btn" />
                    </span>
                    <span className="like-count">{this.props._article.likes !== undefined ? this.props._article.likes.length : ''}</span>
                  </div>
                  <div className="response-icon-wrapper">
                    <i class="far fa-comment"></i>
                      <span className="response-count" data-behavior="response-count">{this.props._article.comments !== undefined ? this.props._article.comments.length : ''}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="response mt-5 mb-3">Responses</h3>
                <div data-behavior="responses-list" />
              </div>
                {this.props.auth.isAuthenticated ? (<CommentList comments={this.props._article.comments} user={this.props.user} article_id={this.props._article._id}/>) : null}
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
    user: state.auth.user,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { getArticle }
)(ArticleView);
