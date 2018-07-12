import React from 'react'
import './post.css'


const Post = (props) => {
  return (
    <div className="post-wrapper">
      <div className="post-metadata">
        <img src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fgi4.md.alicdn.com%2Fimgextra%2Fi4%2F775235395%2Fjapanese-gather-bra-sexy-lace-lingerie-thin-fashion-models-cute-little-girl-student-bra-chest-free-shipping%2FT2OKl8XfBbXXXXXXXX_!!775235395.jpg_430x430q90.jpg&f=1" alt=""/>
        <div className="post-info">
          <a href="">Lashe</a>
          <small>about 1 year ago • less than a minute read</small>
        </div>
      </div>
      <div className="post-picture-wrapper">
        <img src="https://stories-app.s3.amazonaws.com/uploads/post/picture/1529/thumb_hotdogpie01.jpg" alt=""/>
      </div>
      <div className="main-body">
        <h3 className="post-title">
          <a href="">Amazing App</a>
        </h3>
        <div className="post-body">
          <p>My former company (CD Baby) was one of
           the first to loudly switch to Ruby on Rails, and then even more loudly switch back to PHP Google me to...
          </p>
        </div>
        <a href="#" className="read-more">Read more</a>
      </div>
      <div className="post-stats">

      </div>
    </div>
  )
}

export default Post
