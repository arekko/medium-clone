import React, {PropTypes} from 'react';
import Post from '../Post/Post'
import { connect } from 'react-redux'
import { loadArticles } from '../../redux/actions/postActions';
import './feed.css'

import fakearticles from '../../fakedata'

class Feed extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.loadArticles()
  }
  

  render() {
    console.log(this.props.articles)
    return (
      <div className="container">
        <div className="col-md-8 dashboard-main-content">
          {fakearticles.reverse().map( article => (
            <Post article={article}/>
          ))} 
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
};

const mapStateToProps = state => ({
  articles: state.articles.articles
})

export default connect(mapStateToProps, { loadArticles })(Feed)
