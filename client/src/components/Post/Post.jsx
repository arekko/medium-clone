import React from 'react'
import './post.css'


const Post = (props) => {

  console.log(props.article);
  return (
    <div className="post-wrapper">
    <div className="post-metadata">
      <img src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fgi4.md.alicdn.com%2Fimgextra%2Fi4%2F775235395%2Fjapanese-gather-bra-sexy-lace-lingerie-thin-fashion-models-cute-little-girl-student-bra-chest-free-shipping%2FT2OKl8XfBbXXXXXXXX_!!775235395.jpg_430x430q90.jpg&f=1" alt=""/>
      <div className="post-info">
        <a href="">{props.article.author.name}</a>
        <small>{props.article.date}</small>
      </div>
    </div>
        {props.article.feature_img.length > 0 ? <div class="post-picture-wrapper">
          <img src={props.article.feature_img} alt="Thumb" />
        </div>:''}
    <div className="main-body">
      <h3 className="post-title">
        <a href="">{props.article.title}</a>
      </h3>
      <div className="post-body">
      <p className="" dangerouslySetInnerHTML={{__html: props.article.description}}></p>
      </div>
      <a href="#" className="read-more">Read more</a>
    </div>
    <div className="post-stats">
      <div className="pull-left">
        <div className="like-button-wrapper">
          <span><i className="far fa-heart like-btn"></i></span>
          <span className="like-count">{props.article.likes.length}</span>
        </div>
      </div>
      <div className="pull-right">
        <a href="#" className="response-count">{props.article.likes.length} responses</a>
      </div>
    </div>
  </div>
  )
}

export default Post
