import React, {Component} from 'react';
import { connect } from 'react-redux'
import { addComment } from '../../../redux/actions/postActions'
import CommentItem from '../CommentItem/CommentItem'
class CommentList extends Component {

state = {
  commentText: ''
}

onSubmit = (e) => {
  e.preventDefault()
  this.props.addComment(this.props.article_id, this.props.user._id, this.state.commentText)

  this.setState({
    commentText: ''
  })
}

onChangeHandler = e => {
  this.setState({
    [e.target.name]: e.target.value
  })
}


  render(){
    return (
      <div>
        <form onSubmit={this.onSubmit} className="mb-5">
          <div className="form-group">
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3" placeholder="Write your comment..."
              value={this.state.commentText}
              onChange ={this.onChangeHandler}
              name="commentText"
              ></textarea>
          </div>
          <button name="commentText" type="submit" class="btn btn-outline-success mb-2">Publish</button>
        </form>
        <hr/>
        {this.props.comments.reverse().map(comment => <CommentItem comment={comment} key={comment._id} user={this.props.user}/>)}
      </div>
    );
  }
}




export default connect(null, { addComment })(CommentList)
