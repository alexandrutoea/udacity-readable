import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPosts, fetchPostsByCategory, vote, deletePost, setPostSorting } from '../Actions/posts';

import NavBar from '../Components/NavBar';
import Post from '../Components/Post';

class Category extends Component {
  static propTypes = {
    fetchAllPosts: PropTypes.func.isRequired,
    fetchCategoyPosts: PropTypes.func.isRequired,
    submitVote: PropTypes.func.isRequired,
    handleDeletePost: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    posts: PropTypes.object,
    sortBy: PropTypes.string,
  }

  static defaultProps = {
    posts: {},
    sortBy: 'BY_SCORE_HIGHEST',
  }

  componentWillMount() {
    // loading all posts in case app is accessed on a category.
    // If we don't load all posts here, when witching toa  different category, it will always display an empty array
    this.props.fetchAllPosts('BY_SCORE_HIGHEST');
    this.props.fetchCategoyPosts(this.props.match.params.category, 'BY_SCORE_HIGHEST');
  }

  render() {
    return (
      <div>
        <NavBar sortBy={ this.props.sortBy } />
        <div className='row'>
          <h2>
            Posts &gt; Category: {this.props.match.params.category}
            <small>(<Link to={ { pathname: '/create-post', state: { postCategory: `${ this.props.match.params.category }` } } }>Add New</Link>)</small>
          </h2>
        </div>
        <div className='row'>
          {this.props.posts &&
            Object.values(this.props.posts)
              .filter(post => !post.deleted)
              .filter(
                post => post.category === this.props.match.params.category
              )
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
              .map(post => (
                <Post
                  key={ post.id }
                  id={ post.id }
                  category={ post.category }
                  title={ post.title }
                  author={ post.author }
                  voteScore={ post.voteScore }
                  comments={ post.comments }
                  submitVote={ this.props.submitVote }
                  deletePost={ this.props.handleDeletePost }
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
  fetchAllPosts: (sortCriteria) => dispatch(fetchPosts()).then(() => dispatch(setPostSorting(sortCriteria))),
  fetchCategoyPosts: (category, sortCriteria) => dispatch(fetchPostsByCategory(category)).then(() => dispatch(setPostSorting(sortCriteria))),
  handleDeletePost: (id) => dispatch(deletePost(id)),
  submitVote: (id, voteType) => dispatch(vote(id, voteType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
