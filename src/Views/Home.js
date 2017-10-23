import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPosts, vote, deletePost, setPostSorting } from '../Actions/posts';

import NavBar from '../Components/NavBar';
import Post from '../Components/Post';

class Home extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    submitVote: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    posts: PropTypes.object,
    sortBy: PropTypes.string,
  }

  static defaultProps = {
    posts: {},
    sortBy: 'BY_SCORE_HIGHEST',
  }

  componentWillMount() {
    this.props.fetchData('BY_SCORE_HIGHEST');
  }

  render() {
    return (
      <div>
        <NavBar sortBy={ this.props.sortBy } />
        <div className='row'>
          <h2> Posts <small>(<Link to='/create-post'>Add New</Link>)</small></h2>

        </div>
        <div className='row'>
          {this.props.posts &&
            Object.values(this.props.posts)
              .filter(post => !post.deleted)
              .sort((a, b) => {
                switch (this.props.sortBy) {
                  case 'BY_SCORE_LOWEST':
                    return a.voteScore - b.voteScore;
                  case 'BY_DATE_OLDEST':
                    return a.timestamp - b.timestamp;
                  case 'BY_DATE_NEWEST':
                    return b.timestamp - a.timestamp;
                  default:
                    return b.voteScore - a.voteScore;
                }
              })
              .map(post =>
                (
                  <Post
                    key={ post.id }
                    id={ post.id }
                    category={ post.category }
                    title={ post.title }
                    author={ post.author }
                    voteScore={ post.voteScore }
                    comments={ post.comments }
                    submitVote={ this.props.submitVote }
                    deletePost={ this.props.deletePost }
                  />
                )
              )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.postsById,
  sortBy: state.postSorting ? state.postSorting.sort : '',
});

const mapDispatchToProps = dispatch => ({
  fetchData: (sortCriteria) => dispatch(fetchPosts()).then(() => dispatch(setPostSorting(sortCriteria))),
  submitVote: (id, voteType) => dispatch(vote(id, voteType)),
  deletePost: (id) => dispatch(deletePost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
