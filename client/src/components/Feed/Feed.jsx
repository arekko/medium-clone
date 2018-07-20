import React, {PropTypes} from 'react';
import Post from '../Post/Post'
import { connect } from 'react-redux'
import { loadArticles } from '../../redux/actions/postActions';
import './feed.css'
import Header from '../Header/Header'
import fakearticles from '../../fakedata'

class Feed extends React.Component {
  constructor(props) {
    super(props);
  }

 

  componentDidMount = () => {
    this.props.loadArticles()
  }
  

  render() {
      const { articles } = this.props
    
    return (
      <div>
        <Header />
        <div className="container">
          <div className="col-md-8 dashboard-main-content">
            {articles.length > 0 ? articles.map( article => (
              <Post article={article} auth={this.props.auth} key={article._id}/>
            )): null} 
          </div>
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
  auth: state.auth
})

export default connect(mapStateToProps, { loadArticles })(Feed)
