import React, {PropTypes} from 'react';
import Post from '../Post/Post'
import './feed.css'

class Feed extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-8 dashboard-main-content">
          <Post/>
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
};

export default Feed
