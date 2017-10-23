import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addPost } from '../Actions/posts';

import NavBar from '../Components/NavBar';

class CreatePost extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {
      postTitle: '',
      postAuthor: '',
      postCategory: 'react',
      postContent: '',
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      id: `${ this.state.postTitle }_${ this.state.author }_${ Date.now() }`,
      timestamp: Date.now(),
      title: this.state.postTitle,
      body: this.state.postContent,
      author: this.state.postAuthor,
      category: this.state.postCategory,
      voteScore: 0,
      deleted: false,
    };
    this.props.dispatch(addPost(data));
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className='row'>
          <div className='col-sm-2'>
            <h3>Create New Post</h3>
          </div>
          <div className='col-sm-10'>
            <form onSubmit={ this.handleSubmit }>
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
      </div>
    );
  }
}

export default connect()(CreatePost);
