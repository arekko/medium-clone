import React, {PropTypes} from 'react';
import FollowButton from '../../FollowButton/FollowButton'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import './commentitem.css'
const CommentItem = ({comment, user}) => {
  console.log(comment)
  return (
    <div className="post-wrapper">
      <div className="post-metadata">
        <img src={comment.author.avatar} alt=""/>
        <div className="post-info">
          <Link to={`profile/${comment.author._id}`}>{comment.author.name}</Link>
        <small>Published • <Moment format="YYYY/MM/DD">{comment.date}</Moment></small>
        </div>
      </div>
      <p className="comment-text">{comment.text}</p>

    </div>
  );
}

CommentItem.propTypes = {
};


export default CommentItem
