import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { setPostSorting } from '../Actions/posts';
import { setCommentSorting } from '../Actions/comments';
import { fetchCategories } from '../Actions';

class NavBar extends Component {
  static propTypes = {
    handleFetchCategories: PropTypes.func.isRequired,
    handlePostSort: PropTypes.func.isRequired,
    handleCommentSort: PropTypes.func.isRequired,
    sortBy: PropTypes.string,
    sortCommentsBy: PropTypes.string,
    categories: PropTypes.array,
  }

  static defaultProps = {
    sortBy: '',
    sortCommentsBy: '',
    categories: [],
  }

  componentWillMount() {
    this.props.handleFetchCategories();
  }

  render() {
    return (
      <div>
        <header className='row'>
          <p className='logo'>Categories: </p>
          <Link to='/'>
            <input type='button' value='All' />
          </Link>
          {this.props.categories && this.props.categories.length > 0 && this.props.categories.map((category) => (
            <Link to={ `/${ category.name }` } key={ category.path }>
              <input type='button' value={ category.name } />
            </Link>
          ))}

        </header>
        <div className='row'>
          <div className='row'>
            {/* Show post sorting if relevant */}
            {this.props.sortBy &&
              <div className='card fluid'>
                <div className='section'>
                  <h3>Sort Posts By:</h3>
                  <div className='button-group'>
                    <input
                      type='button'
                      value='Votes'
                      className={ `${ (this.props.sortBy === 'BY_SCORE_LOWEST' || this.props.sortBy === 'BY_SCORE_HIGHEST') ? 'primary' : '' }` }
                      onClick={ () => this.props.handlePostSort(this.props.sortBy === 'BY_SCORE_LOWEST' ? 'BY_SCORE_HIGHEST' : 'BY_SCORE_LOWEST') }
                    />
                    <input
                      type='button'
                      value='Date'
                      className={ `${ (this.props.sortBy === 'BY_DATE_NEWEST' || this.props.sortBy === 'BY_DATE_OLDEST') ? 'primary' : '' }` }
                      onClick={ () => this.props.handlePostSort(this.props.sortBy === 'BY_DATE_NEWEST' ? 'BY_DATE_OLDEST' : 'BY_DATE_NEWEST') }
                    />
                  </div>
                </div>
              </div>
            }

            {/* Show comment sorting if relevant */}
            {this.props.sortCommentsBy &&
              <div className='card'>
                <div className='section'>
                  <h3>Sort Comments By:</h3>
                  <div className='button-group'>
                    <input
                      type='button'
                      value='Votes'
                      className={ `${ (this.props.sortCommentsBy === 'BY_SCORE_LOWEST' || this.props.sortCommentsBy === 'BY_SCORE_HIGHEST') ? 'primary' : '' }` }
                      onClick={ () => this.props.handleCommentSort(this.props.sortCommentsBy === 'BY_SCORE_LOWEST' ? 'BY_SCORE_HIGHEST' : 'BY_SCORE_LOWEST') }
                    />
                    <input
                      type='button'
                      value='Date'
                      className={ `${ (this.props.sortCommentsBy === 'BY_DATE_NEWEST' || this.props.sortCommentsBy === 'BY_DATE_OLDEST') ? 'primary' : '' }` }
                      onClick={ () => this.props.handleCommentSort(this.props.sortCommentsBy === 'BY_DATE_NEWEST' ? 'BY_DATE_OLDEST' : 'BY_DATE_NEWEST') }
                    />
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  handleFetchCategories: () => dispatch(fetchCategories()),
  handlePostSort: (sort) => dispatch(setPostSorting(sort)),
  handleCommentSort: (sort) => dispatch(setCommentSorting(sort)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
