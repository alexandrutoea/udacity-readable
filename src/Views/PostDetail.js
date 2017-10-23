import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { editPost, fetchPost, vote, deletePost } from '../Actions/posts';
import { fetchComments, addComment, setCommentSorting } from '../Actions/comments';

import Comment from '../Components/Comment';
import NavBar from '../Components/NavBar';

class PostDetail extends Component {
  static propTypes = {
    fetchPostData: PropTypes.func.isRequired,
    handleEditPost: PropTypes.func.isRequired,
    handleDeletePost: PropTypes.func.isRequired,
    submitVote: PropTypes.func.isRequired,
    handleAddComment: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    comments: PropTypes.object,
    allPosts: PropTypes.object,
    sortCommentsBy: PropTypes.string.isRequired,
  }

  static defaultProps = {
    comments: {},
    allPosts: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      commentAuthor: '',
      commentContent: '',
      postEditorVisible: false,
      postTitle: '',
      postAuthor: '',
      postCategory: '',
      postContent: '',
    };
  }

  componentWillMount() {
    this.props.fetchPostData(this.props.match.params.post_id, 'BY_SCORE_HIGHEST')
      .then(() => this.props.location.state && this.props.location.state.postEditorVisible && this.showPostEditor());
  }

  showPostEditor() {
    const { allPosts } = this.props;
    const { post_id } = this.props.match.params;
    this.setState({
      postTitle: allPosts[post_id].title,
      postAuthor: allPosts[post_id].author,
      postCategory: allPosts[post_id].category,
      postContent: allPosts[post_id].body,
      postEditorVisible: true,
    });
  }

  hidePostEditor() {
    this.setState({
      postEditorVisible: false,
    });
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCommentSubmit = (event) => {
    event.preventDefault();
    const data = {
      id: `${ this.state.commentAuthor }_${ Date.now() }`,
      timestamp: Date.now(),
      body: this.state.commentContent,
      author: this.state.commentAuthor,
      parentId: this.props.match.params.post_id,
      voteScore: 0,
      deleted: false,
      parentDeleted: false,
    };
    this.props.handleAddComment(data);
  }

  handlePostSubmit = event => {
    const { allPosts } = this.props;
    const { post_id } = this.props.match.params;
    event.preventDefault();
    const data = {
      id: allPosts[post_id].id,
      timestamp: allPosts[post_id].timestamp,
      voteScore: allPosts[post_id].voteScore,
      deleted: allPosts[post_id].deleted,
      title: this.state.postTitle,
      body: this.state.postContent,
      author: this.state.postAuthor,
      category: this.state.postCategory,
    };
    this.props.handleEditPost(data, data.id);
    this.hidePostEditor();
  }

  render() {
    const postId = this.props.match.params.post_id;
    const postData = this.props.allPosts[postId];

    return (
      <div>
        <NavBar sortCommentsBy={ this.props.sortCommentsBy } />
        <div>
          {this.props.allPosts && postData &&
            <div key={ postId }>
              <div className='row'>
                <div className='col-sm-6'>
                  <h2>
                    { postData.title }
                    <small>By: {postData.author} - {new Date(postData.timestamp).toDateString()}</small>
                  </h2>
                </div>
                <div className='col-sm-2'>
                  Score: {postData.voteScore}
                  <div className='button-group'>
                    <button onClick={ () => this.props.submitVote(postId, 'upVote') } >+</button>
                    <button onClick={ () => this.props.submitVote(postId, 'downVote') }>-</button>
                  </div>
                </div>
                <div className='col-sm-4'>
                  Actions:
                  <div className='button-group'>
                    <button className='tertiary' onClick={ () => this.showPostEditor() }>Edit</button>
                    <button className='secondary' onClick={ () => this.props.handleDeletePost(postData.id) }>Delete</button>
                  </div>
                </div>
              </div>
              <hr />
              <div className='row'>
                <div className='col-sm-12'>
                  {postData.body}
                </div>
              </div>
              <hr />
              {this.state.postEditorVisible &&
                <div className='row'>
                  <div className='col-sm-2'>
                    <h3>Edit Post</h3>
                  </div>
                  <div className='col-sm-10'>
                    <form onSubmit={ this.handlePostSubmit }>
                      <fieldset>
                        <div className='input-group vertical'>
                          <label htmlFor='post-title'>Title</label>
                          <input
                            type='text'
                            name='postTitle'
                            id='post-title'
                            value={ this.state.postTitle }
                            onChange={ this.handleInputChange }
                            required='required'
                          />
                          <label htmlFor='post-author'>Author</label>
                          <input
                            type='text'
                            name='postAuthor'
                            id='post-author'
                            value={ this.state.postAuthor }
                            onChange={ this.handleInputChange }
                            required='required'
                          />
                          <label htmlFor='post-category'>Category:</label>
                          <select
                            type='text'
                            name='postCategory'
                            id='post-category'
                            value={ this.state.postCategory }
                            onChange={ this.handleInputChange }
                            required='required'
                          >
                            <option value='react'>React</option>
                            <option value='redux'>Redux</option>
                            <option value='udacity'>Udacity</option>
                          </select>
                          <label htmlFor='post-content'>Content:</label>
                          <textarea
                            name='postContent'
                            id='post-content'
                            rows='5'
                            value={ this.state.postContent }
                            onChange={ this.handleInputChange }
                          />
                        </div>
                        <input type='submit' value='Submit' />
                      </fieldset>
                    </form>
                  </div>
                </div>
              }

              <h2>
                  Comments ({this.props.comments && Object.values(this.props.comments).filter(comment => !comment.deleted && comment.parentId === postId).length})
              </h2>
              {this.props.comments &&
                  Object.values(this.props.comments).filter(comment => !comment.deleted && comment.parentId === postId).sort((a, b) => {
                    switch (this.props.sortCommentsBy) {
                      case 'BY_SCORE_LOWEST':
                        return a.voteScore - b.voteScore;
                      case 'BY_DATE_OLDEST':
                        return a.timestamp - b.timestamp;
                      case 'BY_DATE_NEWEST':
                        return b.timestamp - a.timestamp;
                      default:
                        return b.voteScore - a.voteScore;
                    }
                  }).map(comment => (
                    <Comment
                      key={ comment.id }
                      id={ comment.id }
                      timestamp={ comment.timestamp }
                      body={ comment.body }
                      author={ comment.author }
                      parentId={ comment.parentId }
                      voteScore={ comment.voteScore }
                      deleted={ comment.deleted }
                      parentDeleted={ comment.parentDeleted }
                    />
                  ))}
              <div className='row'>
                <div className='col-sm-12'>
                  <h3>Add a new comment:</h3>
                  <form onSubmit={ this.handleCommentSubmit }>
                    <fieldset>
                      <div className='input-group vertical'>
                        <label htmlFor='comment-author'>Author:</label>
                        <input
                          type='text'
                          name='commentAuthor'
                          id='comment-author'
                          value={ this.state.commentAuthor }
                          onChange={ this.handleInputChange }
                          required='required'
                        />
                        <label htmlFor='comment-content'>Content:</label>
                        <textarea
                          name='commentContent'
                          id='comment-content'
                          rows='5'
                          value={ this.state.commentContent }
                          onChange={ this.handleInputChange }
                          required='required'
                        />
                      </div>
                      <input type='submit' value='Submit' />
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allPosts: state.postsById,
  comments: state.receiveComments,
  sortCommentsBy: state.commentSorting ? state.commentSorting.sort : '',
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  fetchPostData: (id, sortCriteria) => dispatch(fetchPost(id)).then(() => dispatch(fetchComments(id))).then(() => dispatch(setCommentSorting(sortCriteria))),
  submitVote: (id, voteType) => dispatch(vote(id, voteType)),
  handleAddComment: (data) => dispatch(addComment(data)),
  handleEditPost: (data, id) => dispatch(editPost(data, id)),
  handleDeletePost: (id) => dispatch(deletePost(id)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDetail)
);
