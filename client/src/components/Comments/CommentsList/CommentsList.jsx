import React, {Component} from 'react';
import { connect } from 'react-redux'
import { addComment } from '../../../redux/actions/postActions'

class CommentList extends Component {

state = {
  commentText: ''
}

onSubmit = (e) => {
  e.preventDefault()
  console.log(this.state.commentText)
  console.log(this.props.article._id, this.props.user._id, this.state.commentText)
  this.props.addComment(this.props.article._id, this.props.user._id, this.state.commentText)

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
    console.log(this.props)
    return (
      <div>
        <form onSubmit={this.onSubmit}>
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
      </div>
    );
  }
}




export default connect(null, { addComment })(CommentList)
