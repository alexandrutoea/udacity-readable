import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment, voteComment, deleteComment } from '../Actions/comments';

class Comment extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    deleted: PropTypes.bool,
    timestamp: PropTypes.number.isRequired,
  }
  static defaultProps = {
    deleted: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      commentAuthor: '',
      commentContent: '',
      showEditor: false,
    };
  }

  componentWillMount() {
    const { author, body } = this.props;
    this.setState({
      commentAuthor: author,
      commentContent: body,
    });
  }

  submitVote = (id, voteType) => {
    this.props.dispatch(voteComment(id, voteType));
  }

  handleDelete = id => {
    this.props.dispatch(deleteComment(id));
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleEditSubmit = event => {
    event.preventDefault();
    const data = {
      id: this.props.id,
      timestamp: this.props.timestamp,
      body: this.state.commentContent,
      author: this.state.commentAuthor,
      parentId: this.props.parentId,
      voteScore: this.props.voteScore,
      deleted: this.props.deleted,
      parentDeleted: false,
    };
    this.props.dispatch(addComment(data));
    this.closeEdit();
  }

  openEdit = () => {
    this.setState({
      showEditor: true,
    });
  }
  closeEdit = () => {
    this.setState({
      showEditor: false,
    });
  }

  render() {
    return (
      <div>
        <div className='card fluid' key={ this.props.id }>
          <div className='section'>
            <div className='row'>
              <div className='col-sm-4'>
                <h5>
                  By: {this.props.author}
                  <small>On: {new Date(this.props.timestamp).toDateString()}</small>
                </h5>
              </div>
              <div className='col-sm-4'>
                Score: { this.props.voteScore }
                <div className='button-group'>
                  <button onClick={ () => this.submitVote(this.props.id, 'upVote') } >+</button>
                  <button onClick={ () => this.submitVote(this.props.id, 'downVote') }>-</button>
                </div>
              </div>
              <div className='col-sm-4'>
                Actions:
                <div className='button-group'>
                  <button className='tertiary' onClick={ this.openEdit } >Edit</button>
                  <button className='secondary' onClick={ () => this.handleDelete(this.props.id) }>Delete</button>
                </div>
              </div>
            </div>
            <p>{this.props.body}</p>

          </div>
        </div>
        {this.state.showEditor &&
          <form onSubmit={ this.handleEditSubmit }>
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
                  value={ this.state.commentContent }
                  onChange={ this.handleInputChange }
                  required='required'
                />
              </div>
              <input type='submit' value='Submit' />
            </fieldset>
          </form>
        }
      </div>
    );
  }
}

export default connect()(Comment);
