import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Post = ({ id, category, title, author, voteScore, comments, submitVote, deletePost }) => {
  return (
    <div className='col-sm-12'>
      <div className='card fluid'>
        <div className='section'>
          <div className='row'>
            <div className='col-sm-6'>
              <Link to={ `/${ category }/${ id }` }>
                <h3>{title}</h3>
              </Link>
            </div>
          </div>
          <hr />
          <div className='row'>
            <div className='col-sm-4'>
              <span>Author: {author}</span><br />
              <span>Comments: {comments && `${ comments.length }` }</span>
            </div>
            <div className='col-sm-4'>
              Score: {voteScore}
              <div className='button-group'>
                <button onClick={ () => submitVote(id, 'upVote') } >+</button>
                <button onClick={ () => submitVote(id, 'downVote') }>-</button>
              </div>
            </div>
            <div className='col-sm-4'>
              Actions:
              <div className='button-group'>
                <Link className='button tertiary' to={ { pathname: `/${ category }/${ id }`, state: { postEditorVisible: true } } }>Edit</Link>
                <button className='secondary' onClick={ () => deletePost(id) }>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  voteScore: PropTypes.number,
  comments: PropTypes.array,
  submitVote: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

Post.defaultProps = {
  voteScore: 0,
  comments: [],
};

export default(Post);
